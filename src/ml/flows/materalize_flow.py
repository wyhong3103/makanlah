from metaflow import FlowSpec, Parameter, step, kubernetes, conda, pypi, environment, resources, schedule
import os

class MaterializeFlow(FlowSpec):
    @kubernetes(cpu=1,memory=500)
    @step
    def start(self):
        print('Starting materialization flow')
        self.next(self.ingest_feedback)

    @pypi(packages={
        'sqlalchemy': '2.0.39',
        'psycopg2-binary': '2.9.10'
    })
    @environment(vars = {
        'DATABASE_URL': os.getenv('DATABASE_URL')
    })
    @kubernetes(cpu=1,memory=500)
    @step
    def ingest_feedback(self):
        from sqlalchemy import create_engine, Table, MetaData, func, and_
        from sqlalchemy.orm import sessionmaker
        import datetime

        DATABASE_URL = os.getenv('DATABASE_URL')
        engine = create_engine(DATABASE_URL)

        Session = sessionmaker(bind=engine)
        session = Session()

        metadata = MetaData()
        Prediction = Table('Prediction', metadata, autoload_with=engine)

        today = datetime.date.today()
        results = session.query(Prediction).filter(
            and_(
                func.date(Prediction.c.createdAt) == today,
                Prediction.c.feedback.isnot(None),
                Prediction.c.feedback != 'no'
            )
        ).all()

        to_dict_food = lambda x: {
            'class': x.feedback if x.feedback != 'yes' else x.predicted, 
            'path': x.image, 
            'predictionId': x.predictionId
        }
        to_dict_outliers = lambda x: {
            'path': x.image, 
            'predictionId': x.predictionId
        }

        self.foods = [
            to_dict_food(i) for i in results 
            if 
                i.feedback != 'none' and 
                not (i.feedback == 'yes' and i.predicted == 'none')
        ]
        self.outliers = [
            to_dict_outliers(i) for i in results 
            if 
                i.feedback == 'none' or 
                (i.feedback == 'yes' and i.predicted == 'none')
        ]

        self.next(self.materialize_feedback)

    @kubernetes(cpu=1,memory=500)
    @pypi(packages={
        'boto3': '1.34.144'
    })
    @environment(vars = {
        'AWS_BUCKET_NAME': os.getenv('AWS_BUCKET_NAME')
    })
    @step
    def materialize_feedback(self):
        import boto3
        import random
        import json

        AWS_BUCKET_NAME = os.getenv('AWS_BUCKET_NAME')
        s3_client = boto3.client('s3')

        read_json = lambda x: json.loads(x['Body'].read().decode('utf-8'))

        train_food = read_json(
            s3_client.get_object(
                Bucket=AWS_BUCKET_NAME, 
                Key='datasets/train_food.json'
            )
        )
        test_food = read_json(
            s3_client.get_object(
                Bucket=AWS_BUCKET_NAME, 
                Key='datasets/test_food.json'
            )
        )
        train_outliers = read_json(
            s3_client.get_object(
                Bucket=AWS_BUCKET_NAME, 
                Key='datasets/train_outliers.json'
            )
        )
        test_outliers = read_json(
            s3_client.get_object(
                Bucket=AWS_BUCKET_NAME, 
                Key='datasets/test_outliers.json'
            )
        )

        random.shuffle(self.foods)
        random.shuffle(self.outliers)

        food_split = int(len(self.foods) * 0.8) 
        # Prioritize training dataset
        if len(self.foods) == 1:
            food_split += 1

        outliers_split = int(len(self.outliers) * 0.8)
        # Prioritize training dataset
        if len(self.outliers) == 1:
            outliers_split += 1

        for idx, i in enumerate(self.foods):
            if idx >= food_split:
                test_food.append(i)
            else:
                train_food.append(i)

        for idx, i in enumerate(self.outliers):
            if idx >= outliers_split:
                test_outliers.append(i)
            else:
                train_outliers.append(i)

        print(f'Added {food_split} food training examples, and {len(self.foods) - food_split} testing examples')
        print(f'Added {outliers_split} outliers training examples, and {len(self.outliers) - outliers_split} outliers examples')

        json_data = json.dumps(train_food)
        s3_client.put_object(Bucket=AWS_BUCKET_NAME, Key='datasets/train_food.json', Body=json_data)
        json_data = json.dumps(test_food)
        s3_client.put_object(Bucket=AWS_BUCKET_NAME, Key='datasets/test_food.json', Body=json_data)
        json_data = json.dumps(train_outliers)
        s3_client.put_object(Bucket=AWS_BUCKET_NAME, Key='datasets/train_outliers.json', Body=json_data)
        json_data = json.dumps(train_food)
        s3_client.put_object(Bucket=AWS_BUCKET_NAME, Key='datasets/test_outliers.json', Body=json_data)

        self.next(self.end)

    @kubernetes(cpu=1,memory=500)
    @step
    def end(self):
        print("Ending materialization flow")

if __name__ == '__main__':
    MaterializeFlow()

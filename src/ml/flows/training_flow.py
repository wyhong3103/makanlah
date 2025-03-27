from metaflow import FlowSpec, Parameter, step, kubernetes, pypi

class TrainingFlow(FlowSpec):
    @kubernetes(cpu=1,memory=500)
    @step
    def start(self):
        print('Starting training flow')
        self.next(self.trigger_training)

    @kubernetes(cpu=1,memory=500)
    @step
    def trigger_training(self):
        import requests
        import json

        resp = requests.post(
            "http://rayservice-head-svc:8265/api/jobs/", 
            json={
                "entrypoint": "python ray_train.py",
                "runtime_env": {
                    "working_dir": "s3://makanlah-s3-bucket/ray_modules-1.zip",
                    "pip": ["torch==2.5.1", "torchvision==0.20.1", "mlflow", "tqdm", "pillow", "numpy", "python-multipart"]
                },
            }
        )

        rst = json.loads(resp.text)
        job_id = rst["job_id"]

        print("Trainig started. Please refer to MLFlow dashboard for more details.")
        print(f"Job ID: {job_id}")
        self.next(self.end)

    @kubernetes(cpu=1,memory=500)
    @step
    def end(self):
        print('Ending training flow')

if __name__ == '__main__':
    TrainingFlow()

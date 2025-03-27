from ray.job_submission import JobSubmissionClient

client = JobSubmissionClient("http://127.0.0.1:8265")

job_id = client.submit_job(
    entrypoint="python ray_train.py", 
    runtime_env={
        "working_dir": "./", 
        "pip": ["torch", "torchvision", "mlflow", "tqdm", "boto3", "pillow", "matplotlib", "numpy"]
    }
)

# Print the job ID for reference
print("Job ID:", job_id)

# client.stop_job('raysubmit_5HCjJP8g6WuvuDLB')

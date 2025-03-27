import os
import shutil
import boto3
import argparse

def zip_folder(folder_path, zip_name):
    shutil.make_archive(zip_name, 'zip', folder_path)
    return f"{zip_name}.zip"

def upload_to_s3(file_path, bucket_name, s3_key):
    s3 = boto3.client('s3')
    
    try:
        s3.upload_file(file_path, bucket_name, s3_key)
        print(f"Uploaded {file_path} to s3://{bucket_name}/{s3_key}")
    except Exception as e:
        print(f"Failed to upload {file_path}: {e}")

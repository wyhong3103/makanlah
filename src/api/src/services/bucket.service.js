const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../config/config');

const s3Params = {
  region: config.aws.region,
};

if (config.aws.keyId && config.aws.accessKey) {
  s3Params.credentials = {
    accessKeyId: config.aws.keyId,
    secretAccessKey: config.aws.accessKey,
  };
}

const s3 = new S3Client(s3Params);

const uploadToS3 = async (file, path) => {
  const uploadParams = {
    Bucket: config.aws.bucketName,
    Key: path,
    Body: file.buffer,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  const publicUrl = `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${path}`;

  return publicUrl;
};

module.exports = {
  uploadToS3,
};

const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

// validation stuff
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    AWS_BUCKET_NAME: Joi.string().description('s3 bucket name'),
    AWS_REGION: Joi.string().description('the region that contains the s3 bucket'),
    AWS_KEY_ID: Joi.string().description('aws key id'),
    AWS_ACCESS_KEY: Joi.string().description('aws access key'),
    APP_URL: Joi.string().required().description('frontend app url'),
    INFERENCE_URL: Joi.string().required().description('inference app url'),
    GOOGLE_OAUTH_CLIENT_ID: Joi.string().required().description('google oauth client id'),
    GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required().description('google oauth client secret'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  app_url: envVars.APP_URL,
  inference_url: envVars.INFERENCE_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  google: {
    id: envVars.GOOGLE_OAUTH_CLIENT_ID,
    secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  aws: {
    bucketName: envVars.AWS_BUCKET_NAME,
    region: envVars.AWS_REGION,
    keyId: envVars.AWS_KEY_ID,
    accessKey: envVars.AWS_ACCESS_KEY,
  },
};

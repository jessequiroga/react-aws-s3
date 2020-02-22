import AWS from "aws-sdk";

AWS.config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_S3_KEY
    ? process.env.REACT_APP_S3_KEY
    : "minioadmin",
  secretAccessKey: process.env.REACT_APP_S3_SECRET
    ? process.env.REACT_APP_S3_SECRET
    : "minioadmin",
  region: process.env.REACT_APP_BUCKET_REGION
    ? process.env.REACT_APP_BUCKET_REGION
    : "ap-northeast-2", // This refers to your bucket configuration.
  s3ForcePathStyle: true
});

// Creating a S3 instance
export const s3Instance = new AWS.S3(
  process.env.REACT_APP_S3_KEY ? {} : { endpoint: "http://127.0.0.1:9000" }
);

export const s3Bucket = process.env.REACT_APP_BUCKET_NAME
  ? process.env.REACT_APP_BUCKET_NAME
  : "dvtest2020";

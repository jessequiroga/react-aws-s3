import AWS, { AWSError } from "aws-sdk";

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
const s3 = new AWS.S3(
  process.env.REACT_APP_S3_KEY ? {} : { endpoint: "http://127.0.0.1:9000" }
);
const bucket = process.env.REACT_APP_BUCKET_NAME
  ? process.env.REACT_APP_BUCKET_NAME
  : "dvtest2020";

function uploadUsingPutMethod(file: File) {
  return new Promise(function upload(resolve, reject) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: `test/${file.name}`,
      ContentType: file.type,
      Body: file
    };

    s3.putObject(params).send((err: AWSError) => {
      if (err) {
        reject(new Error(`Request is failed - ${err}`));
      } else {
        console.log("success");
        const url = s3.getSignedUrl("getObject", {
          Bucket: bucket,
          Key: params.Key
        });
        console.log(url);
        resolve(url);
      }
    });
  });
}

function uploadUsingPresignedUrl(file: File) {
  return new Promise(function upload(resolve, reject) {
    const paramsPut = {
      Bucket: bucket,
      Key: `test/${file.name}`,
      ContentType: file.type,
      Expires: 60 * 60
    };

    s3.getSignedUrl("putObject", paramsPut, function _getPutUrl(
      err: Error,
      url: string
    ): void {
      if (err) {
        reject(err);
      }

      fetch(url, { method: "PUT", body: file })
        .then(() => {
          console.log("File upload by AWS - success");
          const paramsGet = {
            Bucket: bucket,
            Key: `test/${file.name}`,
            Expires: 60 * 60
          };

          s3.getSignedUrl("getObject", paramsGet, function _getGetUrl(
            errGetObject: Error,
            resGetUrl: string
          ): void {
            if (errGetObject) {
              console.log(`Get Url failed${errGetObject.message}`);
              reject(new Error(errGetObject.message));
            }

            console.log("Get Url", resGetUrl);
            resolve(resGetUrl);
          });
        })
        .catch(e => {
          console.log("File upload by AWS - upload failed");
          reject(new Error(e));
        });
    });
  });
}

function uploadFile(file: File) {
  console.log(
    `Env setting: ${process.env.REACT_APP_S3_KEY} ${process.env.REACT_APP_S3_SECRET} ${process.env.REACT_APP_BUCKET_REGION} ${process.env.REACT_APP_BUCKET_NAME}`
  );

  return uploadUsingPutMethod(file);
  // return uploadUsingPresignedUrl(file);
}

export default uploadFile;
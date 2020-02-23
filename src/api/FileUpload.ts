import AWS, { AWSError } from "aws-sdk";
import { s3Instance, s3Bucket } from "./getS3Intance";

function uploadUsingPutMethod(file: File) {
  return new Promise(function upload(resolve, reject) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: s3Bucket,
      Key: `test/${file.name}`,
      ContentType: file.type,
      Body: file
    };

    s3Instance.putObject(params).send((err: AWSError) => {
      if (err) {
        reject(new Error(`Request is failed - ${err}`));
      } else {
        console.log("success");
        resolve(`test/${file.name}`);
      }
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function uploadUsingPresignedUrl(file: File) {
  return new Promise(function upload(resolve, reject) {
    const paramsPut = {
      Bucket: s3Bucket,
      Key: `test/${file.name}`,
      ContentType: file.type,
      Expires: 60 * 60
    };

    s3Instance.getSignedUrl("putObject", paramsPut, function _getPutUrl(
      err: Error,
      url: string
    ): void {
      if (err) {
        reject(err);
      }

      fetch(url, { method: "PUT", body: file })
        .then(() => {
          console.log("File upload by AWS - success");
          resolve(`test/${file.name}`);
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

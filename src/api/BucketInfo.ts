import { s3Instance, s3Bucket } from "./getS3Intance";

// eslint-disable-next-line import/prefer-default-export
export default function getKeyList(): Promise<string[]> {
  return new Promise(function listreq(resolve, reject) {
    const params = {
      Bucket: s3Bucket
    };

    s3Instance.listObjects(params, function list(err, data) {
      if (err) {
        reject(new Error(err.message));
      } else {
        console.log(data); // successful response
        const fileList: Array<string> = [];
        if (data.Contents) {
          data.Contents.map(it => fileList.push(it.Key ? it.Key : ""));
          resolve(fileList);
        }
      }
    });
  });
}

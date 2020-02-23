import AWS, { AWSError } from "aws-sdk";
import { s3Instance, s3Bucket } from "./getS3Intance";

function encode(data: any): string {
  const str = data.reduce(function rd(a: any, b: any) {
    return a + String.fromCharCode(b);
  }, "");
  return btoa(str).replace(/.{76}(?=.)/g, "$&\n");
}

function downloadUsingGetMethod(
  key: string,
  callbackFn: Function
): Promise<string> {
  return new Promise(function upload(resolve, reject) {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: s3Bucket,
      Key: key
    };

    s3Instance
      .getObject(params)
      .on("httpDownloadProgress", function proc(progress) {
        const curProg = Math.round((progress.loaded * 100) / progress.total);
        callbackFn(curProg);
      })
      .send(function download(err: AWSError, data: AWS.S3.GetObjectOutput) {
        if (err) {
          reject(new Error(`GetObject Request is failed - ${err}`));
        } else {
          console.log(
            `getObject success - ${data.Metadata}, ${data.ContentType}, ${data.ContentEncoding}`
          );
          if (data.ContentType?.includes("image")) {
            const imgData = `data:${data.ContentType};base64,${encode(
              data.Body
            )}`;
            resolve(imgData);
          } else {
            reject(new Error(`Downloaded file is not an image type.`));
          }
        }
      });
  });
}

// function getZippedContent(data) {
//   JSZip.loadAsync(data)
//     .then(function(zip) {

//       return zip.file("path/to/file.txt").async("text");
//     })
//     .then(function(txt) {
//       console.log("the content is", txt);
//     });
// }

function downloadFile(key: string, callbackFn: Function): Promise<string> {
  return downloadUsingGetMethod(key, callbackFn);
}

export default downloadFile;

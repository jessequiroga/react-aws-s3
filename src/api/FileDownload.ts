import AWS, { AWSError } from "aws-sdk";
import JSZip from "jszip";
import { s3Instance, s3Bucket } from "./getS3Intance";

function encode(data: any) {
  const str = data.reduce(function(a: any, b: any) {
    return a + String.fromCharCode(b);
  }, "");
  return btoa(str).replace(/.{76}(?=.)/g, "$&\n");
}

function downloadUsingGetMethod(key: string): Promise<string> {
  return new Promise(function upload(resolve, reject) {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: s3Bucket,
      Key: key
    };

    s3Instance.getObject(params, function download(
      err: AWSError,
      data: AWS.S3.GetObjectOutput
    ) {
      if (err) {
        reject(new Error(`GetObject Request is failed - ${err}`));
      } else {
        console.log(
          `getObject success - ${data.Metadata}, ${data.ContentType}, ${data.ContentEncoding}`
        );
        const imgData = `data:${data.ContentType};base64,${encode(data.Body)}`;
        resolve(imgData);
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

function downloadFile(key: string) {
  return downloadUsingGetMethod(key);
}

export default downloadFile;

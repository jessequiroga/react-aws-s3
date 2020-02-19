import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "172.26.111.74", // 127.0.0.1 causes connection error in Chrome.
  port: 9000,
  useSSL: false, // "true" causes connection error(net::ERR_SSL_PROTOCOL_ERROR) in Chrome.
  accessKey: "minioadmin",
  secretKey: "minioadmin"
});

function uploadFile(file: File) {
  const bucketName = "dvtest2020";
  const presignedURLExpiresIn = 15 * 60;

  return new Promise(function upload(resolve, reject) {
    minioClient
      .presignedPutObject(bucketName, file.name, presignedURLExpiresIn)
      .then(res => {
        const putURL = res;
        console.log("put URL", res);
        fetch(putURL, { method: "PUT", body: file })
          .then(() => {
            console.log("File upload by minio - success");
            minioClient
              .presignedGetObject(bucketName, file.name)
              .then(resGetUrl => {
                console.log("Get Url", resGetUrl);
                resolve(resGetUrl);
              })
              .catch(e => {
                console.log("Get Url failed");
                reject(new Error(e));
              });
          })
          .catch(e => {
            console.log("File upload by minio - upload failed");
            reject(new Error(e));
          });
      })
      .catch(e => {
        console.log("File upload by minio - get put url failed");
        reject(new Error(e));
      });
  });
}

export default uploadFile;

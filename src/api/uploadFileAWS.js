import AWS from 'aws-sdk';

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_S3_KEY, // stored in the .env file
  secretAccessKey: process.env.REACT_APP_S3_SECRET, // stored in the .env file
  region: process.env.REACT_APP_BUCKET_REGION // This refers to your bucket configuration.
});

// Creating a S3 instance
const s3 = new AWS.S3({ signatureVersion: "v4" });

function uploadFile(file) {
  console.log("Env setting: " +process.env.REACT_APP_S3_KEY + " " + process.env.REACT_APP_S3_SECRET + " "+ process.env.REACT_APP_BUCKET_REGION + " " + process.env.REACT_APP_BUCKET_NAME);
  return new Promise(function(resolve, reject) {
    var params = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: file.name,
      ContentType: file.type,
      Body: file
    };

    s3.putObject(params).send(err => {
      if (err) {
        reject(new Error("Request is failed - " + err));
      } else {
        console.log("success");
        var url = s3.getSignedUrl("getObject", {
          Bucket: process.env.REACT_APP_BUCKET_NAME,
          Key: params.Key
        });
        console.log(url);
        resolve(url);
      }
    });
  });
}

export default uploadFile;

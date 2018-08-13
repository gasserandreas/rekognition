/*global Uint8Array */
import uuid from 'uuid';

import 'aws-sdk/dist/aws-sdk';

const notInitializedError = new Error('AWS is not initialized');

const AWS = window.AWS;

let userId;
let rekognition;
let initialized = false;
let buckets = [];

// initi functions
const setAWSConfig = (config) => {
  // set aws config
  AWS.config.update(config.awsConfig);

  // save userId global
  userId = config.userId;

  // enable initialized
  initialized = true;
};

const initS3 = name => new AWS.S3({ params: { Bucket: name } });

const initRekognition = () => {
  rekognition = new AWS.Rekognition();
};

// helper functions
const getBucket = name => {
  let bucket = buckets[name]
  if (bucket) {
    return bucket;
  }

  // create new
  bucket = initS3(name);
  buckets[name] = bucket;

  return bucket;
}

// const getImageName = imageId => `${userId}/${imageId}.jpg`;


// s3 functions
const uploadToS3 = (bucketName, imageName, buffer) => {
  if (!initialized) {
    return Promise.reject(notInitializedError);
  }

  const S3 = getBucket(bucketName);

  // upload code
  return S3.putObject(
    {
      Key: imageName,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    },
  ).promise();
};

export {
  setAWSConfig,
  uploadToS3,
};

// // property definitions
// const notInitializedError = new Error('AWS is not initialized');

// // global AWS var
// const AWS = window.AWS;
// const bucket = 'rekognitionnn-529821714029';

// // hold AWS services
// let userId;
// let S3;
// let rekognition;
// let initialized = false;

// // internal helper methods
// const setAWSConfig = (config) => {
//   // set aws config
//   AWS.config.update(config.awsConfig);

//   // save userId global
//   userId = config.userId;

//   // enable initialized
//   initialized = true;
// };

// const initS3 = () => {
//   S3 = new AWS.S3({ params: { Bucket: bucket } });
// };

// const initRekognition = () => {
//   rekognition = new AWS.Rekognition();
// };

// const getImageName = imageId => `${userId}/${imageId}.jpg`;

// // parse face object
// const parseDefaultAWSInformation = info => ({
//   value: info.Value,
//   confidence: info.Confidence,
// });

// const parseAWSFaceObject = (face) => {
//   const {
//     AgeRange,
//     Beard,
//     Emotions,
//     Eyeglasses,
//     EyesOpen,
//     Gender,
//     MouthOpen,
//     Mustache,
//     Quality,
//     Smile,
//     Sunglasses,
//     BoundingBox,
//     Landmarks,
//     Pose,
//   } = face;

//   const emotions = Emotions.map(emotion => ({
//     value: emotion.Type,
//     confidence: emotion.Confidence,
//   }));

//   // create new face object
//   const parsedFace = {
//     ageRange: `${AgeRange.Low} - ${AgeRange.High}`,
//     beard: parseDefaultAWSInformation(Beard),
//     emotions,
//     eyeglasses: parseDefaultAWSInformation(Eyeglasses),
//     eyesOpen: parseDefaultAWSInformation(EyesOpen),
//     gender: parseDefaultAWSInformation(Gender),
//     mouthOpen: parseDefaultAWSInformation(MouthOpen),
//     mustache: parseDefaultAWSInformation(Mustache),
//     smile: parseDefaultAWSInformation(Smile),
//     sunglasses: parseDefaultAWSInformation(Sunglasses),
//     brightness: {
//       value: Quality.Brightness,
//       confidence: 100.0,
//     },
//     sharpness: {
//       value: Quality.Sharpness,
//       confidence: 100.0,
//     },
//     boundingBox: BoundingBox,
//     landmarks: Landmarks,
//     pose: Pose,
//   };

//   return parsedFace;
// };

// // external methods
// const uploadToS3 = (imageId, buffer) => {
//   if (!initialized) {
//     return Promise.reject(notInitializedError);
//   }

//   if (!S3) {
//     initS3();
//   }

//   // upload code
//   return S3.putObject(
//     {
//       Key: getImageName(imageId),
//       Body: buffer,
//       ContentEncoding: 'base64',
//       ContentType: 'image/jpeg',
//     },
//   ).promise();
// };

// const detectFaces = (imageId, attributes = []) => {
//   if (!initialized) {
//     return Promise.reject(notInitializedError);
//   }

//   if (!rekognition) {
//     initRekognition();
//   }

//   // create options for api
//   const options = {
//     Image: {
//       S3Object: {
//         Bucket: bucket,
//         Name: getImageName(imageId),
//       },
//     },
//     Attributes: attributes,
//   };

//   // detect faces
//   return rekognition.detectFaces(options).promise()
//     .then(({ FaceDetails, OrientationCorrection }) => {
//       // parse information
//       const faces = FaceDetails.map(face => parseAWSFaceObject(face));

//       return {
//         FaceDetails: faces,
//         OrientationCorrection,
//       };
//     });
// };

// const detectLabels = (imageId, maxLabels = 123, minConfidence = 50) => {
//   if (!initialized) {
//     return Promise.reject(notInitializedError);
//   }

//   if (!rekognition) {
//     initRekognition();
//   }

//   // create options for api
//   const options = {
//     Image: {
//       S3Object: {
//         Bucket: bucket,
//         Name: getImageName(imageId),
//       },
//     },
//     MaxLabels: maxLabels,
//     MinConfidence: minConfidence,
//   };

//   return rekognition.detectLabels(options).promise()
//     .then((data) => {
//       console.log(data);

//       return data;
//     });
// };

// export {
//   setAWSConfig,
//   uploadToS3,
//   detectFaces,
//   detectLabels,
// };

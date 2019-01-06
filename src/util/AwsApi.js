import 'aws-sdk/dist/aws-sdk';

export default class AwsApi {
  AWS = null;

  rekognition = null;
  buckets = [];

  constructor({ awsConfig }) {
    if (!awsConfig) {
      throw new Error('Missing awsConfig in constructor');
    }

    // get global aws
    this.AWS = window.AWS;

    if (!this.AWS) {
      throw new Error('Could not initialize AWS');
    }

    // set config
    this.AWS.config.update(awsConfig);
  }

  // init aws methods
  initS3(name) {
    return new this.AWS.S3({ params: { Bucket: name } });
  }

  initRekognition = () => {
    return new this.AWS.Rekognition();
  };

  // aws method getters
  getBucket(name) {
    let bucket = this.buckets[name]
    if (bucket) {
      return bucket;
    }

    // create new
    bucket = this.initS3(name);
    this.buckets[name] = bucket;

    return bucket;
  }

  getRekognition() {
    if (!this.rekognition) {
      this.rekognition = new this.AWS.Rekognition();
    }

    return this.rekognition;
  }

  // s3 methods
  uploadImageToS3(bucketName, imageName, imageType, buffer) {
    const S3 = this.getBucket(bucketName);
  
    // upload code
    return S3.putObject(
      {
        Key: imageName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: imageType,
      },
    ).promise();
  };

  deleteS3Object(bucketName, key) {
    const S3 = this.getBucket(bucketName);

    return S3.deleteObject({
      Key: key,
    }).promise();
  }

  // rekognition utils
  parseDefaultAWSInformation = info => ({
    value: info.Value,
    confidence: info.Confidence,
  });
  
  parseAWSFaceObject = (face) => {
    const {
      AgeRange,
      Beard,
      Emotions,
      Eyeglasses,
      EyesOpen,
      Gender,
      MouthOpen,
      Mustache,
      Quality,
      Smile,
      Sunglasses,
      BoundingBox,
      Landmarks,
      Pose,
    } = face;
  
    const emotions = Emotions.map(emotion => ({
      value: emotion.Type,
      confidence: emotion.Confidence,
    }));
  
    // create new face object
    const parsedFace = {
      ageRange: `${AgeRange.Low} - ${AgeRange.High}`,
      beard: this.parseDefaultAWSInformation(Beard),
      emotions,
      eyeglasses: this.parseDefaultAWSInformation(Eyeglasses),
      eyesOpen: this.parseDefaultAWSInformation(EyesOpen),
      gender: this.parseDefaultAWSInformation(Gender),
      mouthOpen: this.parseDefaultAWSInformation(MouthOpen),
      mustache: this.parseDefaultAWSInformation(Mustache),
      smile: this.parseDefaultAWSInformation(Smile),
      sunglasses: this.parseDefaultAWSInformation(Sunglasses),
      brightness: {
        value: Quality.Brightness,
        confidence: 100.0,
      },
      sharpness: {
        value: Quality.Sharpness,
        confidence: 100.0,
      },
      boundingBox: BoundingBox,
      landmarks: Landmarks,
      pose: Pose,
    };
  
    return parsedFace;
  };

  // rekognition methods
  detectFaces = (bucket, imageName) => {
    const rekognition = this.getRekognition();
    const attributes = ['ALL'];
  
    // create options for api
    const options = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: imageName,
        },
      },
      Attributes: attributes,
    };
  
    // detect faces
    return rekognition.detectFaces(options).promise()
      .then(({ FaceDetails }) => {
        // parse information
        const faces = FaceDetails.map(face => this.parseAWSFaceObject(face));
  
        return faces;
      });
  };

  detectLabels = (bucket, imageName, maxLabels = 123, minConfidence = 50) => {
    const rekognition = this.getRekognition();
  
    // create options for api
    const options = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: imageName,
        },
      },
      MaxLabels: maxLabels,
      MinConfidence: minConfidence,
    };
  
    return rekognition.detectLabels(options).promise()
      .then((data) => {
        console.log(data);
  
        return data;
      });
  };
}

// /*global Uint8Array */
// import 'aws-sdk/dist/aws-sdk';

// const notInitializedError = new Error('AWS is not initialized');

// const AWS = window.AWS;

// let rekognition;
// let initialized = false;
// let buckets = [];

// // initi functions
// const setAWSConfig = (config) => {
//   // set aws config
//   AWS.config.update(config.awsConfig);

//   // enable initialized
//   initialized = true;
// };

// const initS3 = name => new AWS.S3({ params: { Bucket: name } });

// const initRekognition = () => {
//   rekognition = new AWS.Rekognition();
// };

// // helper functions
// const getBucket = name => {
//   let bucket = buckets[name]
//   if (bucket) {
//     return bucket;
//   }

//   // create new
//   bucket = initS3(name);
//   buckets[name] = bucket;

//   return bucket;
// }

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

// // s3 functions
// const uploadToS3 = (bucketName, imageName, buffer) => {
//   if (!initialized) {
//     return Promise.reject(notInitializedError);
//   }

//   const S3 = getBucket(bucketName);

//   // upload code
//   return S3.putObject(
//     {
//       Key: imageName,
//       Body: buffer,
//       ContentEncoding: 'base64',
//       ContentType: 'image/jpeg',
//     },
//   ).promise();
// };

// // rekognition functions
// const detectFaces = (bucket, imageName) => {
//   if (!initialized) {
//     return Promise.reject(notInitializedError);
//   }

//   if (!rekognition) {
//     initRekognition();
//   }

//   const attributes = ['ALL'];

//   // create options for api
//   const options = {
//     Image: {
//       S3Object: {
//         Bucket: bucket,
//         Name: imageName,
//       },
//     },
//     Attributes: attributes,
//   };

//   // detect faces
//   return rekognition.detectFaces(options).promise()
//     .then(({ FaceDetails }) => {
//       // parse information
//       const faces = FaceDetails.map(face => parseAWSFaceObject(face));

//       return faces;
//     });
// };

// const detectLabels = (bucket, imageName, maxLabels = 123, minConfidence = 50) => {
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
//         Name: imageName,
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
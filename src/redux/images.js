import { combineReducers } from 'redux';
import uuid from 'uuid';

import { uploadToS3 } from '../common/services/aws';

import * as RequestStatus from '../enums/RequestStatus';

// helper functions
const readAsDataURL = (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  });
};

const createImageString = event => event.target.result.replace(/^data:image\/\w+;base64,/, '');

// action types
const IMAGES_ADD_IMAGE = 'IMAGES_ADD_IMAGE';
const IMAGES_SELECT_IMAGE = 'IMAGES_SELECT_IMAGE';

const IMAGES_UPLOAD_REQUEST = 'IMAGES_UPLOAD_REQUEST';
const IMAGES_UPLOAD_SUCCESS = 'IMAGES_UPLOAD_SUCCESS';
const IMAGES_UPLOAD_FAILURE = 'IMAGES_UPLOAD_FAILURE';

// simple actions
const imageAddImage = (data) => ({
  type: IMAGES_ADD_IMAGE,
  ...data,
});

const imageSelectImage = imageId => ({
  type: IMAGES_SELECT_IMAGE,
  imageId,
});

const imageUploadRequest = () => ({
  type: IMAGES_UPLOAD_REQUEST,
});

const imageUploadSuccess = (imageId = '') => ({
  type: IMAGES_UPLOAD_SUCCESS,
})

const imageUploadFailure = (imageId, error) => ({
  type: IMAGES_UPLOAD_FAILURE,
});

// complex actions
const addImage = file => (dispatch, getState) => {
  dispatch(async (dispatch, getState) => {
    dispatch(imageUploadRequest());

    // create base image information
    const imageId = uuid.v4();
    const bucketName = process.env.REACT_APP_S3_UPLOAD_BUCKET;
    const { auth: { accessKey } } = getState();

    const { 
      lastModified,
      name,
      size,
      type,
    } = file;

    // get file ending
    let filetype = undefined;
    switch (type) {
      case 'image/jpeg':
        filetype = '.jpeg';
        break;
      case 'image/png':
        filetype = '.png';
        break;
      default:
        filetype = undefined;
    }

    const rawImageString = await readAsDataURL(file)
    const imageString = rawImageString.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(imageString, 'base64');

    const newName = `${imageId}${filetype}`;
    const imageName = `${accessKey}/${newName}`;

    // image object
    const image = {
      id: imageId,
      lastModified,
      name: newName,
      type,
      size,
    };

    // start async job
    try {

      // TODO: add DynamoDB

      // TODO: add S3 upload
      const s3Upload = await uploadToS3(bucketName, imageName, buffer)
        .then((obj) => {
          console.log(obj);
          return Promise.resolve(true)
        });

      console.log(`s3Upload: ${s3Upload}`);
      console.log(image);
      
      dispatch(imageSelectImage(imageId));
      dispatch(imageAddImage({ image, imageId }));

      // success
      dispatch(imageUploadSuccess(imageId));
    } catch(error) {
      dispatch(imageUploadFailure(imageId, error));
    }
  });
};

  // console.log(file);
  // const imageId = uuid.v4();
  // const bucketName = process.env.REACT_APP_S3_UPLOAD_BUCKET;
  // const { auth: { accessKey } } = getState();

  // const { 
  //   lastModified,
  //   name,
  //   size,
  //   type,
  // } = file;

  // let filetype = undefined;
  // switch (type) {
  //   case 'image/jpeg':
  //     filetype = '.jpeg';
  //     break;
  //   case 'image/png':
  //     filetype = '.png';
  //     break;
  //   default:
  //     filetype = undefined;
  // }

  // read file
  // readAsDataURL(file)
  //   .then((imageString) => {
  //     // create image object
  //     const newName = `${imageId}${filetype}`;
  //     const imageName = `${accessKey}/${newName}`;

  //     const image = {
  //       id: imageId,
  //       lastModified,
  //       name: newName,
  //       type,
  //       size,
  //     };
      
  //     console.log(imageString);

  //     // translate to base64
  //     // const imageString = createImageString(event);
  //     const buffer = Buffer.from(imageString, 'base64');

  //     const s3Promise = uploadToS3(bucketName, imageName, buffer)
  //       .then(() => {
  //         return Promise.resolve({ image: image, imageId });
  //       });
  //       // .then(() => {
  //       //   dispatch(imageUploadSuccess(imageId));
  //       //   dispatch(imageAddImage({ image, imageId }));
  //       //   // dispatch(imageAddImage({ image, imageId }));
  //       //   dispatch(imageSelectImage(imageId));
  //       // })
  //       // .catch((error) => {
  //       //   dispatch(imageUploadFailure(imageId, error));
  //       // });

  //     return Promise.all([s3Promise]);
  //   })
  //   .then(() => {
  //     // const imageResults = results[0];
  //     // const { image } = imageResults;

  //     dispatch(imageUploadSuccess(imageId));
  //     dispatch(imageAddImage({ image, imageId }));
  //     console.log(image);
  //   })
  //   .catch((error) => {
  //     dispatch(imageUploadFailure(imageId, error));
  //   });

  // const split = name.split('.');

  // if (filetype) {
  //   const newName = `${imageId}${filetype}`;
  //   const imageName = `${accessKey}/${newName}`;

  //   const image = {
  //     id: imageId,
  //     lastModified,
  //     name: newName,
  //     type,
  //     size,
  //   }
  
  //   fileReader.onload = (event) => {
  //     const imageString = createImageString(event);
  //     const buffer = Buffer.from(imageString, 'base64');
  
  //     // do upload
  //     uploadToS3(bucketName, imageName, buffer)
  //       .then(() => {
  //         dispatch(imageUploadSuccess(imageId));
  //         dispatch(imageAddImage({ image, imageId }));
  //         // dispatch(imageAddImage({ image, imageId }));
  //         dispatch(imageSelectImage(imageId));
  //       })
  //       .catch((error) => {
  //         dispatch(imageUploadFailure(imageId, error));
  //       });
  //   };
  
  //   // read file and start upload
  //   // fileReader.readAsDataURL(file);
  // } else {
  //   console.log('invalid file');
  // }
// };

// reducers
const imageById = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return {
        ...state,
        [action.imageId]: action.image,
      };
    default:
      return state;
  }
};

const imageIds = (state = [], action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return [...new Set([...state, action.imageId])];
    default:
      return state;
  }
};

const selectedImage = (state = '', action) => {
  switch (action.type) {
    case IMAGES_SELECT_IMAGE:
      return action.imageId;
    default:
      return state;
  }
};

const request = (state = RequestStatus.INITIAL, action) => {
  switch (action.type) {
    case IMAGES_UPLOAD_REQUEST:
      return RequestStatus.PENDING;
    case IMAGES_UPLOAD_SUCCESS:
      return RequestStatus.SUCCESS;
    case IMAGES_UPLOAD_FAILURE:
      return RequestStatus.FAILRUE;
    default:
      return state;
  }
};

export {
  addImage,
};

export default combineReducers({
  imageById,
  imageIds,
  selectedImage,
  request,
});

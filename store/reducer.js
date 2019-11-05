

import {
  PICTURE_SENT,
  CAMERA_PERMISSION_GRANTED,
  CAMERA_ROLL_PERMISSION_GRANTED,
  TAKING_PICTURE,
  PREDICTION_RECEIVED,
  RESET_PREDICTION,
  PHOTOS_LOADED
} from "./actions";

export default function reducer(
  state = {
    hasCameraPermission: false,
    hasCameraRollPermission: false,
    pictureSent: false,
    takingPicture: false,
    predictions: [],
    prediction: false,
    photos: [],
  },
  action
) {
  switch (action.type) {
    case PHOTOS_LOADED: {
      return update(state, {
        photos: [...action.photos.edges]
      })
    }
    case RESET_PREDICTION: {
      return update(state, {
        predictions: {},
        prediction: false
      })
    }
    case PREDICTION_RECEIVED: {
      let preds = [];
      for (let [key, value] of Object.entries(action.predictions)) {
        for (let [className, pred] of Object.entries(value)) {
          preds.push(prediction = { className, pred })
        }
      }
      return update(state, {
        pictureSent: false,
        prediction: true,
        predictions: [...preds],
      })
    }
    case TAKING_PICTURE: {
      return update(state, {
        takingPicture: true,
      })
    }
    case CAMERA_PERMISSION_GRANTED: {
      return update(state, {
        hasCameraPermission: true,
      })
    };
    case PICTURE_SENT: {
      return update(state, {
        pictureSent: true,
        takingPicture: false,
      })

    };
    case CAMERA_ROLL_PERMISSION_GRANTED: {
      return update(state, {
        hasCameraRollPermission: true,
      })
    }

    default: {
      return state;
    }
  }
}

export const update = (state, mutations) => {
  return Object.assign({}, state, mutations);
};

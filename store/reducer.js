

import {
  PICTURE_SENT,
  CAMERA_PERMISSION_GRANTED,
  CAMERA_ROLL_PERMISSION_GRANTED,
  TAKING_PICTURE,
  PREDICTION_RECEIVED,
  RESET_PREDICTION
} from "./actions";

export default function reducer(
  state = {
    hasCameraPermission: false,
    hasCameraRollPermission: false,
    pictureSent: false,
    takingPicture: false,
    predictions: [],
    prediction: false,
  },
  action
) {
  switch (action.type) {
    case RESET_PREDICTION: {
      return update(state, {
        predictions: {},
        prediction: false
      })
    }
    case PREDICTION_RECEIVED: {
      console.log(action.predictions)
      let preds = [];
      for (let [key, value] of Object.entries(action.predictions)) {
        console.log(key);
        for (let [className, pred] of Object.entries(value)) {
          console.log(className, " ", pred)
          preds.push(prediction = { className, pred})
        }
      }
      console.log(preds)
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

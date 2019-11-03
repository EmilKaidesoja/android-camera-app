

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
    prediction: "",
  },
  action
) {
  switch (action.type) {
    case RESET_PREDICTION: {
      return update(state, {
        prediction: "",
      })
    }
    case PREDICTION_RECEIVED: {
      return update(state, {
        pictureSent: false,
        prediction: action.prediction
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

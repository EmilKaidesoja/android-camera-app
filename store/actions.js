import { axiosCallApi } from "../middleware/axiosApi";
import * as Permissions from "expo-permissions";


export const PICTURE_SENT = "PICTURE_SENT";
export const CAMERA_PERMISSION_GRANTED = "";
export const CAMERA_ROLL_PERMISSION_GRANTED = "CAMERA_ROLL_PERMISSION_GRANTED";
export const TAKING_PICTURE = "TAKING_PICTURE";
export const PREDICTION_RECEIVED = "PREDICTION_RECEIVED"
export const RESET_PREDICTION = "RESET_PREDICTION"

const URL = "https://85fc6bf6.ngrok.io"
const FORM_HEADERS = { "Content-Type": 'multipart/form-data' }

export function sendPicture(localUri) {
    return (dispatch, getState) => {
        dispatch({type: PICTURE_SENT})
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        endpoint = "/predict"

        axiosCallApi(URL, endpoint, FORM_HEADERS, "POST", formData).then(response => {
            dispatch({type: PREDICTION_RECEIVED, prediction: response})
        })
    }
}

export function askCameraPermission() {
    return (dispatch, getState) => {
        Permissions.askAsync(Permissions.CAMERA).then(res => {
            if (res.status !== 'granted') {
                alert('This app needs permission to use camera');
            } else {
                dispatch({ type: CAMERA_PERMISSION_GRANTED })
            }
        })
    }
}
export function askCameraRollPermission() {
    return (dispatch, getState) => {
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(res => {
            if (res.status !== 'granted') {
                alert('This app needs permission to use gallery');
            } else {
                dispatch({ type: CAMERA_ROLL_PERMISSION_GRANTED })
            }
        })
    }
}
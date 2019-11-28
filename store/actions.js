import { axiosCallApi } from "../middleware/axiosApi";
import * as Permissions from "expo-permissions";
import { CameraRoll } from "react-native"

let _ = require("underscore")

export const PICTURE_SENT = "PICTURE_SENT";
export const CAMERA_PERMISSION_GRANTED = "";
export const CAMERA_ROLL_PERMISSION_GRANTED = "CAMERA_ROLL_PERMISSION_GRANTED";
export const TAKING_PICTURE = "TAKING_PICTURE";
export const OPEN_IMAGE = "OPEN_IMAGE"
export const PREDICTION_RECEIVED = "PREDICTION_RECEIVED";
export const RESET_PREDICTION = "RESET_PREDICTION";
export const PHOTOS_LOADED = "PHOTOS_LOADED";
export const DISCARD_PIC = "DISCARD_PIC";
export const ERROR_CAUGHT = "ERROR_CAUGHT";
export const RESET_ERROR = "RESET_ERROR";
export const SLICK_CONFIG = "SLICK_CONFIG";
export const SET_SLICK_INDEX = "SET_SLICK_INDEX";
export const LOADING_IMAGES = "LOADING_IMAGES";

const URL = "https://1ea18ef9.ngrok.io" //"http://167.172.187.181:5000"
const FORM_HEADERS = { "Content-Type": 'multipart/form-data' }

export function sendPicture(localUri) {
    return (dispatch, getState) => {
        dispatch({ type: PICTURE_SENT })
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        endpoint = "/predict"

        axiosCallApi(URL, endpoint, FORM_HEADERS, "POST", formData).then(response => {
            dispatch({ type: PREDICTION_RECEIVED, predictions: response })
        }).catch(err => {
            console.log(err, " ERROR CAUGHT")
            dispatch({ type: ERROR_CAUGHT, error: true })
        })
    }
}

export function loadImages(amount) {
    return (dispatch, getState) => {
        let photoConfig = {
            first: amount,
            //groupName: "DCIM",
            assetType: 'Photos',
        }
        CameraRoll.getPhotos(photoConfig).then(imgs => {
            dispatch({ type: PHOTOS_LOADED, photos: imgs, imgAmount: amount })
        })
    }
}
export function saveToCameraRoll(uri, type) {
    return (dispatch, getState) => {
        let savedImages = getState().photos;
        let found = false
        _.forEach(savedImages, img => {
            if (img.node.image.uri == uri) {
                found = true
            }
        })
        if (!found) {
            CameraRoll.saveToCameraRoll(uri, type).then(() => {
                dispatch(loadImages(102))
            })
        }
    }
}

export function slickSwipeHandler(amount) {
    return (dispatch, getState) => {
        getState().slick.scrollBy(amount, true)
    }
}
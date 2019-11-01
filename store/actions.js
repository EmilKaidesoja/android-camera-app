import { axiosCallApi } from "../middleware/axiosApi";

export const PICTURE_SENT = "PICTURE_SENT";

const URL = "https://a3495501.ngrok.io"
const FORM_HEADERS = { "Content-Type": 'multipart/form-data' }

export function sendPicture(localUri) {
    return (dispatch, getState) => {
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        endpoint = "/predict"

        axiosCallApi(URL, endpoint, FORM_HEADERS, "POST", formData).then(response => {
            // Do stuff with response
            console.log(response, "RESPONSE")
        })
    }
}
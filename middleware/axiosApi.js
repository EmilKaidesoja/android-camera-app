import axios from "axios";

export function axiosCallApi(uri, endpoint, headers, method, body) {
    return new Promise(function (resolve, reject) {
        axios({
            url: uri + endpoint,
            headers: headers,
            method: method,
            data: body,
        }).then(response => {
            if (response.status == 200) {
                resolve(response.data)
            }
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}  
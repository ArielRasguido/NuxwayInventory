import axios from 'axios';
//-------------GET-------------------
export async function get(controllerName) {
    try {
        const response = await axios({
            url: `https://8ac81882.ngrok.io/api/${controllerName}`,
            method: 'GET'
        })
        //console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getById(controllerName,userId) {
    try {
        const response = await axios({
            url: `https://8ac81882.ngrok.io/api/${controllerName}/${userId}`,
            method: 'GET'
        })
        //console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function post(type,data) {
    try {
        const response = await axios.post(`https://8ac81882.ngrok.io/api/${type}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function put(type,data,id) {
    try {
        const response = await axios.put(`https://8ac81882.ngrok.io/api/${type}/${id}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

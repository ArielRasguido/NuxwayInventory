import axios from 'axios';
//-------------GET-------------------
export async function get(controllerName) {
    try {
        const response = await axios({
            url: `https://localhost:44347/api/${controllerName}`,
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
        const response = await axios.post(`https://localhost:44347/api/${type}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

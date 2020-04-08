import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL

//-------------GET-------------------
export async function get(controllerName) {
    try {
        const response = await axios({
            url: baseUrl + controllerName,
            method: 'GET'
        })
        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getById(controllerName,userId) {
    try {
        const response = await axios({
            url: baseUrl + `${controllerName}/${userId}`,
            method: 'GET'
        })
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//-------------POST-------------------
export async function post(type,data) {
    try {
        const response = await axios.post(baseUrl+`${type}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw error

    }
}

//-------------PUT-------------------
export async function put(type,data,id) {
    try {
        const response = await axios.put(baseUrl+`${type}/${id}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

//-------------DELETE-------------------
export async function deleteCustomer(type,id){
    try {
        const response = await axios.delete(baseUrl+`${type}/${id}`);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}
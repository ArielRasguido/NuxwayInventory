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

export async function getById(controllerName,userId) {
    try {
        const response = await axios({
            url: `https://localhost:44347/api/${controllerName}/${userId}`,
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

export async function put(type,data,id) {
    try {
        const response = await axios.put(`https://localhost:44347/api/${type}/${id}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCustomer(type,id){
    try {
        const response = await axios.delete(`http://nuxway.us-west-2.elasticbeanstalk.com/api/${type}/${id}`);
        return response;
        
    } catch (error) {
        console.log(error);
    }
}
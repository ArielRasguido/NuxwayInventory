import axios from 'axios';
//-------------GET-------------------
export async function get(controllerName) {
    try {
        const response = await axios({
            url: `http://nuxway.us-west-2.elasticbeanstalk.com/api/${controllerName}`,
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
            url: `http://nuxway.us-west-2.elasticbeanstalk.com/api/${controllerName}/${userId}`,
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
        const response = await axios.post(`http://nuxway.us-west-2.elasticbeanstalk.com/api/${type}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function put(type,data,id) {
    try {
        const response = await axios.put(`http://nuxway.us-west-2.elasticbeanstalk.com/api/${type}/${id}`,data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

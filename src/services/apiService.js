import axios from "axios";

let baseUrl = 'http://localhost:9000';
let axiosOptions = {
    crossDomain: true,
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:9000",
        "Content-Type": "application/json",
        data: {}
    }
}

let get = url => {
    return axios.get(url, {
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
            signature: "asd",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
            data: {}
        }
    });
};

let post = (url, data) => {
    return axios.post(url, data, );
};

let put = (url, data) => {
    return axios.put(url, data, axiosOptions);
};

let del = (url, data) => {
    return axios.delete(url, data, axiosOptions);
};

// API functions

// get dishes
const getAllDishes = () => {
    return get(`${baseUrl}/dishes`);
}

// get dish by id
const getSingleDishes = (id) =>{
    return get(`${baseUrl}/dishes/${id}`);
}

// clear dishes
const clearAllDishes = () => {
    return get(`${baseUrl}/dishes/clear`);
}

// delete dish by id
const deleteSingleDishes = (id) =>{
    return del(`${baseUrl}/dishes/${id}`);
}

// insert / update dish
const createOrUpdateDishes = (data) => {
    return put(`${baseUrl}/dishes`, data);
}

export default { getAllDishes, getSingleDishes, clearAllDishes, deleteSingleDishes, createOrUpdateDishes }
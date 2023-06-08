import axios from "axios";

const baseUrl = 'http://localhost:9000',
    axiosOptions = {
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:9000",
            "Content-Type": "application/json",
            Accept: "application/json",
            signature: "asd",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
            data: {}
        }
    },
    get = url => axios.get(url, axiosOptions),
    // post = (url, data) => axios.post(url, data, axiosOptions),
    put = (url, data) => axios.put(url, data, axiosOptions),
    del = (url, data) => axios.delete(url, data, axiosOptions),

    // API functions
    // get dishes
    getAllDishes = () => get(`${baseUrl}/dishes`),
    // get dish by id
    getSingleDishes = (id) => get(`${baseUrl}/dishes/${id}`),
    // clear dishes
    clearAllDishes = () => get(`${baseUrl}/dishes/clear`),
    // delete dish by id
    deleteSingleDishes = (id) => del(`${baseUrl}/dishes/${id}`),
    // insert / update dish
    createOrUpdateDishes = (data) => put(`${baseUrl}/dishes`, data)

export default { getAllDishes, getSingleDishes, clearAllDishes, deleteSingleDishes, createOrUpdateDishes }
import axios from "axios";



const baseURL = 'https://encuesta-mineria-caso-1.onrender.com';

const getLocations = async() => {
    try {
        const locations = await axios.get(`${baseURL}/api/locations/all`);
        if(!locations){
            return null
        }
        return locations;
    } catch (error) {
        console.log(error);
    }
}

const getStudies = async() => {
    const studies = await axios.get(`${baseURL}/api/studies/all`);
    if(!studies){
        return null
    }
    return studies
}

const getGenders = async() => {
    const genders = await axios.get(`${baseURL}/api/gender/all`);
    if(!genders){
        return null;
    }
    return genders;
}

const sendForm = async(encuesta) => {
    try {
        const res = await axios.post(`${baseURL}/api/survey`, encuesta);
        if(res.status !== 201){
            throw new Error({title: 'Error', message: `${res.status} - ${res.statusText}`});
        }
        return res;
    }catch(error){
        return error;
    }
}

export { getLocations, getStudies, getGenders, sendForm };
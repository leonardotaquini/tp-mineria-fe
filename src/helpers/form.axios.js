import axios from "axios";


const baseURL = 'http://localhost:3000';

const getLocations = async() => {
    try {
        const locations = await axios.get(`${baseURL}/api/locations/all`);
        if(!locations){
            return null
        }
        return locations;
    } catch (error) {
        
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

export { getLocations, getStudies, getGenders };
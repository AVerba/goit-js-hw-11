
import apiSettings from './settings';
const { API_KEY, BASE_URL }=apiSettings;

export const fetchImages = async ()=>{
    try{
        const respoonse =await fetch(`${BASE_URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo`);
        const result = await respoonse.json();
        return result;
    }
    catch (error){
        console.dir(error);
    }
}
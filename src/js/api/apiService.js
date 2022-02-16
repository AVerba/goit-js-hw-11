
import apiSettings from './settings';
const { API_KEY, BASE_URL }=apiSettings;

export const fetchImages = async (query)=>{
    try{
        const respoonse =await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&per_page=40&&image_type=photo`);
        const result = await respoonse.json();
        return result;
    }
    catch (error){
        console.dir(error);
    }
}

// ,webformatURL,largeImageURL,tags,likes,views,comments,downloads
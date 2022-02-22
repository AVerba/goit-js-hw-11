const axios = require('axios');
import apiSettings from './settings';
const { API_KEY, BASE_URL }=apiSettings;

export class imageService{
    constructor() {
        this.inputQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        try{
            const respoonse =await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.inputQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
            const result = await respoonse.json();
            return result;  
        }
        catch (error){
            console.dir(error);
        }
    }

    get searchQuery() {
        return this.inputQuery;
    }

    set searchQuery(newQuery) {
        this.inputQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}


// export const fetchImages = async (query)=>{
//     try{
//         const respoonse =await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&per_page=40&&image_type=photo`);
//         const result = await respoonse.json();
//         return result;
//     }
//     catch (error){
//         console.dir(error);
//     }
// }

const axios = require('axios'); 
import apiSettings from './settings';
const { API_KEY, BASE_URL }=apiSettings;

export default class ImagesApiService{
    constructor() {
        this.query = '';
        this.page = 1;
    }

    async fetchImages() {

        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
        const data = await response.data;

        return data;
    }

    get searchQuery() {
        return this.query;
    }

    set searchQuery(newQuery) {
        this.query = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
import { fetchImages } from "./api/apiService";

const ref={
    imageGallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
}

fetchImages().then((res)=>{

console.log(res)
})
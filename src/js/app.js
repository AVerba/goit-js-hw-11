import { fetchImages } from "./api/apiService";

const ref={
    imageGallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
}

fetchImages('flowers').then((res)=>{
    const {hits: items}=res;
    items.map((item)=>{
        console.log(item.previewURL)
    })
})
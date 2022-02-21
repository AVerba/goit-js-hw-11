import { fetchImages } from "./api/apiService";
import { createImageCard } from "./createImageCard"; 
import { createImageList } from "./renderImageCard";

const ref={
    imageGallery: document.querySelector('.cards-set'),
    searchForm: document.querySelector('.search-form'),
}

const searchFormHendler=(e)=>{
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchQuery.value.trim();
    console.log (searchValue);

    fetchImages(searchValue).then((res)=>{
        const {hits: items}=res;
        ref.imageGallery.innerHTML= createImageList(items);       
    })
}


ref.searchForm.addEventListener('submit', searchFormHendler)
ref.imageGallery.addEventListener('scroll', ()=>{
    if (ref.imageGallery.scrollTop + ref.imageGallery.clientHeight >= ref.imageGallery.scrollHeight) {
        fetchImages('cats').then((res)=>{
            const {hits: items}=res;
            ref.imageGallery.innerHTML= createImageList(items);       
        })
      }

})


export const createImageCard=(item)=>{
    const {comments,downloads,likes,largeImageURL,tags}= item;



    return `
    <li class="card">
    <div class="card__thumb">
      <img src="${largeImageURL}" alt="${tags}" width="450">
    </div>
    <div class="card__content info">
      <ul class="info__list">
        <li class="info__item">
          <svg class="icon" width="20" height="20">
            <!-- <use xlink:href="./images/icons/icons.svg#twitter"></use> -->
          </svg>
          <span class="info__text">likes ${likes}</span>
        </li>
    
        <li class="info__item">
          <svg class="icon" width="20" height="20">
            <!-- <use xlink:href="./images/icons/icons.svg#twitter"></use> -->
          </svg>
          <span class="info__text">comments ${comments}</span>
        </li>
    
        <li class="info__item">
          <svg class="icon" width="20" height="20">
            <!-- <use xlink:href="./images/icons/icons.svg#twitter"></use> -->
          </svg>
          <span class="info__text">downloads ${downloads}</span>
        </li>
      </ul>
    </div>
    </li>   
            `;


}


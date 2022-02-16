export const smoothScroll=()=> {

    const { height: cardHeight } = document
        .querySelector('.card')
        .firstElementChild.getBoundingClientRect();

    console.log(cardHeight);
    window.scrollBy({
        top: cardHeight * 4,
        behavior: 'smooth',
    });

}
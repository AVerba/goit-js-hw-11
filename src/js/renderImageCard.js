import { createImageCard } from "./createImageCard";

export const createImageList=(images)=>{
    
    const list=images.map(image=>createImageCard(image)).join('');
    console.log(list)
    return list;
}


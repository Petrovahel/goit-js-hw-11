import axios from "axios";
import { getImagesByQuery } from "./pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  clearGallery();

  images.forEach(img => {
    const li = document.createElement("li");
    li.classList.add("gallery-item");

    const link = document.createElement("a");
    link.href = img.largeImageURL; 
    link.classList.add("gallery-link");

    const image = document.createElement("img");
    image.src = img.webformatURL;
    image.alt = img.tags;        
    image.classList.add("gallery-image");

    link.appendChild(image);
    li.appendChild(link);

    const info = document.createElement("div");
info.classList.add("image-info");
info.innerHTML = `
  <div class="info-item"><span class="label">Likes</span><span class="value">${img.likes}</span></div>
  <div class="info-item"><span class="label">Views</span><span class="value">${img.views}</span></div>
  <div class="info-item"><span class="label">Comments</span><span class="value">${img.comments}</span></div>
  <div class="info-item"><span class="label">Downloads</span><span class="value">${img.downloads}</span></div>
`;
li.appendChild(info);


    gallery.appendChild(li);
  });

  lightbox.refresh();
}



export function clearGallery() {
  gallery.innerHTML = "";
}

const loader = document.querySelector(".loader");

export function showLoader() {
  loader.classList.add("visible"); 
}

export function hideLoader() {
  loader.classList.remove("visible"); 
}

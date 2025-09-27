import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = e.target.elements["search-text"].value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Enter a search term!',
      position: 'topRight'
    });
    return;
  }

  showLoader();          
  clearGallery();        

  getImagesByQuery(query)
    .then(data => {
      if (!data || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight'
        });
        return;
      }

      createGallery(data.hits);
      iziToast.success({
        title: 'Success',
        position: 'topRight'
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Try again!',
        position: 'topRight'
      });
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });
});

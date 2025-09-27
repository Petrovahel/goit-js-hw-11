import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52494902-684cb5c524c2ed0eff7de14af";

export async function getImagesByQuery(query) {
  if (!query) return null; 

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
            safesearch: true
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error loading images:", error);
    return null;
  }
}

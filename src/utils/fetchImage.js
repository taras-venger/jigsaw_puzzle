import axios from 'axios';

export const fetchImage = (width, height) =>
  axios
    .get(`https://source.unsplash.com/random/${width}x${height}`)
    .then(image => image.request.responseURL);

/*jshint esversion: 6 */
/* global gapi */
import $ from 'jquery';

const searchYouTube = (options, cb) => {
  options = options || 
    {key: window.YOUTUBE_API_KEY, query: 'react', maxResults: 25};
  
  const data = {
    part: 'snippet',
    type:'video',
    videoEmbeddable: 'true',
    key: options.key,
    maxResults: options.maxResults,
    q: options.query
  };

  const getSearchResults = async () => {
    //
  };

  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: data,
    dataType: 'json',
    success: ( (data) => {
      if (cb) {
        console.log('>>>>>>>>>> data.items:', data.items);
        cb(data.items);
      }
    })
  });
} 

export default searchYouTube;
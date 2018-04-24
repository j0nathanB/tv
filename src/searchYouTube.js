/*jshint esversion: 6 */
/* global gapi */
import $ from 'jquery';

const searchYouTube = (options, cb) => {
  options = options || 
    {key: window.YOUTUBE_API_KEY, query: 'react', maxResults: 5};
  
    const data = {
      part: 'snippet',
      type:'video',
      videoEmbeddable: 'true',
      key: options.key,
      maxResults: options.max,
      q: options.query
    };

    // console.log('>>>>>>>>>> options.query:', options.query);
  
  // fetch('https://www.googleapis.com/youtube/v3/search')
  //   .then(res => console.log('res', res));

  // const request = gapi.client.youtube.search.list({
  //   part: "snippet",
  //   type: "video",
  //   q: encodeURIComponent(options.query).replace(/%20/g, "+"),
  //   maxResults: 3,
  // }); 
// execute the request
// request.execute(function(response) {
//   var results = response.result;
//   console.log('>>>>>>>>>> results:', results);
  // $("#results").html("");
  // $.each(results.items, function(index, item) {
  //   $.get("tpl/item.html", function(data) {
  //       $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
  //   });
//});

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
/*
 * LastFM api - get music list
 */

var XHRLastFm = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var XHRLastFm = new XHRLastFm();

XHRLastFm.open(
  'GET',
  'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=sergeytovarov&api_key=9dac3ab37b627ef81e9f9c97cd2f6da5&format=json&period=1month&limit=10',
  true
);

XHRLastFm.onload = function() {
  var response =  JSON.parse(this.responseText);
  var responseTracks = response.toptracks.track;
  var wrapper = document.querySelector('.js-last-fm');

  responseTracks.forEach( function(track, i) {
    var listItem = document.createElement('li');

    var link = document.createElement('a');
    link.href = track.url;
    link.target = '_blank';
    link.innerText = '(' + track.playcount + ') ' +track.artist.name + ' — ' + track.name;

    listItem.appendChild(link);
    wrapper.appendChild(listItem);
  });
}

XHRLastFm.onerror = function() {
  console.log( 'С LastFM API что-то пошло не так: ' + this.status );
}

XHRLastFm.send();



/*
 * Instagram pgotos by id
 */

var instagramPhotos = ['BaQtnkjHUCl', 'BaPOo_on_RD', 'BaOP9BaH3_y', 'BaL7e9pHHBT'];
var photoWrapper = document.querySelector('.js-instagram');

instagramPhotos.forEach(function(photo, i){
  var linkToPhoto = 'https://instagram.com/p/' + photo + '/media/?size=l';

  var image = document.createElement('img');
  image.alt = 'Фото из инстаграма ' + i;
  image.src = linkToPhoto;

  photoWrapper.appendChild(image);
});

/*
 * LastFM api - get music list
 */

var XHRLastFm = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var XHRLastFm = new XHRLastFm();

var containerMusicLoader = document.querySelector('.music');
containerMusicLoader.classList.add('music-loader');

XHRLastFm.open(
  'GET',
  'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=sergeytovarov&api_key=9dac3ab37b627ef81e9f9c97cd2f6da5&format=json&period=1month&limit=7',
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

  containerMusicLoader.classList.remove('music-loader');
}

XHRLastFm.onerror = function() {
  console.log( 'С LastFM API что-то пошло не так: ' + this.status );
  containerMusicLoader.classList.remove('music-loader');
  containerMusicLoader.classList.add('music-fail');
}

XHRLastFm.send();

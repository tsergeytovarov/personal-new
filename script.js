/*
 * LastFM api - get music list
 */

var XHRLastFm = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var XHRLastFm = new XHRLastFm();

var containerMusicLoader = document.querySelector('.music');
containerMusicLoader.classList.add('music-loader');

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

  containerMusicLoader.classList.remove('music-loader');
}

XHRLastFm.onerror = function() {
  console.log( 'С LastFM API что-то пошло не так: ' + this.status );
  containerMusicLoader.classList.remove('music-loader');
  containerMusicLoader.classList.add('music-fail');
}

XHRLastFm.send();

var XHRInsta = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var XHRInsta = new XHRInsta();

var containerInstaLoader = document.querySelector('.js-instagram');
containerInstaLoader.classList.add('music-loader');

XHRInsta.open(
  'GET',
  'https://api.instagram.com/v1/users/self/media/recent/?access_token=6213610920.d54010f.b8e1f2486d8e42baa8a8fc0f9e51a20a&count=5',
  true
);

XHRInsta.onload = function() {
  var response =  JSON.parse(this.responseText);

  // console.log(response);

  var photos = response.data;
  var wrapper = document.querySelector('.js-instagram');

  photos.forEach( function(photo, i) {

    var photoImage = photo.images.standard_resolution.url;
    var photoLikes = photo.likes.count;
    var photoAlt = 'Картинка из инстаграма';

    if (photo.caption !== null) {
      var photoAlt = photo.caption.text;
    }


    var div = document.createElement('div');
    div.classList.add('photos__item');

    var img = document.createElement('img');
    img.src = photoImage;
    img.width = 400;
    img.alt = photoAlt;

    var likes = document.createElement('div');
    likes.classList.add('photos__likes');
    likes.innerText = photoLikes;

    div.appendChild(img);
    div.appendChild(likes);

    wrapper.appendChild(div);
  });

  containerInstaLoader.classList.remove('music-loader');
}

XHRInsta.onerror = function() {
  console.log( 'С LastFM API что-то пошло не так: ' + this.status );
  containerInstaLoader.classList.remove('music-loader');
  containerInstaLoader.classList.add('music-fail');
}

XHRInsta.send();

var xrh = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xrh = new xrh();

xrh.open(
  'GET',
  'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sergeytovarov&api_key=9dac3ab37b627ef81e9f9c97cd2f6da5&format=json',
  true
);

xrh.onload = function() {
  var response =  JSON.parse(this.responseText);

  var track = response.recenttracks.track[0];

  if (track['@attr']) {

    var name = track.artist["#text"] + " — " + track.name;
    var image = track.image["3"]["#text"];

    var div = document.createElement('div');
    div.classList.add('scrobbler');

    var title = document.createElement('p');
    title.classList.add('scrobbler__title');
    title.innerText = name;
    div.appendChild(title);

    if (image !== '') {
      var img = document.createElement('img');
      img.src = image;
      img.width = 400;
      img.alt = name;
      div.appendChild(img);
    }

    var wrapper = document.querySelector('.js-scrobbler');
    wrapper.appendChild(div);

    var live = document.querySelector('.live');
    live.classList.add('live--active');
  }
}

xrh.onerror = function() {
  console.log( 'неа' );
}

xrh.send();

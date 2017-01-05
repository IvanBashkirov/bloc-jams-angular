(function () {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    var getSongIndex = function (song) {
      return currentAlbum.songs.indexOf(song);
    }

    /*
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

    /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function (song) {
      if (currentBuzzObject) {
        stopSong(SongPlayer.currentSong);
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function () {
        SongPlayer.$scope.$apply(function () {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    }

    var stopSong = function (song) {
      currentBuzzObject.stop();
      song.playing = null;
    };


    /*
     * @function playSong
     * @desc Plays an audio file
     */
    var playSong = function () {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    }

    /*
     * @desc song object containing song meta data
     * @type {Object}
     */
    SongPlayer.currentSong = null;

    /*
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;

    SongPlayer.currentArtist = currentAlbum.artist;
    
    SongPlayer.volume = 0;

    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
    SongPlayer.setCurrentTime = function (time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };
    
    SongPlayer.setVolume = function (vol) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(vol);
      }
    };

    /*
     * @function SongPlayer.play
     * @desc Song player method that sets a song and plays it
     * @param {Object} song
     */
    SongPlayer.play = function (song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong();

      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong();
        }
      }
    };

    /*
     * @function SongPlayer.pause
     * @desc Song player method that pauses a song
     * @param {Object} song
     */
    SongPlayer.pause = function (song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.previous = function () {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    SongPlayer.next = function () {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

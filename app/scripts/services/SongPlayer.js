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
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    }

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
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
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
    .factory('SongPlayer', SongPlayer);
})();

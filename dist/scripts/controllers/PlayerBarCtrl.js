(function () {
  function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    this.songPlayer.$scope = $scope;
  }

  angular
    .module('blocJams')
    .controller('PlayerBarCtrl', ['$scope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();

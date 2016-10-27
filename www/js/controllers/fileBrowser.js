app.controller('fileBrowserCtrl', function ($scope, $fileFactory, $ionicPlatform) {

  console.log('fileBrowserCtrl');


  $ionicPlatform.ready(function() {
    var fs = new $fileFactory();
    
    fs.getEntriesAtRoot().then(function(result) {
      console.log(JSON.stringify(result[0]));
      $scope.files = result;
    }, function(error) {
      console.log(JSON.stringify(error));
    });

    $scope.getContents = function(path) {
      fs.getEntries(path).then(function(result) {
        console.log(JSON.stringify(result[0]));
        $scope.files = result;
        $scope.files.unshift({name: "[parent]"});
        fs.getParentDirectory(path).then(function(result) {
          result.name = "[parent]";
          $scope.files[0] = result;
        });
      }, function(error) {
        console.log(JSON.stringify(error));
      })
    }
  });


});
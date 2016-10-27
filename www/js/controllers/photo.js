app.controller('photoCtrl', function ($scope) {

  document.addEventListener('deviceready', function(){
    var $content = document.getElementById("content");

    galleryAPI.getAlbums(function(items){
      console.log(JSON.stringify(items));
      var html = "<ul class='list'>";

      for(var i = 0; i < items.length; i++)
      {
        var album = items[i];

        html += '<li class="item"><a href="javascript:loadAlbum(\'' + album.title + '\')" class="album"><span>' + escape(album.title) + '</span></a></li>';
      }

      html +='</ul>'

      $content.innerHTML = html;

    }, function(error){alert(error);});

    window.loadAlbum = function(albumName){
      console.log('title: ', albumName);
      galleryAPI.getMedia(albumName, function(items){
      console.log(JSON.stringify(items));
        
        var html = "";

        for(var i = 0; i < items.length; i++)
        {
          var media = items[i];

          html += '<a href="javascript:void()" class="media"><img src="file://' + media.thumbnail + '" /></a>';
        }

        $content.innerHTML = html;

      }, function(error){alert(error);});
    };

  }, false);



})
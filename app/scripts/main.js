var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

Vue.filter('msToSecond', function(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
});

var app = new Vue({
	el: '#app',
	data: {
		query: "",
		results: [],
		showAdditionalInfo: false,
		showSearchResults: true,
		trackInfo: []
	},
	methods: {
		instantSearch: function() {
			var _this = this;

			delay(function(){
		      _this.search();
		    }, 300 );
		},
		search: function() {
			this.showSearchResults = true;
			this.showAdditionalInfo = false;

			this.$http.get('https://api.spotify.com/v1/search?q=' + this.query + '&type=track')
				.then(function(res) {
					var tracks = res.data.tracks.items.map(function(track) {
						return { 
							song: track.name,
							songId: track.id,
							artistName: track.artists[0].name,
							artistId: track.artists[0].id,
							albumTitle: track.album.name,
							albumArt: track.album.images[0],
							previewUrl: track.preview_url,
							duration: track.duration_ms,

						};
					});

					this.$set('results', tracks);
				});
		},
		showTrackInfo: function(index) {
			this.showSearchResults = false;
			this.showAdditionalInfo = true;

			this.$set('trackInfo', this.results[index]);
		}
	}
});

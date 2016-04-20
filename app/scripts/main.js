var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

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

			this.$http.get('http://localhost:3000/api/search/' + this.query)
				.then(function(res) {
					this.$set('results', res.data);
				});
		},
		showTrackInfo: function(index) {
			this.showSearchResults = false;
			this.showAdditionalInfo = true;

			var track = this.results[index];

			var query = track.song + " " + track.artistName;

			console.log(query);

			this.$http.get('http://localhost:3000/api/lookup/' + track.songId)
				.then(function(res) {
					console.log(res);
					track.itunesLink = res.data[0];
					this.$set('trackInfo', track);
				})
		}
	}
});

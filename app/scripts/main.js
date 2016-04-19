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
		results: []
	},
	methods: {
		instantSearch: function() {
			_this = this;
			delay(function(){
		      _this.search();
		    }, 300 );
		},
		search: function() {
			this.$http.get('http://localhost:3000/api/get/' + this.query)
				.then(function(res) {
					this.$set('results', res.data);
				});
		}
	}
});

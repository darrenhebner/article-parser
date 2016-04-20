var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

var ACCESS_TOKEN = "4fba924330844002b0ddd2ca7efbe4f2";

var app = express();

var portNum = 3000;
app.listen(portNum, function () {
	console.log('Listening on port:', portNum);
});

app.use(bodyParser());
app.use(cors());

app.use(express.static(__dirname + '/'));

// Endpoints

app.get('/api/search/:query', function (req, res) {
	request("https://api.spotify.com/v1/search?q=" + req.params.query + "&type=track", function(err, response, body) {
		var data = JSON.parse(body);
		var tracks = data.tracks.items.map(function(track) {
			return { 
				song: track.name,
				songId: track.id,
				artistName: track.artists[0].name,
				artistId: track.artists[0].id,
				albumTitle: track.album.name,
				albumArt: track.album.images[0],
				previewUrl: track.preview_url
			};
		});
		
		res.json( tracks );
	});
});

app.get('/api/lookup/:id', function(req, res) {

	var options = {
		url: "https://api.spotify.com/v1/audio-features/" + req.params.id,
		headers: {
			'Authorization': 'Bearer ' + ACCESS_TOKEN
		}
	};

	request(options, function(err, response, body) {
		var data = JSON.parse(body);
		res.json( data );
	});
});


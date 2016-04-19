var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

var app = express();

var portNum = 3000;
app.listen(portNum, function () {
	console.log('Listening on port:', portNum);
});

app.use(bodyParser());
app.use(cors());

app.use(express.static(__dirname + '/'));

// Endpoints

app.get('/api/get/:query', function (req, res) {
	request("https://api.spotify.com/v1/search?q=" + req.params.query + "&type=track", function(err, response, body) {
		var data = JSON.parse(body);
		var tracks = data.tracks.items.map(function(track) {
			console.log(track);
			return { 
				song: track.name,
				songId: track.id,
				artistName: track.artists[0].name,
				artistId: track.artists[0].id,
				albumTitle: track.album.name,
				albumArt: track.album.images[0]
			};
		});
		
		res.json( tracks );
	});
});


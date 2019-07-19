var fs = require("fs");
var axios= require("axios");
var moment= require("moment");
var dotenv= require("dotenv");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");


var spotify = new Spotify(keys.config);
var nodeArgs = process.argv;

var command = process.argv[2];
var search ="";
        





for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      search = search + "+" + nodeArgs[i];
    } else {
      search += nodeArgs[i];
  
    }
  }



switch (command) {
    case `concert-this`:
      concertThis(search)
      break;
    
    case `spotify-this-song`:
      spotifyThis(search);        
    break;
    
    case `movie-this`:
        movieThis(search);
    break;
    
    case `do-what-it-says`:
        fs.readFile("random.txt", "utf8", function(error, data) {
          if (error) {
            return console.log(error);
          }

          var dataArr = data.split(" ");
          //console.log(dataArr);
          if (dataArr[2] === `concert-this`){
            concertThis(dataArr[3]) 
          }
          else if (dataArr[2] === `spotify-this-song`){
          spotifyThis(dataArr[3])
          }
          else if ( dataArr[2]=== 'movie-this'){
            console.log(dataArr[3]);

            movieThis(dataArr[3])
          }
          else {
            console.log ("Not a recognized command")
          }
          




        });
        

    break;
    
    default:
      console.log ("Not a recognized command");
    break;

    }

    function concertThis(search)
    {
      axios.get("https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp&date=upcoming").then(
        function(response){
            //console.log(response.data );
            console.log("Venue is " + response.data[0].venue.name);
            console.log("Venue location is "+ response.data[0].venue.city);
            console.log("Date of Venue is " + (response.data[0].datetime.split('T'))[0]);
        }
    )

    }

    function movieThis(search)
    {
      axios.get("http://www.omdbapi.com/?t="+search+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
          
          console.log("The movie's title is: " + response.data.Title);
          console.log("The movie's rating is: " + response.data.imdbRating);
          console.log("Year the movie came out" + response.data.Year);
          console.log("Rotten Tomatoes Rating of the movie is " + response.data.Ratings[1].Value);
          console.log(" Country where the movie was produced"+ response.data.Country);
          console.log("Language of the movie" + response.data.Language);
          console.log("Plot of the movie"+ response.data.Plot);
          console.log("Actors in the movie" + response.data.Actors);
        }
      );
    }

    function spotifyThis(search)
    {
      spotify.search({ type: 'track', query: search, limit :10 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //console.log(data.tracks.items[0].album);
      console.log ("Artist is " + data.tracks.items[0].artists[0].name)
      console.log("The song name " + data.tracks.items[0].name )
      console.log("A preview link of the song from Spotify " + data.tracks.items[0].preview_url)
      console.log("The album that the song is from" + data.tracks.items[0].album)

      });

    }
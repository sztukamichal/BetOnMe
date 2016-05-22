'use strict';

var request = require('request');
var config = require('./../config');
var Season = require('./../models/soccerseason');
var headers = {"X-Auth-Token": config.footballApiToken};

function importToDatabase(seasons) {
  function buildSeasonObject(season, currentIndex) {
    console.log('Getting %d season of %d seasons...', currentIndex + 1, seasons.length);
    function saveToDatabase() {
      var newSeason = new Season(season);
      console.log('Saving...');
      newSeason.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Season saved.');
          if (currentIndex < seasons.length - 1) {
            currentIndex += 1;
            buildSeasonObject(seasons[currentIndex], currentIndex);
          }
        }
      });
    }

    function getLeagueTable() {
      console.log('Getting league table...');
      request({url: season._links.leagueTable.href, headers: headers}, function (error, response) {
        if (error) {
          console.log(error);
        } else if (response.statusCode === 200) {
          season.leagueTable = JSON.parse(response.body);
          saveToDatabase();
        } else if (response.statusCode === 404) {
          season.leagueTable = null;
          saveToDatabase();
        } else {
          console.log(response);
        }
      });
    }

    function getFixtures() {
      console.log('Getting fixutres...');
      request({url: season._links.fixtures.href, headers: headers}, function (error, response) {
        if (error) {
          console.log(error);
        } else if (response.statusCode === 200) {
          season.fixtures = JSON.parse(response.body);
          setTimeout(getLeagueTable, 1500);
        } else if (response.statusCode === 404) {
          season.fixtures = null;
          setTimeout(getLeagueTable, 1500);
        } else {
          console.log(response);
        }
      });
    }

    function getTeams() {
      console.log('Getting teams...');
      request({url: season._links.teams.href, headers: headers}, function (error, response) {
        if (error) {
          console.log(error);
        } else if (response.statusCode === 200) {
          season.teams = JSON.parse(response.body);
          setTimeout(getFixtures, 1500);
        } else if (response.statusCode === 404) {
          season.teams = null;
          setTimeout(getFixtures, 1500);
        } else {
          console.log(response);
        }
      });
    }

    Season.findOne({id: season.id}, function (err, foundSeason) {
      if (err) {
        console.log('Error: importToDatabase seasons');
      } else if (foundSeason === null) {
        setTimeout(getTeams, 1500);
      } else {
        console.log('Season already in database');
        if (currentIndex < seasons.length - 1) {
          currentIndex += 1;
          buildSeasonObject(seasons[currentIndex], currentIndex);
        }
      }
    });
  }

  var currentIndex = 0;
  if (seasons.length > 0) {
    buildSeasonObject(seasons[currentIndex], currentIndex);
  }
}

function clearSeasonsInDatabase() {
  Season.remove({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Seasons removed');
    }
  })
}

module.exports = {
  importSeasons: function (removeExisting) {
    if (removeExisting) {
      clearSeasonsInDatabase();
    }
    var seasons = [];
    var seasons2016 = [];
    request({url: config.externalFootballQueries.soccerSeasons + '?season=2015', headers: headers}, function (error, response) {
      if (!error && response.statusCode === 200) {
        seasons = JSON.parse(response.body);
        request({
          url: config.externalFootballQueries.soccerSeasons + '?season=2016',
          headers: headers
        }, function (error, response) {
          if (!error && response.statusCode === 200) {
            seasons = seasons.concat(JSON.parse(response.body));
            importToDatabase(seasons);
          }
        });
      }
    });
  }
};
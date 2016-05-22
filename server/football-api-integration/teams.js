'use strict';

var request = require('request');
var config = require('./../config');
var Season = require('./../models/soccerseason');
var Team = require('./../models/team');
var headers = {"X-Auth-Token": config.footballApiToken};
var Q = require('q');

function importToDatabase(linksToTeams) {

  function buildTeamObjectAndSaveToDatabase(currentIndex) {
    console.log('Getting %d team of %d teams...', currentIndex + 1, linksToTeams.length);
    var team;

    function saveToDatabase() {
      var newTeam = new Team(team);
      console.log('Saving...');
      newTeam.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Team saved.');
          if (currentIndex < linksToTeams.length - 1) {
            currentIndex += 1;
            setTimeout(function () {
              buildTeamObjectAndSaveToDatabase(currentIndex);
            },1300);
          }
        }
      });
    }

    function getPlayers() {
      console.log('Getting players...');
      request({url: team._links.players.href, headers: headers}, function (error, response) {
        if (error) {
          console.log(error);
        } else if (response.statusCode === 200) {
          team.players = JSON.parse(response.body);
          saveToDatabase();
        } else {
          console.log(response);
        }
      });
    }

    function getFixtures() {
      console.log('Getting fixutres...');
      request({url: team._links.fixtures.href, headers: headers}, function (error, response) {
        if (error) {
          console.log(error);
        } else if (response.statusCode === 200) {
          team.fixtures = JSON.parse(response.body);
          setTimeout(getPlayers, 1300);
        } else {
          console.log(response);
        }
      });
    }

    function searchInDatabase() {
      Team.findOne({code: team.code, name: team.name, shortName: team.shortName}, function (err, foundTeam) {
        if (err) {
          console.log('Error: importToDatabase teams');
        } else if (foundTeam === null) {
          setTimeout(getFixtures, 1300);
        } else {
          console.log('Team already in database...');
          if (currentIndex < linksToTeams.length - 1) {
            currentIndex += 1;
            setTimeout(function () {
              buildTeamObjectAndSaveToDatabase(currentIndex);
            },1300);
          }
        }
      });
    }

    request({url: linksToTeams[currentIndex], headers: headers}, function (error, response) {
      if (error) {
        console.log(error);
      } else if (response.statusCode === 200) {
        team = JSON.parse(response.body);
        searchInDatabase();
      } else {
        console.log(response);
      }
    });
  }

  var currentIndex = 0;
  if (linksToTeams.length > 0) {
    buildTeamObjectAndSaveToDatabase(currentIndex);
  }
}

function findAllTeams() {
  var linkDeferred = Q.defer();
  Season.findAllTeams(function (error, teams) {
    var linksToTeams = [];
    teams.forEach(function (season, seasonIdx, seasonArray) {
      season.teams.teams.forEach(function (team, teamIdx, teamArray) {
        linksToTeams.push(team._links.self.href);
        if(seasonIdx === seasonArray.length - 1 && teamIdx === teamArray.length -1) {
          linkDeferred.resolve(linksToTeams);
        }
      });
    });
  });
  return linkDeferred.promise;
}

module.exports = {
importTeams: function () {
    findAllTeams().then(function (linksToTeams) {
      importToDatabase(linksToTeams);
    });
  }
};
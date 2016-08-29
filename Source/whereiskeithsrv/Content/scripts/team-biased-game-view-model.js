define(
	[
		"underscore",
		"knockout",
		"moment",
		"data/parking-spots",
		"data/game-parking-spot-map",
		"parking-spot-view-model"
	],
	function(
		_,
		ko,
		moment,
		parkingSpots,
		gameParkingSpotMap,
		ParkingSpotViewModel
	) {
	    "use strict";

		var TeamBiasedGameViewModel = function (teamName, game) {
			var isHome;
			var opponentName;

		    this._game = game;

			if (game.homeTeamName === teamName) {
				isHome = true;
				opponentName = game.awayTeamName;
			} else if (game.awayTeamName === teamName) {
				isHome = false;
				opponentName = "@" + game.homeTeamName;
			} else {
			    alert("Team " + teamName + " is not involved in the game.");
			    return;
			}

			this.id = ko.observable(game.id);
			this.dateTime = ko.observable(moment(game.dateTime));
			this.isHome = ko.observable(isHome);
			this.opponentName = ko.observable(opponentName);

			this.date = ko.computed(formatDate, this);
			this.time = ko.computed(formatTime, this);
			this.parkingSpotCaption = ko.computed(getParkingSpotCaption, this);
			this.willAttendGame = ko.computed(willAttendGame, this);
		};

		function formatDate() {
		    return this.dateTime().format("M/D");
		};

		function formatTime() {
		    if (this._game.isTimeTBA) {
		        return "TBA";
		    } else {
		        return this.dateTime().format("h:mm A");
		    }
		};

		function getParkingSpotCaption() {
		    var parkingSpotId = gameParkingSpotMap[this.id()];

		    if (!parkingSpotId) {
		        return "N/A";
		    }

		    var byParkingSpotId = function(x) {
		        return x.id == parkingSpotId;
		    };

		    var parkingSpot = _.find(parkingSpots, byParkingSpotId);

		    return (new ParkingSpotViewModel(parkingSpot)).caption();
		};

		function willAttendGame() {
		    return this.isHome() && (this.parkingSpotCaption() !== "N/A");
		};

		return TeamBiasedGameViewModel;
	}
);
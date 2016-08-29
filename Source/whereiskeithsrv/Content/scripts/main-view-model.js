define(
	[
		"underscore",
		"knockout",
        "moment",
		"data/games",
		"data/parking-spots",
		"team-biased-game-view-model",
		"display-game-data"
	],
	function(
		_,
		ko,
        moment,
		games,
		parkingSpots,
		TeamBiasedGameViewModel,
		displayGameData
	) {
	    "use strict";

		var MainViewModel = function () {
			this.games = ko.observable(games);
			this.parkingSpots = ko.observable(parkingSpots);

			this.gameViewModels = ko.computed(createGameViewModels, this);

			this.selectedGame = ko.observable();
			this.selectedGameId = ko.computed(getSelectedGameId, this);

			this.selectedGame.subscribe(function (selectedGame) {
				displayGameData(selectedGame.id.peek());
			}, this);

			var nextAttendedGame = this.findNextAttendedGame(this.gameViewModels.peek());

			this.selectGameParkingSpot(nextAttendedGame);
		};

		MainViewModel.prototype.findNextAttendedGame = function(gameViewModels) {
		    var sortedGameViewModels = _.sortBy(gameViewModels, function(gameViewModel) {
		        return gameViewModel.dateTime.peek();
		    });

		    var now = moment();

			var nextAttendedGameViewModel = _.find(sortedGameViewModels, function (gameViewModel) {
			    return gameViewModel.willAttendGame.peek() && now.isBefore(gameViewModel.dateTime.peek());
			});

			return nextAttendedGameViewModel;
		};

		MainViewModel.prototype.selectGameParkingSpot = function(gameViewModel) {
			this.selectedGame(gameViewModel);
		};

        function createGameViewModels() {
            return _.map(this.games(), function(game) { return new TeamBiasedGameViewModel("Ohio State", game); });
        }

        function getSelectedGameId() {
            var selectedGame = this.selectedGame();

            if (selectedGame) {
                return selectedGame.id();
            } else {
                return null;
            }
        }

		return MainViewModel;
	}
);
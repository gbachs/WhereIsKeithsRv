define(
	[
		"underscore",
		"jquery",
		"data/game-parking-spot-map",
		"data/games",
		"data/parking-spots",
		"data/parking-spot-image-positions"
	],
	function(
		_,
		$,
		gameParkingSpotMap,
		games,
		parkingSpots,
		parkingSpotImagePositions
	) {
	    "use strict";

		function displayGameData(gameId) {
			$(".pin").remove();

			var parkingSpotId = gameParkingSpotMap[gameId];

			if (parkingSpotId) {
				markParkingSpot(gameId, parkingSpotId);
			}
		}

		function markParkingSpot(gameId, parkingSpotId) {
			var byGameId = function (x) {
				return x.id == gameId;
			};

			var game = _.find(games, byGameId);

			var byParkingSpotId = function (x) {
				return x.id == parkingSpotId;
			};

			var parkingSpot = _.find(parkingSpots, byParkingSpotId);

			var byDatumParkingSpotId = function (parkingSpotImageDatum) {
				return parkingSpotImageDatum.parkingSpotId == parkingSpotId;
			};

			var parkingSpotImagePosition = _.find(parkingSpotImagePositions, byDatumParkingSpotId);

			markLocation(game, parkingSpot, parkingSpotImagePosition);
		}

		function markLocation(game, parkingSpot, parkingSpotImagePosition) {
			var $mapContainer = $("#parking-spot-map-container");
			var $pin = createPin(game, parkingSpot, parkingSpotImagePosition);

			$mapContainer.append($pin);
		}

		function createPin(game, parkingSpot, parkingSpotImagePosition) {
			var onClick = function () {
				var message =
					"Opponent: " + game.opponentName + "\r\n" +
					"Date/time: " + game.dateTime + "\r\n" +
					"Lot: " + parkingSpot.lot + "\r\n" +
					"Spot: " + parkingSpot.id;

				alert(message);
			};

			var $pin =
				$("<span></span>")
					.addClass("pin")
					.addClass("spot")
					.css("left", parkingSpotImagePosition.x)
					.css("top", parkingSpotImagePosition.y)
					.click(onClick)
					// .attr("data-parking-spot-id", parkingSpot.id)
					.attr("data-parking-spot-lot", parkingSpot.lot)
					.attr("data-parking-spot-position", parkingSpot.position)
					// .attr("data-game-id", game.id)
					// .attr("data-game-opponent-name", game.opponentName)
			;

			return $pin;
		}

		return displayGameData;
	}
);
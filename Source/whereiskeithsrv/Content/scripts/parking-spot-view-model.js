define(
	[
        "underscore",
		"knockout",
		"data/parking-lots"
	],
	function(
        _,
		ko,
		parkingLots
	) {
	    "use strict";

		var ParkingSpotViewModel = function(parkingSpot) {
	        var byParkingLotId = function(x) {
	            return x.id == parkingSpot.lot;
	        };

	        var parkingLot = _.find(parkingLots, byParkingLotId);

	        this.id = ko.observable(parkingSpot.id);
	        this.lotName = ko.observable(parkingLot.name);

	        this.caption = ko.computed(getCaption, this);
	    };

        function getCaption() {
            return this.id() + " (" + this.lotName() + ")";
        }

		return ParkingSpotViewModel;
	}
);
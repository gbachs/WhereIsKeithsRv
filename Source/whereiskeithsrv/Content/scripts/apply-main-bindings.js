define(
	[
		"knockout",
		"jquery",
        "main-view-model"
	],
	function(
        ko,
		$,
		MainViewModel
	) {
	    "use strict";

		var applyMainBindings = function() {
	        $(function()
	        {
	            var mainViewModel = new MainViewModel();

	            ko.applyBindings(mainViewModel, document.body);

	            //navigator.geolocation.getCurrentPosition(function(position) {
	            //	alert(position.coords.latitude + " " + position.coords.longitude);
	            //});
	        });
        };

	    return applyMainBindings;
	}
);
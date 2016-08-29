var config = {
    baseUrl: "../Content/scripts",

    mainConfigFile: "../Content/scripts/app.js",

    name: "app",

    out: "../Content/scripts/app.min.js",

    removeCombined: true
};

var onSuccess = function() {
    console.log("r.js optimize succeeded");
};

var onFailure = function(error)
{
    console.log("r.js optimize failed");
    console.error(error);
    process.exit(1);
};

var requirejs = require("../lib/r-2.1.14.js"); // Relative to the location of this file

requirejs.optimize(config, onSuccess, onFailure);
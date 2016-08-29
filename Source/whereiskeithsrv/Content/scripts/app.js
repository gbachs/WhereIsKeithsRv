requirejs.config({
    baseUrl: "Content/scripts",

    //To get timely, correct error triggers in IE, force a define/shim exports check.
    //enforceDefine: true,
    enforceDefine: false,

    paths: {
        jquery: "lib/jquery-2.1.1.min",         // [ "//code.jquery.com/jquery-2.1.1.min", "libs/jquery-2.1.1.min" ]
        knockout: "lib/knockout-3.1.0.min",     // [ "//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min", "libs/knockout-3.1.0.min" ]
        moment: "lib/moment-2.7.0.min",         // [ "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min", "libs/moment-2.7.0.min" ]
        underscore: "lib/underscore-1.6.0.min"  // [ "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min", "libs/underscore-1.6.0.min" ]
    }
});

var onAppStart = function(applyMainBindings) {
    applyMainBindings();
};

requirejs(["apply-main-bindings"], onAppStart);
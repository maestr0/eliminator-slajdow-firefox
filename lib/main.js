var Widget = require("widget").Widget;
const pageMod = require("page-mod");
const data = require("self").data;
var tabs = require('tabs');
var self = require("self");
var st = require("simple-storage");
var prefs = require("simple-prefs").prefs;

exports.main = function (options, callbacks) {
    pageMod.PageMod({
        attachTo: ["top"],
        include: "*",
        contentScriptWhen: "end",
        contentScriptFile: [data.url("jquery-2.0.3.js"), data.url("jquery-ui-1.10.3.widget-factory.js"), data.url("eliminator-slajdow.jquery.widget.js"), data.url("contentscript.js")],
        onAttach: function (worker) {
            worker.postMessage({storage: prefs,
                cssUrl: data.url("eliminatorSlajdow.css"),
                spinnerImgUrl: data.url("ajax-loader.gif"),
                esLogoUrl: data.url("icon_16.png"),
                facebookIconUrl: data.url("icon_facebook.gif")});
        }
    });
};
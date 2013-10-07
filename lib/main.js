var widgets = require("widget");
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

var settingsPanel = require("sdk/panel").Panel({
    width: 400,
    height: 300,
    contentURL: data.url("panel.html")
});

var widget = widgets.Widget({
    id: "es-link",
    label: "Eliminator Slajdów",
    contentURL: self.data.url("icon_48.png"),
    panel: settingsPanel
});

widget.port.on("left-click", function () {
    console.log("left-click");
});

widget.port.on("right-click", function () {
    console.log("right-click");
});

function onPrefChange(prefName) {
    console.log("The " + prefName + " preference changed.");
}

// `""` listens to all changes in the extension's branch
require("sdk/simple-prefs").on("", onPrefChange);
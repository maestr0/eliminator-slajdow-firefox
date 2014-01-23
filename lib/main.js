var widgets = require("sdk/widget");
const pageMod = require("sdk/page-mod");
const data = require("sdk/self").data;
var tabs = require('sdk/tabs');
var self = require("sdk/self");
var st = require("sdk/simple-storage");
var prefs = require("sdk/simple-prefs").prefs;

var widget;
var iconStatus = prefs["showIcon"];

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

function buildWidget() {
    if (!prefs["showIcon"]) return;
    var settingsPanel = require("sdk/panel").Panel({
        width: 400,
        height: 300,
        contentURL: data.url("panel.html")
    });

    widget = widgets.Widget({
        id: "es-link",
        label: "Eliminator Slajdów",
        contentURL: self.data.url("icon_48_off.png"),
        panel: settingsPanel
    });
    iconStatus = true;
}


function onPrefChange(prefName) {
    if (prefName === "showIcon") {
        if (prefs[prefName]) {
            buildWidget();
        } else {
            widget.destroy();
            iconStatus = false;
        }
    }
}

function updateWidgetState(tab) {
    if (!prefs["showIcon"]) return;
    if (!iconStatus) {
        buildWidget();
    }
    var view = widget.getView(tab.window);
    if (!view) return;
    // Update widget displayed text:
    for (var url in prefs) {
        if (tab.url.indexOf(url) != -1) {
            if (prefs[url]) {
                view.contentURL = data.url("icon_48.png");
            } else {
                view.contentURL = data.url("icon_48_off.png");
            }
            return;
        }
    }
    widget.destroy();
    iconStatus = false;
}

tabs.on('ready', updateWidgetState);
tabs.on('activate', updateWidgetState);
require("sdk/simple-prefs").on("", onPrefChange);

buildWidget();

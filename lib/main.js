var Widget = require("widget").Widget;
const pageMod = require("page-mod");
const data = require("self").data;
var tabs = require('tabs');
var self = require("self");
var st = require("simple-storage");
var prefs = require("simple-prefs").prefs;

exports.main = function(options, callbacks)
{
    pageMod.PageMod({
        attachTo: ["top"],
        include: "*",
        contentScriptWhen: "end",
        contentScriptFile: [data.url("jquery-1.8.3.js"),data.url("contentscript.js")],
        onAttach: function(worker) {
            worker.postMessage({storage: prefs, 
                                cssUrl: data.url("eliminatorSlajdow.css"), 
                                spinnerImgUrl: data.url("ajax-loader.gif"), 
                                facebookIconUrl: data.url("icon_facebook.gif")});
        }        
    });
};
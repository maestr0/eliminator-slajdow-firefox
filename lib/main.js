var Widget = require("widget").Widget;
const pageMod = require("page-mod");
const data = require("self").data;
var tabs = require('tabs');
var self = require("self");
var st = require("simple-storage");
var prefs = require("simple-prefs").prefs;

exports.main = function(options, callbacks) {
	pageMod.PageMod({
		attachTo: ["top"],
		include: "*",
		contentScriptWhen: "ready",
		contentScriptFile: [data.url("jquery-1.8.3.js"), data.url("contentscript.js")],
		onAttach: function(worker) {
			worker.postMessage(prefs);
		}
	});
};

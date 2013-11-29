var issues = require("page-mod");
var self = require("self");
var tabs = require("tabs");	

tabs.on('ready', function(tab) {
	tab.attach({
	  	// contentStyleFile: require("self").data.url("style.css"),
	  	contentScriptFile: [
	  		self.data.url("jquery-1.8.2.min.js"), 
			self.data.url("script.js"),
			self.data.url("singleTicket.js"),
			self.data.url("multipleTickets.js")],
		contentScriptWhen: "ready"
	});
});
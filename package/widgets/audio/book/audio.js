/*

Asimov Widget Framework for Books
MIT License
http://asimov.chaucercloud.com
http://www.metrodigi.com

*/
var epubWidget= epubWidget || {};
epubWidget.Audio = new Class({
	Extends: epubWidget.AbstractWidget,
	
	options: {
		autoPlay: false,
		controlsVisible: true,
		width: '250px',
		loop: false
	},
	initialize: function(containerEl, url, options){
		if(!containerEl) {
			throw("Container Element needs to be specified.")
		}
		if(!url) {
			throw("URL(s) needs to be specified.")
		}

		this.parent("audio", containerEl, options);
		this.url = url;
		this._buildDOM(containerEl);
	},
	_buildDOM: function(containerEl){
		var audioOptions = {};
		if(this.options.autoPlay) {
			audioOptions.autoplay = "autoplay";
		}
		if(this.options.controlsVisible) {
			audioOptions.controls = "controls";
		}
		if(this.options.loop) {
			audioOptions.loop = true;
		}
		audioOptions.styles = {"width": this.options.width};
		var audioEl = new Element('audio', audioOptions);

		var sources = typeOf(this.url)=='array'?this.url:[this.url];
		sources.each(function(source){
			audioEl.adopt(new Element('source', {src: source}));
		}.bind(this));

		containerEl.adopt(audioEl);
	}
});
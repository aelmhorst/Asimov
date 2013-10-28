var asimov= asimov || {};
asimov.Audio = new Class({
	Implements:[Options],
	
	options: {
		autoPlay: true,
		controlsVisible: true,
		width: '250px'
	},
	initialize: function(containerEl, url, options){
		if(!containerEl) {
			throw("Container Element needs to be specified.")
		}
		if(!url) {
			throw("URL(s) needs to be specified.")
		}
		this.url = url;
		this.setOptions(options);
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
		audioOptions.style = "width: " + this.options.width;
		this.el = new Element('audio', audioOptions);

		var sources = typeOf(this.url)=='array'?this.url:[this.url];
		sources.each(function(source){
			this.el.adopt(new Element('source', {src: source}));
		});

		containerEl.adopt(el);
	}
}
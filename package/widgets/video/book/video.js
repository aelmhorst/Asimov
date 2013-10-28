var asimov= asimov || {};
asimov.Video = new Class({
	Implements:[Options],
	
	options: {
		autoPlay: true,
		controlsVisible: true,
		width: '400px',
		height: '250px',
		posterImageUrl: null,
		altText: null
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
		var videoOptions = {};
		if(this.options.autoPlay) {
			videoOptions.autoplay = "autoplay";
		}
		if(this.options.controlsVisible) {
			videoOptions.controls = "controls";
		}
		if(this.options.loop) {
			videoOptions.loop = true;
		}
		if(this.options.altText) {
			videoOptions.alt = this.options.altText;
		}
		videoOptions.styles = {
			"width": this.options.width,
			"height": this.options.height
		};
		this.el = new Element('video', videoOptions);

		var sources = typeOf(this.url)=='array'?this.url:[this.url];
		sources.each(function(source){
			this.el.adopt(new Element('source', {src: source}));
		}.bind(this));

		containerEl.adopt(this.el);
	}
});
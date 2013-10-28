(function(){
	var MODEL = {
		'audio': {
			jsString: "new asimov.Audio($('sample'), 'http://googo.com/sample.mp3', {});"
		},
		'video': {
			jsString: "new asimov.Video($('sample'), 'http://googo.com/sample.mp4', {});"
		}
	};

	document.addEvent('domready' ,function(){
		var CodeView = new Class({
			Implements: [Events],
			initialize: function(el) {
				this.el = el;
				this.el.getElement('button.preview').addEvent('click', function(){
					if(!this.widgetKey) {
						return;
					}

					this.fireEvent("previewClicked", this.widgetKey);
				}.bind(this))
			},
			setView: function(widgetKey){
				this.widgetKey = widgetKey;
				this.el.getElement('#code').set('html', MODEL[widgetKey].jsString);
			}
		});
		var PreviewView = new Class({
			initialize: function(el){
				this.el = el;
			},
			preview: function(widgetKey) {
				var widget = MODEL[widgetKey];
				this.el.empty();
				this.el.adopt(new Element('div', {id: 'sample', 'class': 'widget-space'}));
				window.eval(widget.jsString);
			}
		})

		var WidgetList = new Class({
			Implements: [Events],
			initialize: function(el, model) {
				this.el = el;
				this.model = model;
				this.render();
			},
			render: function(){
				this.el.empty();
				var widgetListEl = new Element('ul');
				Object.keys(this.model).each(function(widgetName){
					widgetListEl.adopt(this.createEntry(widgetName));
				}.bind(this));
				this.el.adopt(widgetListEl);
				this.el.getElements('li').addEvent("click", function(e){
					this.fireEvent('widgetSelected', e.target.get('html'));
				}.bind(this))
			},
			createEntry: function(widgetName){
				var entryEl = new Element('li', {html: widgetName, 'class': 'widget-entry'});
				return entryEl;
			}
		});


		var codeView = new CodeView($("code-view"));
		var previewView = new PreviewView($("preview-view"));
		var widgetList = new WidgetList($('widget-list'), MODEL);
		widgetList.addEvent('widgetSelected', function(widgetKey) {
			codeView.setView(widgetKey);
			previewView.preview(widgetKey);
		});

		codeView.addEvent('previewClicked', function(widgetKey) {
			previewView.preview(widgetKey);
		});
	})

})()
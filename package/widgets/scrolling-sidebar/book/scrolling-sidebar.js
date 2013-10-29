/*

Asimov Widget Framework for Books
MIT License
http://asimov.chaucercloud.com
http://www.metrodigi.com

*/
var asimov= asimov || {};
asimov.ScrollingSidebar = new Class({
	Extends: asimov.AbstractWidget,
	options: {
		header: null,
		footer: null,
		content: null,
		width: null
	},
	
	//"new md.widgets.ShareWidget($('51240a0c0e50b'), 'http://www.metrodigi.com', { services: ["facebook","google","twitter"] })"
	initialize: function(ele, options){
		this.parent("scrolling-sidebar", ele, options);
		ele.empty();
		
		var clsAppend = (this.options.header?'sb-header':'') + (this.options.footer?' sb-footer':'')
		this.tbl = new Element('table', {
			cellpadding:0, 
			cellspacing:0,
			'class':'sidebar-widget ' + clsAppend
		});
		var tbody = new Element('tbody').inject(this.tbl);
		
		//add header
		if(this.options.header && this.options.header.length>0) {
			tbody.adopt(this.addTr(this.options.header, 'header', 'sb-gradient', 'h5'));
		}
		
		//add content
		tbody.adopt(this.addTr(this.options.content, 'content', ''));

		//add footer
		if(this.options.footer && this.options.footer.length>0) {
			tbody.adopt(this.addTr(this.options.footer, 'footer', 'sb-gradient', 'small'));
		}

		// Set the height of the container
		this.el.style.height = this.options.height + 'px';
		
		this.el.adopt(this.tbl);
	},
	addTr: function(data, type, cls, innerElementType){
		innerElementType = innerElementType || 'div';
		var tr = new Element('tr');
		var td = new Element('td', {'class': 'sidebar-'+type}).inject(tr);
		var div = new Element(innerElementType, {
			'class': 'sb-inner ' + cls,
			'html': data
		});
		if(this.options.width) {
			//NOTE: 22 is for PADDING, should be changed to proper value with CSS.
			div.setStyle('width', (this.options.width-22) + 'px');
		}
		td.adopt(div);
		return tr;
	}
});
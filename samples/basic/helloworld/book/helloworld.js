/*

Asimov Widget Framework for Books
MIT License
http://asimov.chaucercloud.com
http://www.metrodigi.com

*/
HelloWorld = function(elementId, data) {
	var el = document.getElementById(elementId);
	el.className = el.className + " superwidget";
	if(el) {
		el.innerHTML = data.text;
	}
}
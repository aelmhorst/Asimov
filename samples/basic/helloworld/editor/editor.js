(function(){
	EPUB_WIDGET_META = {
		id: 'dummy',
		save: function(params, jsString) {
			console.log("Save: ", params, jsString);
		}, 
		cancel: function(){
			console.log("Cancelled");
		}
	}
	var getSerializedParams = function(){
		return [
			EPUB_WIDGET_META.id,
			JSON.stringify({'text': document.getElementById('hellotext').value})
		]
	}

	var makeJSString = function(){
		var params = getSerializedParams();
		var paramsStr = params.join(',');
		return 'new HelloWorld(' + paramsStr + ')';
	}

    document.getElementById('saveButton').addEventListener('click', function(){
    	var options = {
    		size: {width: 200, height: 100}
    	};
    	EPUB_WIDGET_META.save(getSerializedParams(), makeJSString(), options);
    }, true);

    document.getElementById('cancelButton').addEventListener('click', function(){
    	EPUB_WIDGET_META.cancel();
    }, true);

})();
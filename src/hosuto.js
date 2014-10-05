var Hosuto = function (index) {
	var imgSrc = Hosuto.IMAGE_PREFIX + index + "." + Hosuto.IMAGE_EXT;
	var img = document.createElement("IMG");
	img.src = chrome.extension.getURL(imgSrc);
	
	this.div = document.createElement("DIV");
	this.div.style.position = "absolute";
	this.div.style.top = document.body.scrollTop + "px";
	this.div.style.zIndex = 9999;
	this.div.appendChild(img);
	this.div.className = "hosuto_container";
	
	var slider = document.createElement("INPUT");
	slider.type = "range";
	slider.min = Hosuto.MIN_SIZE;
	slider.max = Hosuto.MAX_SIZE;
	slider.value = Hosuto.DEFAULT_SIZE;

	slider.addEventListener("input", Hosuto.getOnChangeHandler(slider, this.div) , false);
	
	this.div.appendChild(slider);
	slider.max = 1800;
	new Draggable(this.div, {});
};

Hosuto.getOnChangeHandler = function (slider, container) {
	return function () {
		container.style.width = slider.value + "px";
	}
	
}

Hosuto.DEFAULT_SIZE = 600;
Hosuto.MAX_SIZE = 2400;
Hosuto.MIN_SIZE = 240;
Hosuto.IMAGE_PREFIX = "img/hosuto";
Hosuto.IMAGE_EXT = "png";

Hosuto.prototype.add = function (target) {
	target.appendChild(this.div);
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var hosutoIndex = request.hosutoIndex;
	if (!Hosuto.cssDone) {
		Hosuto.cssDone = true;
		var css = document.createElement("link");
		css.setAttribute("rel", "stylesheet");
		css.setAttribute("type", "text/css");
		css.setAttribute("href", chrome.extension.getURL("css/hosuto.css"));
		document.getElementsByTagName("HEAD")[0].appendChild(css);
	}
	window.setTimeout();
	new Hosuto(hosutoIndex).add(document.body);
});
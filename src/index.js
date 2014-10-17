var HOSUTO_COUNT = 3;
var flip = false;

function getHosutoHandler(index) {
	return function () {
		chrome.tabs.query({
			active : true,
			currentWindow : true
		}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				hosutoIndex : index,
				flip: flip
			}, function(response) {
			});
		});
	}
}
function flipImages () {
	flip = document.getElementById("checkboxFlip").checked;
	console.log("flipImages " + flip)
	for (var i=0; i<HOSUTO_COUNT; i++) {
		var button = document.getElementById('hosutoButton'+i);
		button.style.WebkitTransform = (flip)?"scaleX(-1)":"";
	}	
}


for (var i=0; i<HOSUTO_COUNT; i++) {
	var button = document.getElementById('hosutoButton'+i);
	button.addEventListener('click', getHosutoHandler(i));
}
document.getElementById("labelFlip").innerHTML = chrome.i18n.getMessage("flipHorizontally");
document.getElementById("checkboxFlip").addEventListener("change", flipImages);
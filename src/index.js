var HOSUTO_COUNT = 3;

function getHosutoHandler(index) {
	return function () {
		chrome.tabs.query({
			active : true,
			currentWindow : true
		}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				hosutoIndex : index
			}, function(response) {
			});
		});
	}
}

for (var i=0; i<HOSUTO_COUNT; i++) {
	var button = document.getElementById('hosutoButton'+i);
	button.addEventListener('click', getHosutoHandler(i));
}

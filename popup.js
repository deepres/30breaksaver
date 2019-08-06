var badgins = [];

document.addEventListener('DOMContentLoaded', function () {

	var checkPageButton = document.getElementById('checkPage');
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function (tabs) {

		chrome.tabs.executeScript({
			code: 'document.querySelector("iframe").contentWindow.document.querySelector(\'body\').innerHTML'
		}, display_h1);
	});
}, false);

function display_h1(results) {


	if (results == null || results == '') {
		return;
	}

	var tempDiv = document.createElement("DIV");
	tempDiv.innerHTML = results;
	var divs = tempDiv.querySelectorAll("div[id^='buch']")
	
	divs.forEach(convert_badgin);

	var fbadgins = badgins.sort(function(a, b){return a-b}).filter(function(a){ return a > 0;})

	var eight_min = 8 * 60 + 24 + 30;
	var eight_max = 8 * 60 + 59 + 30;

	var start_minutes = fbadgins[0];

	var end_min_minutes = start_minutes + eight_min;
	var end_max_minutes = start_minutes + eight_max;

	var displ_min_time = Math.floor(end_min_minutes / 60) + ':' + end_min_minutes % 60;
	var displ_max_time = Math.floor(end_max_minutes / 60) + ':' + end_max_minutes % 60;


	d = document;

	var f = d.createElement('div');
	f.innerHTML = "Earliest dep time = " + displ_min_time;
	f.innerHTML += "<br>Latest dep time = " + displ_max_time;

	d.body.appendChild(f);
}

function convert_badgin(element) {

	var result = 0;
	if (element.innerHTML.trim() == "") {

		result = -1;

	} else {

		var start_time = '' + element.innerHTML;
		var hh, mm;
		var eight_min = 8 * 60 + 40 + 30;
		var eight_max = 8 * 60 + 59 + 30;
	
	
		hh = start_time.substring(0, 2);
		mm = start_time.substring(3, 5);
	
		result = parseInt(hh) * 60 + parseInt(mm);
	}

	badgins.push(result);

}
var badgins = [];

document.addEventListener('DOMContentLoaded', function () {


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

	var today = new Date();
	var curr_minutes = today.getHours() * 60 + today.getMinutes(); 
	var eight_min = 8 * 60 + 24 + 30;
	var eight_max = 8 * 60 + 59 + 30;

	var start_minutes = fbadgins[0];

	var elaps_minutes = curr_minutes - start_minutes;
	var remain_minutes = eight_min - elaps_minutes;
	var end_min_minutes = start_minutes + eight_min;
	var end_max_minutes = start_minutes + eight_max;

	var displ_elaps_time = (Math.floor(elaps_minutes / 60)).toString().padStart(2, '0') + ':' + (elaps_minutes % 60).toString().padStart(2, '0');
	var displ_remain_time = (Math.floor(remain_minutes / 60)).toString().padStart(2, '0') + ':' + (remain_minutes % 60).toString().padStart(2, '0');
	var displ_min_time = (Math.floor(end_min_minutes / 60)).toString().padStart(2, '0') + ':' + (end_min_minutes % 60).toString().padStart(2, '0');
	var displ_max_time = (Math.floor(end_max_minutes / 60)).toString().padStart(2, '0') + ':' + (end_max_minutes % 60).toString().padStart(2, '0');


	d = document;

	var f = d.createElement('div');
	f.innerHTML = "Curr work time = " + displ_elaps_time;
	f.innerHTML += "<br>Remain work time (+30) = " + displ_remain_time;
	f.innerHTML += "<br>Earliest dep time = " + displ_min_time;
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


document.body.onload = function() {
	
	//get checkbox
	var checkbox = document.getElementById("enableSort");
	
	//load stored data that holds the value of the state of the checkbox
	chrome.storage.sync.get({enablePopularitySortEbay : true}, function(items) {	
		checkbox.checked = items.enablePopularitySortEbay;			
	});
	  
	//when checkbox is modified, modify stored data
	checkbox.addEventListener("click", function(){
		chrome.storage.sync.set({ "enablePopularitySortEbay" : checkbox.checked }, function() {
		
		});
	});

	


	
}
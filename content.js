


setTimeout(function(){
    replaceListItems();
}, 100);


function replaceListItems(){
	var lists = document.getElementsByTagName('ul');
	var list;
	for(var i = 0; i < lists.length; i++) {
		
		if(lists[i].className === "gv-ic full-width left"){
			list = lists[i];
			//alert("megvan");
		}
	   
	}

	var searchValue = "Sold";
	var listItems = [];
	for(var i = 0; i < list.childNodes.length; i++) {
		console.log(list.childNodes[i].nodeName);
		if(list.childNodes[i].nodeName == "LI"){
			//alert(inputs[i].id + " "+inputs[0].id);
			listItems.push(list.childNodes[i]);
		}
	   
	}


	for(var i = 0; i < listItems.length; i++) {
		
		if(listItems[i].innerHTML.indexOf(searchValue) > -1){
			
			listItems[i].childNodes.forEach(function(value){
			  if(value.nodeType === Node.TEXT_NODE) { 
				if(value.nodeValue.trim().indexOf(searchValue) > -1){
				  console.log("Current textNode value is : ", value.nodeValue.trim())
				}
			  }
			});	
			//alert(inputs[i].id + " "+inputs[0].id);
			list.insertBefore(listItems[i], listItems[0]);
		}
	   
	}
}
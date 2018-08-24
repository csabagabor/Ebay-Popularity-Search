


setTimeout(function(){
    replaceListItems();
}, 100);


function replaceListItems(){
	var lists = document.getElementsByTagName('ul');
	var list;
	for(var i = 0; i < lists.length; i++) {
		
		if(lists[i].className === "srp-results srp-grid clearfix"){
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
			var children = listItems[i].children;
			for(var i=0;i<children.length;i++){
				//exclude descendants
				if(children[i].innerText.indexOf(searchValue)>-1){
					
					//alert(children[i].innerText);
				}
			}
			//alert(inputs[i].id + " "+inputs[0].id);
			list.insertBefore(listItems[i], listItems[0]);
		}
	   
	}
}
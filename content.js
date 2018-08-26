


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
    var currItem = listItems[i];
    var descendants = getDescendants(currItem);
    	for(var j = 0; j < descendants.length; j++) {
        if(descendants[j].nodeType == 3){
          if(descendants[j].nodeValue.indexOf(searchValue) > -1){
              alert(descendants[j].nodeValue.trim());
          }
        }
      }


			list.insertBefore(currItem, listItems[0]);
		}

	}


  function getDescendants(node, accum) {
      var i;
      accum = accum || [];
      for (i = 0; i < node.childNodes.length; i++) {
          accum.push(node.childNodes[i])
          getDescendants(node.childNodes[i], accum);
      }
      return accum;
  }

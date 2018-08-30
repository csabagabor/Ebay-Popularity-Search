
if ((window.location.host.startsWith('www.ebay') || window.location.host.startsWith('www.benl.ebay'))  && window.location.pathname.startsWith('/sch/')) {
document.body.onload = function() {
	
	var enableSorting = true;
	chrome.storage.sync.get("enablePopularitySortEbay", function(items) {	
		enableSorting = items.enablePopularitySortEbay;
	});
	
	setTimeout(function() {
	if(enableSorting)
		replaceListItems();
	}, 10);


	function replaceListItems() {
	  var list = findUlItem();
	  if (list != -1) {
		var listItems = searchChildrenListItems(list);
		var hiddenLi = createDummyListItem(list, listItems);
		var sortedLists = getListWithSoldNumbers(listItems);
		var listSortedItems = sortedLists[0];
		var listSortedItemsOnSale = sortedLists[1];
		var listSortedItemsWatching = sortedLists[2];
		sortListItems(listSortedItems);
		sortListItems(listSortedItemsOnSale);
		sortListItems(listSortedItemsWatching);
		insertSoldItemsInFront(list, listSortedItems, hiddenLi);
		insertSoldItemsInFront(list, listSortedItemsWatching, hiddenLi);
		insertSoldItemsInFront(list, listSortedItemsOnSale, hiddenLi);				
	  }
	}


	function insertSoldItemsInFront(list, listSortedItems, hiddenLi) {
	  for (var j = 0; j < listSortedItems.length; j++) {
		// if listItems[0] is inserted before itself, problems occur
		//that's why we are using a dummy element(hiddenLi) for first element
		list.insertBefore(listSortedItems[j].listItem, hiddenLi);
	  }
	}


	function sortListItems(listSortedItems) {
	  listSortedItems.sort(function(a, b) { //descending order
		return b.soldNumber - a.soldNumber;
	  })
	}

	function getSoldNumberFromText(string) {
	  var text = string.trim();
	  var soldNr = text.match(/\d+/);
	  return soldNr;
	}


	function addItemToSortedItems(listSortedItems, currItem, soldNr) {
	  var listItemWithSoldNumber = {
		listItem: currItem,
		soldNumber: soldNr
	  }
	  listSortedItems.push(listItemWithSoldNumber);
	}
	

	function getListWithSoldNumbers(listItems) {
	  var listSortedItems = [];
	  var listSortedItemsOnSale = [];
	  var listSortedItemsWatching = [];
	  for (var i = 0; i < listItems.length; i++) {
		var currItem = listItems[i];
		var descendants = getElementDescendants(currItem);
		for (var j = 0; j < descendants.length; j++) {
		  if ((descendants[j].className == "hotness-signal red") || (descendants[j].classList.contains("s-item__hotness"))) {
			var text = descendants[j].innerText;
			//do not count product on sale
			var soldNr = getSoldNumberFromText(text);
			if(text.indexOf("%") > -1){
				addItemToSortedItems(listSortedItemsOnSale, currItem, soldNr);
				break;	
			}		
			else if(text.indexOf("Watching") > -1){	
				addItemToSortedItems(listSortedItemsWatching, currItem, soldNr);
				break;
			}
			else{//SOLD				
				addItemToSortedItems(listSortedItems, currItem, soldNr);
				break;
			}
		  }
		}
	  }
	  return [listSortedItems,listSortedItemsOnSale,listSortedItemsWatching];
	}


	function findUlItem() {
	  var correctList = -1;
	  
	  var descendants = document.getElementsByTagName("UL");
	  for (var j = 0; j < descendants.length; j++) {
		if (descendants[j].tagName == "UL") {
		  let list = descendants[j];
		  if (ulElemIsGood(list)){
			correctList = list;
			break;
		  }
		}
	  }
	  return correctList;
	}



	function ulElemIsGood(list) {
	  //check if 'list' is the correct UL item beacuse there can be more
	  //first check the number of its descendant li items ->> minimum of 20
	  var nrLi = 0; //number of li descendants
	  var nrImg = 0;
	  var nrLink = 0;
	  var descendants = getElementDescendants(list);
	  for (var j = 0; j < descendants.length; j++) {
		if (descendants[j].tagName == "LI")
		  nrLi++;
		else if (descendants[j].tagName == "IMG")
		  nrImg++;
		else if (descendants[j].tagName == "A")
		  nrLink++;
	  }
	  if (nrLi < 20 || nrImg < 20 || nrLink < 20)
		return false;

	  return true;
	}

	function searchChildrenListItems(ulItem) {
	  var listItems = [];
	  for (var i = 0; i < ulItem.childNodes.length; i++) {
		console.log(ulItem.childNodes[i].nodeName);
		if (ulItem.childNodes[i].nodeName == "LI") {
		  listItems.push(ulItem.childNodes[i]);
		}
	  }
	  return listItems;
	}


	function createDummyListItem(ulItem, listItems) {
	  var hiddenLi = document.createElement("LI");
	  hiddenLi.style.display = "none";
	  ulItem.insertBefore(hiddenLi, listItems[0]);
	  return hiddenLi;
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

	function getElementDescendants(node, accum) {
	  var i;
	  accum = accum || [];
	  for (i = 0; i < node.children.length; i++) {
		accum.push(node.children[i])
		getElementDescendants(node.children[i], accum);
	  }
	  return accum;
	}
}
}
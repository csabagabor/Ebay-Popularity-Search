setTimeout(function() {
  replaceListItems();
}, 100);

var searchValue = "Sold";




function replaceListItems() {
  var list = findUlItem();
  var listItems = searchChildrenListItems(list);
  var hiddenLi = createDummyListItem(list, listItems);
  var listSortedItems = getListWithSoldNumbers(listItems);
  sortListItems(listSortedItems);
  insertSoldItemsInFront(list, listSortedItems, hiddenLi);
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


function getSoldNumberFromText(node) {
  var text = node.nodeValue.trim();
  var soldNr;
  if (text.indexOf("+") > -1) { //eg "37+ Sold"
    soldNr = text.substring(0, text.indexOf(searchValue) - 2);
  } else soldNr = text.substring(0, text.indexOf(searchValue) - 1);
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
  for (var i = 0; i < listItems.length; i++) {
    var currItem = listItems[i];
    var descendants = getDescendants(currItem);
    for (var j = 0; j < descendants.length; j++) {
      if (descendants[j].nodeType == 3) {
        if (descendants[j].nodeValue.indexOf(searchValue) > -1) {
          var soldNr = getSoldNumberFromText(descendants[j]);
          addItemToSortedItems(listSortedItems, currItem, soldNr);
        }
      }
    }
  }
  return listSortedItems;
}


function findUlItem() {
  var lists = document.getElementsByTagName('ul');
  var list;
  for (var i = 0; i < lists.length; i++) {
    if (lists[i].className === "gv-ic full-width left") {
      list = lists[i];
    }
  }
  return list;
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

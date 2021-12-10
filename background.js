var contextMenus ={};

function getword(info,tab) {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.tabs.create({  
      url: "http://www.google.com/search?q=" + info.selectionText
    });
  }
  chrome.contextMenus.create({
    title: "Call Logger", 
    contexts:["selection"], 
    onclick: getword
  });
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "selection") {
        console.log("yay!");
    }
})

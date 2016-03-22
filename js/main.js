
var onTabClick = function(element){
// 	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
// 	for(i = 0;i < tabslist.length; i++)
// 	{
// 		  tabslist[i].setAttribute("style", "background:grey;");
// 		  var innerTag=tabslist[i].getElementsByTagName("a")[0];
// 		  innerTag.setAttribute("style", "color:rgb(235, 235, 235);");
// 		  var res = innerTag.innerHTML.replace(" ", "-").replace(" ", "-");
// 	      res = res.toLowerCase();
// 	      document.getElementById(res).setAttribute("style", "display:none;");	  
// 	}	
// 	element.setAttribute("style", "background:rgb(235, 235, 235); text-decoration:black;");
// 	var innerTag=element.getElementsByTagName("a")[0];
// 	innerTag.setAttribute("style", "color:black;");
//     var res = innerTag.innerHTML.replace(" ", "-").replace(" ", "-");
//     res = res.toLowerCase();
//     document.getElementById(res).setAttribute("style", "display:block;");
// };
// var onSettingsClick=function(tab){
// 	var favouritesSelect=tab.getElementsByClassName("favourites-select")[0];
// 	// TODO fix check drop down list size check
// 	// if (favouritesSelect.getElements('option').length === 0) {
// 		// tab.getElementsByClassName("settings-btn")[0].setAttribute("style", "background:red;");
// 	// }
// 	// else{
// 		tab.getElementsByClassName("favourites")[0].setAttribute("style", "display:none;");
// 	//}	

alert("dania")


};
// var set_tab= function(clickedTab,tabId){
// {
// 	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
// 	for(i = 0;i < tabslist.length; i++)
// 	{
// 		  tabslist[i].setAttribute("style", "background:grey;");
// 		  var innerTag=tabslist[i].getElementsByTagName("a")[0];
// 		  innerTag.setAttribute("style", "color:rgb(235, 235, 235);");
// 		  var rel=innerTag.getAttribute("rel"); 
// 		  document.getElementById(res).setAttribute("style", "display:none;");	
// 	}
// 	clickedTab.setAttribute("style", "background:rgb(235, 235, 235); text-decoration:black;");
// 	var innerTag=clickedTab.getElementsByTagName("a")[0];
// 	innerTag.setAttribute("style", "color:black;");
// 	document.getElementById(tabId).setAttribute("style", "display:block;");
// };


var openTabByURL=function(){
	var url = window.location.hash;
    //  get the tab name without #
    var currentHash = url.substring(1);
    var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	for(i = 0;i < tabslist.length; i++)
	{
		if(tabslist[i].getElementsByTagName("a")[0].getAttribute("rel")===currentHash)
		{
			tabslist[i].classList.add('tab-active');
		}
		else{
			tabslist[i].classList.remove('tab-active');
		}
		document.getElementById(tabslist[i].getElementsByTagName("a")[0].getAttribute("rel")).classList.add("hidden");
	}
	document.getElementById(currentHash).classList.remove("hidden");
};


var getHash=function(clickedTab){
    if (window.location.hash) {
        //  Get the hash from URL
        var url = window.location.hash;
        //  get the tab name without #
        var currentHash = url.substring(1);
        //  activate tab		
		setTab(currentHash,clickedTab);

    }
};

var setTab=function(currentHash,clickedTab){
	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	for(i = 0;i < tabslist.length; i++)
	{
		tabslist[i].classList.remove('tab-active');
	}
	clickedTab.classList.add('tab-active');
	document.getElementById(currentHash).classList.add("hidden");
	document.getElementById(clickedTab.getElementsByTagName("a")[0].getAttribute("rel")).classList.remove("hidden");
};
var getSelectedTab=function(tabsList) {

    for (var i = 0; i < tabsList.length; i++) {
	    if(tabsList[i].getAttribute('class') == 'tab-active'){
	        return i;
	    }
    }
};
TabsKeyNavigation= function(e) {

    var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
    var selectedTabIndex =getSelectedTab(tabslist);
    switch (e.keyCode) {
        case 37:{
                if(selectedTabIndex !== 0 ){
                	window.location.hash = tabslist[parseInt(selectedTabIndex) - 1].getElementsByTagName("a")[0].getAttribute('rel');
                	openTabByURL();
                }
            break;
        }
        case 39:{
                if(selectedTabIndex !== tabslist.length - 1 ){
               	 	window.location.hash = tabslist[parseInt(selectedTabIndex) + 1].getElementsByTagName("a")[0].getAttribute('rel');
                	openTabByURL();
                }
            break;
        }
    }
};


(function(){ 
	
	// =============== Stage 2 ===============
	//trigger the relevant tab by the hash value in the URL
	// document.onkeydown = UTILS.TabsKeyNavigation;
	document.addEventListener("keydown",TabsKeyNavigation);
	openTabByURL();
	// Add event handler for tab click
	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	
	for(i = 0;i < tabslist.length; i++)
	{
		(function(index) {UTILS.addEvent(tabslist[index],"click",function(){getHash(tabslist[index]);});})(i);
	}	
	/************************************************/
	

	// =============== Stage 3 ===============
	UTILS.ajax('./data/config.json', { 
		type: 'json',
		method: 'GET',
		done: function (response) {
			var notificationsDiv = document.getElementById('notifications');
			if (!response.notification) {
				notificationsDiv.textContent = '';
				notificationsDiv.classList.add('hidden');
			}
			else {
				notificationsDiv.textContent = response.notification;
				notificationsDiv.classList.remove('hidden');
			}
		}
	});	
	// =============== Stage 4 ===============
	var settingsBtnQuickReports = document.getElementById("settings-btn-quick-reports");
	var quickReports = document.getElementById("quick-reports");
	
	UTILS.addEvent(settingsBtnQuickReports, "click", function(){onSettingsClick(quickReports);});
	
}());

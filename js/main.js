
var openTabByURL=function(){
	var url = window.location.hash;
    //  get the tab name without #
    var currentHash = url.substring(1);
	if(currentHash == ""){
		currentHash = "quick-reports";
	}
    var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	for(i = 0;i < tabslist.length; i++)
	{
		if(tabslist[i].getElementsByTagName("a")[0].getAttribute("rel")===currentHash)
		{
			tabslist[i].classList.add('tab-active');
			tabslist[i].getElementsByTagName("a")[0].classList.add('tab-active');
			document.getElementById(tabslist[i].getElementsByTagName("a")[0].getAttribute("rel")).classList.remove('hidden');
		}
		else{
			tabslist[i].classList.remove('tab-active');
			tabslist[i].getElementsByTagName("a")[0].classList.remove('tab-active');
			document.getElementById(tabslist[i].getElementsByTagName("a")[0].getAttribute("rel")).classList.add("hidden");
		}
		
	}
	document.getElementById(currentHash).classList.remove("hidden");
	var newHash = currentHash;
	LocalStorage.SaveState(newHash, undefined, undefined);
};


var getHash=function(clickedTab){
    if (window.location.hash) {
        //  Get the hash from URL
        var url = window.location.hash;
        //  get the tab name without #
        var currentHash = url.substring(1);
        //  activate tab		
		setTab(currentHash,clickedTab);
		
		var newHash = clickedTab.getElementsByTagName("a")[0].getAttribute("rel");
		LocalStorage.SaveState(newHash, undefined, undefined);
    }
};

var setTab=function(currentHash,clickedTab){
	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	for(i = 0;i < tabslist.length; i++)
	{
		tabslist[i].classList.remove('tab-active');
		tabslist[i].getElementsByTagName("a")[0].classList.remove('tab-active');;
		document.getElementById(tabslist[i].getElementsByTagName("a")[0].getAttribute("rel")).classList.add('hidden');
	}
	clickedTab.classList.add('tab-active');
	clickedTab.getElementsByTagName("a")[0].classList.add('tab-active');
	clickedTab.getElementsByTagName("a")[0].classList.add('tab-active');
	document.getElementById(clickedTab.getElementsByTagName("a")[0].getAttribute("rel")).classList.remove('hidden');
	window.location.hash=clickedTab.getElementsByTagName("a")[0].getAttribute("rel");
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
        case 13:{
                // if(selectedTabIndex==0||selectedTabIndex==2){
               	  	// submitForm(tabslist[selectedTabIndex]);
                 // }

            break;
        }
        case 27:{
                if(selectedTabIndex==0||selectedTabIndex==2){
                	 onSettingsClick(document.getElementById(tabslist[selectedTabIndex].getElementsByTagName("a")[0].getAttribute("rel")));
                	// alert(tabslist[selectedTabIndex].getElementsByTagName("a")[0].getAttribute("rel"));
                	// getElementById
                 }

            break;
        }
    }
};

var onSettingsClick=function(tab){
	if(tab.getElementsByTagName("button")[0].getAttribute('class').toString() =="settings-btn"){
		tab.getElementsByTagName("button")[0].classList.remove("settings-btn");
		tab.getElementsByTagName("button")[0].classList.add("settings-btn-grey");
		tab.getElementsByClassName("tab-hidde")[0].classList.add("hidden");
	}
	else{
		tab.getElementsByTagName("button")[0].classList.add("settings-btn");
		tab.getElementsByTagName("button")[0].classList.remove("settings-btn-grey");
		tab.getElementsByClassName("tab-hidde")[0].classList.remove("hidden");
	}
};



var submitForm=function(tab){
	var name=[];
    var url=[];
    var reports=[];
    var flag=0;
	var globalFlag = 0;
    var cnt=0;
    var select=tab.getElementsByClassName("favourites-select")[0];
    var arrowBTN=tab.getElementsByClassName("new-tab-btn")[0];
	var fieldsets=tab.getElementsByClassName("fieldset");
	select.innerHTML="";
	for(i=0;i<fieldsets.length;i++){
		flag=0;
		fieldsets[i].getElementsByClassName("url-input")[0].classList.remove("invalid");
		fieldsets[i].getElementsByClassName("text-input")[0].classList.remove("invalid")
		name[i]=fieldsets[i].getElementsByClassName("text-input")[0].value;
		url[i]=fieldsets[i].getElementsByClassName("url-input")[0].value;
		if(name[i]==""&&url[i]!==""){
			fieldsets[i].getElementsByClassName("text-input")[0].classList.add("invalid");
			flag=1;
			globalFlag = 1;
		}
		if(name[i]!==""&&url[i]==""){
			url[i]=fieldsets[i].getElementsByClassName("url-input")[0].classList.add("invalid");
			flag=1;
			globalFlag = 1;
		}
		if(name[i]==""&&url[i]==""){
			flag=1;
		}
		if (flag==0){

			 reports.push({
	                "name":name[i],
	                "url":url[i]
	        });
			// alert("dania");
			select.innerHTML=select.innerHTML+"<option>"+name[i]+"</option>";
			// select.getElementsByTagName("option")[cnt].innerHTML=name[i];
			 select.getElementsByTagName("option")[cnt].setAttribute("value", url[i]);
			cnt=cnt+1;
		}
		if(cnt>0)
		{
			select.classList.remove("hidden");
			arrowBTN.classList.remove("hidden");
		}

	}
	
	if(globalFlag == 0){
			LocalStorage.SaveState(undefined, reports, undefined);
	}

	// for(i=0;i<fieldsets.length;i++){
	// 	if(name[i]==""&&url[i]!==""){
	// 		fieldsets[i].getElementsByClassName("text-input")[0].classList.add("invalid");
	// 	}
	// 	if(name[i]!==""&&url[i]==""){
	// 		url[i]=fieldsets[i].getElementsByClassName("url-input")[0].classList.add("invalid");
	// 	}
	// }
};

var loadForm=function(tab, content){ 
	var fieldsets=tab.getElementsByClassName("fieldset");
	var select=tab.getElementsByClassName("favourites-select")[0];

	for(i=0;i<content.length;i++){
		fieldsets[i].getElementsByClassName("text-input")[0].value = content[i].name;
		fieldsets[i].getElementsByClassName("url-input")[0].value = content[i].url;
		
		select.innerHTML=select.innerHTML+"<option>"+ content[i].name +"</option>";
		select.getElementsByTagName("option")[i].setAttribute("value", content[i].url);
	}
	
	if(content.length>0)
	{
		select.classList.remove("hidden");
		arrowBTN.classList.remove("hidden");
	}
};

var searchTab=function(tab, str){
	var fieldsets=tab.getElementsByClassName("fieldset");
	var select=tab.getElementsByClassName("favourites-select")[0];

	for(i=0;i<fieldsets.length;i++){
		var name =fieldsets[i].getElementsByClassName("text-input")[0].value;
		var url =fieldsets[i].getElementsByClassName("url-input")[0].value;
		
		if(name == str){
			select.value = url;
			return true;
		}
	}
	
	return false;
}

var search=function(){ 
	var searchStr = document.getElementById("search-form").getElementsByTagName("input")[0].value;
	var quickReports = document.getElementById("quick-reports");
	var myTeamFolders = document.getElementById("quick-reports"); //TODO change to  myTeamFolders
	
	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	
	if(searchTab(quickReports, searchStr))
	{
		getHash(tabslist[0]);
	}
	else if(searchTab(myTeamFolders, searchStr)){
		getHash(tabslist[2]);
	}
	else{
		var notificationsDiv = document.getElementById('notifications');
		notificationsDiv.textContent = 'The searched report (' + searchStr + ') was not found';
		notificationsDiv.classList.remove('hidden');
	}
	
	return false;
};
















(function(){ 
	var previousHash = LocalStorage.GetLastTab();
	if(window.location.hash==""){
		window.location.hash = previousHash;
	}
	openTabByURL();	

	// =============== Stage 2 ===============
	// trigger the relevant tab by the hash value in the URL
	// document.onkeydown = UTILS.TabsKeyNavigation;
	document.addEventListener("keydown",TabsKeyNavigation);
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
	//clicking the wheel toggle the form visibility
	var settingsBtnQuickReports = document.getElementById("settings-btn-quick-reports");
	var quickReports = document.getElementById("quick-reports");
	UTILS.addEvent(settingsBtnQuickReports, "click", function(){onSettingsClick(quickReports);});
	var cancelBtn= document.getElementsByClassName("tab-footer")[0].getElementsByTagName("a")[0];
	UTILS.addEvent(cancelBtn, "click", function(){onSettingsClick(quickReports);});
	var submitQuickReports=quickReports.getElementsByClassName("submit")[0];
	UTILS.addEvent(submitQuickReports, "click", function(){submitForm(quickReports);});
	
	// =============== Stage 5 ===============
	var searchBox = document.getElementById("search-form");
	UTILS.addEvent(
		searchBox,
		"submit",
		function (event) {
			event.preventDefault();
			return search();
		}
	);
	
	// =============== Stage 6 ===============
	// Restore previous state


	var reports = LocalStorage.GetQuickReportsState();
	loadForm(quickReports, reports);
	
}());

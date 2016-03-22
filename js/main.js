
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
        case 13:{
                if(selectedTabIndex==0||selectedTabIndex==2){
               	  	submitForm(tabslist[selectedTabIndex]);
                 }

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

		}
		if(name[i]!==""&&url[i]==""){
			url[i]=fieldsets[i].getElementsByClassName("url-input")[0].classList.add("invalid");
			flag=1;
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

	// for(i=0;i<fieldsets.length;i++){
	// 	if(name[i]==""&&url[i]!==""){
	// 		fieldsets[i].getElementsByClassName("text-input")[0].classList.add("invalid");
	// 	}
	// 	if(name[i]!==""&&url[i]==""){
	// 		url[i]=fieldsets[i].getElementsByClassName("url-input")[0].classList.add("invalid");
	// 	}
	// }
};


function savelinksReports () {
    var name=[];
    var url=[];
    var array=[];
    name = all(".reportname");
    url = all(".reporturl");

    var i;
    for (i=0;i<3;i++)
    {
    	
        var rn = name[i].children[1].value;
        var ru = url[i].children[1].value;   
 
        array.push({
                "name":rn,
                "url":ru
        });
    
        
    }
    var linkarray = JSON.parse(localStorage.getItem("linkarray"));
    if(linkarray==null)
    {
        linkarray=[];
          for (i=0;i<3;i++)
    {
        linkarray.push({
                "name":"",
                "url":""
        });
    }
    }

     for (i=0;i<3;i++)
    {
        linkarray[i].name=array[i].name;
               linkarray[i].url=array[i].url;
        
    }

    localStorage.setItem("linkarray" , JSON.stringify(linkarray));

    updatelinksReports();

}

















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
	//clicking the wheel toggle the form visibility
	var settingsBtnQuickReports = document.getElementById("settings-btn-quick-reports");
	var quickReports = document.getElementById("quick-reports");
	UTILS.addEvent(settingsBtnQuickReports, "click", function(){onSettingsClick(quickReports);});
	var cancelBtn= document.getElementsByClassName("tab-footer")[0].getElementsByTagName("a")[0];
	UTILS.addEvent(cancelBtn, "click", function(){onSettingsClick(quickReports);});
	var submitQuickReports=quickReports.getElementsByClassName("submit")[0];
	UTILS.addEvent(submitQuickReports, "click", function(){submitForm(quickReports);});
}());

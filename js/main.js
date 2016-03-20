
var onTabClick = function(element){

	



	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	for(i = 0;i < tabslist.length; i++)
	{
		  tabslist[i].setAttribute("style", "background:grey;");
		  tabslist[i].getElementsByTagName("a")[0].setAttribute("style", "color:rgb(235, 235, 235);");
		  var innerTag=tabslist[i].getElementsByTagName("a")[0];
		  innerTag.setAttribute("style", "color:rgb(235, 235, 235);");
		  var res = innerTag.innerHTML.replace(" ", "-");
	      res = res.toLowerCase();
	      alert(res);
	      document.getElementById(res).setAttribute("style", "display:none;");	  
	}	
	element.setAttribute("style", "background:rgb(235, 235, 235); text-decoration:black;");
	var innerTag=element.getElementsByTagName("a")[0];
	innerTag.setAttribute("style", "color:black;");
    var res = innerTag.innerHTML.replace(" ", "-");
    res = res.toLowerCase();
    document.getElementById(res).setAttribute("style", "display:block;");

};


(function(){ 
	
	var tabslist = document.getElementById("tabs-list").getElementsByTagName("li");
	
	for(i = 0;i < tabslist.length; i++)
	{
		  (function(index) {UTILS.addEvent(tabslist[index],"click",function(){onTabClick(tabslist[index]);});})(i);
	}	
	
	
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
	
}());

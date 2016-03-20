(function(){ 
	alert("Hello");
	
	// var tabslist = document.getElementById("tabs-list").getElementsByTagName("a");
	
	// for(i = 0;i < tabslist.length; i++)
	// {
		// var onTabClick = function(){
			// alert("dan");	
		// };
		// alert(tabslist[i].innerHTML);
		// UTILS.addEvent(tabslist[i],"click",onTabClick(tabslist[i].innerHTML));
	// }	
	
	
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
	

	//UTILS.addEvent(tab,"click",onTabClick);
	
	// for(var i=0,len=tabs.length;i<len;i=i+1){
		// UTILS.addEvent(tabs[i],"click",tabClick);
	// }
}());

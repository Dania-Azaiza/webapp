(function(){
	var tab=document.getElementsByClassName("tabs").firstChild;

	var tabs=document.getElementsByTagName("a");
	var tabClick=function(){
		alert("dania");	
	};
	for(var i=0,len=tabs.length;i<len;i=i+1){
		UTILS.addEvent(tabs[i],"click",tabClick);

	}
}());
/*
$(document).ready(function(){ 
});






$(".tabs a").click(function(){
   	
   	alert("haha1");
 });*/
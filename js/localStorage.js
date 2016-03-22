var LocalStorage = 
(function () {

	return {
			SaveState: function(selectedTab, QuickReportsState, MyTeamFolderState){
				var fullState = JSON.parse(localStorage.getItem('settings'));
				
				if (fullState == null) 
					fullState = { };
				
				if(selectedTab != undefined){
					fullState.selectedTab = selectedTab;
				}
				
				if(QuickReportsState != undefined){
					fullState.QuickReportsState = QuickReportsState;
				}
				
				if(MyTeamFolderState != undefined){
					fullState.MyTeamFolderState = MyTeamFolderState;
				}
				
				localStorage.setItem('settings', JSON.stringify(fullState));
			},
			
			
			GetLastTab : function(){
				var fullState = JSON.parse(localStorage.getItem('settings'));
				if (!fullState) 
					return "";

				return fullState.selectedTab;
			},
			
			GetQuickReportsState: function(){
				var fullState = JSON.parse(localStorage.getItem('settings'));
				if (!fullState) 
					return null;
				
				return fullState.QuickReportsState;
			},
			
			GetMyTeamFolder: function(){
				var fullState = JSON.parse(localStorage.getItem('settings'));
				if (!fullState) 
					return null;
				
				return fullState.MyTeamFolderState;
			}
		};
}());

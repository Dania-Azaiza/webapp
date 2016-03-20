var LOCALSTORAGE = 
(function () {

	return {
			SaveState: function(selectedTab, QuickReportsState, MyTeamFolderState){
				var fullState = JSON.parse(localStorage.getItem('settings'));
				
				if (selectedTab === undefined || QuickReportsState === undefined || MyTeamFolderState === undefined)
					throw Error('All parameters must be defined');
				
				fullState.selectedTab = selectedTab;
				fullState.QuickReportsState = QuickReportsState;
				fullState.MyTeamFolderState = MyTeamFolderState;
				
				localStorage.setItem('settings', JSON.stringify(fullState));
			},
			
			
			GetLastTab : function(){
				var fullState = JSON.parse(localStorage.getItem('settings'));
				if (!fullState) 
					return null;
				
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
<<<<<<< HEAD
}());
=======
}());
>>>>>>> origin/gh-pages

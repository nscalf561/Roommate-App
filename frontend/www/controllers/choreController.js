angular.module('chore.controller', [])

.controller('ChoreCtrl', function($scope) {
  $scope.choreContent = [
  	{
			task: 'Clean Kitchen', 
			completedAt: 'April 3, 2016',
			upvotes: 3,
			completedBy: '',
			comments: []
		},
  	{
			task: 'Clean Toilet', 
			completedAt: 'April 2, 2016',
			upvotes: 2,
			completedBy: '',
			comments: [
			{
				author: 'Jessie',
				content: 'no more chipotle for nick'
			}]
		},
		{
			task: 'Take out trash', 
			completedAt: 'April 1, 2016',
			upvotes: 1,
			completedBy: '',
			comments: []
		},
		{
			task: 'Mop floors', 
			completedAt: 'Mar 23, 2016',
			upvotes: 0,
			completedBy: '',
			comments: []
		},
		{
			task: 'Clean Shower', 
			completedAt: 'Mar 2, 2016',
			upvotes: 0,
			completedBy: '',
			comments: []
		}
  ];
});
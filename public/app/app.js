angular.module('app', []);

angular.module('app')
    .controller('testCtrl', function($scope) {
        $scope.doctors = [
            {name:"Doctor One", description:"Description One"},
            {name:"Doctor Two", description:"Description Two"},
            {name:"Doctor Three", description:"Description Three"},
            {name:"Doctor Four", description:"Description Four"}
        ];
    });

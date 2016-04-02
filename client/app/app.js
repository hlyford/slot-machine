var app = angular.module('slotmachine', 
  ['slotmachine.slots', 'ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider    
    .when('/', {
      templateUrl: 'app/slots/slots.html',
      controller: 'SlotsController',      
    })          
    .otherwise({redirectTo: '/'});    


})
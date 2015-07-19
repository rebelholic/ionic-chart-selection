angular.module('starter.controllers')

.controller('DashCtrl', ['$scope', '$q', '$http', '$timeout', '$interval', '$state', '$filter', '$location', 'DOLLTYPE', 'REGION', function($scope, $q, $http, $timeout,  $interval, $state, $filter, $location, DOLLTYPE, REGION) {
    var deferred = $q.defer();
            $http.get('js/data2.json').success(function(result) {
              var region = result;
              console.log (region);
              deferred.resolve(region);
              for (var i = region.length - 1; i >= 0; i--) {
              REGION.add(region[i]); console.log('success')};
            return deferred.promise;
            })     
            
            var deferred = $q.defer();
            $http.get('js/data.json').success(function(result) {
               var dolltype = result;
               console.log (dolltype);
               deferred.resolve(dolltype);
               for (var i = dolltype.length - 1; i >= 0; i--) {
               DOLLTYPE.add(dolltype[i]); console.log('success')};
            return deferred.promise;
            })  
            
 $scope.title = "Dashboard";

  
 $scope.dash = [];
 $scope.datas = [];
 $scope.avg = [];
 $scope.avgy = [];
 $scope.data = [[]];
 $scope.labels = [[]];
 $scope.date = [];


 $scope.place = [];
 $scope.ayv = [];

 $scope.dolltype = [];
 DOLLTYPE.all().then(function(dolltype){ 
 $scope.dolltype=dolltype
 })
 $scope.regiontype = [];
 REGION.all().then(function(regiontype){ 
 $scope.regiontype=regiontype
 })

 
 $scope.change = function(dash1) {
  $scope.place = dash1;
 }
 
 $scope.change2 = function(dash2) {
   $scope.doll= dash2.id;
 }


 $scope.place.name = 'Please select';

 $scope.$watchCollection('[place, doll]', function(newVal, oldVal) {
  $scope.colours = [
      { // Blue
        fillColor: 'rgba(148,159,177,0)',
        strokeColor: 'rgba(47,64,200,1)',
        pointColor: 'rgba(67,43,177,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
      },
      { // Red
        fillColor: 'rgba(77,83,96,0)',
        strokeColor: 'rgba(200,15,9,1)',
        pointColor: 'rgba(190,50,11,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(77,83,96,1)'
      },
       { // Green
        fillColor: 'rgba(77,83,96,0)',
        strokeColor: 'rgba(18,177, 26,1)',
        pointColor: 'rgba(80,200,11,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(77,83,96,1)'
      }
    ];
    

 $http.get('js/data4.json').success(function(result) { 
   var deferred = $q.defer();
   $scope.dash.msg  = result.message;
   $scope.prices = result.data;
   deferred.resolve($scope.prices);
   angular.forEach($scope.prices,function(value,index){
   var values =  {
                  value : value.value,
                  date : new Date(value.created_at.replace(/-/g,"/"))
    };

    $scope.datas.push(values.value);
    $scope.dash.price = $scope.datas[2];
    $scope.date.push($filter('date')(values.date,'dd-MMM'));    
    $scope.date.splice(2); 
    return deferred.promise;       
    })}).error(function(data, status) {


   console.error('Error', status, data);
   }); //End get price value

 $http.get('js/data5.json').success(function(result) { 
   $scope.averageprice = result.data;
   angular.forEach($scope.averageprice,function(value,index){
   var avgvalue =  {
                    average: value.average,
                    date : new Date(value.created_at.replace(/-/g,"/"))
    };
    console.log (avgvalue);
    $scope.avg.push(avgvalue.average);
    })}).error(function(data, status) {


   console.error('Error', status, data);
   }); //End get average price value
   
   var deferred = $q.defer();
   $http.get('js/data3.json').success(function(result) { 
   $scope.averageyearprice = result.data;
   deferred.resolve($scope.averageyearprice);
   console.log ($scope.averageyearprice);
   $scope.avgy.push($scope.averageyearprice.yearly_average);
   return deferred.promise;
   }).error(function(data, status) {


  }); //End get average year price value

  $scope.data[0] = $scope.datas;
  $scope.data[1] = $scope.avg;
  $scope.data[2] =  $scope.avgy;

  $scope.labels = $scope.date;
  console.log ($scope.data[0]);
  
  $scope.series = [$scope.place.name, 'All (Average)', 'All (YTD Year)']; 
  console.log ($scope.series); // Add information for the hover/touch effect

 })

}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

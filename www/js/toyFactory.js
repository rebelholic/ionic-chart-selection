angular.module('starter.factories')

.factory('REGIONList', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;
 
  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }
 
  // Proces a result set
  self.getAll = function(result) {
    var output = [];
 
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }
 
  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }
 
  return self;
})


.factory('REGION', function($cordovaSQLite, $q, $http, $ionicPlatform, $localStorage, REGIONList) {
  var id =  $localStorage.id;
  var token =  $localStorage.token;
  
  var self = this;
 
  self.all = function() {
    return  REGIONList.query("SELECT id, name, area_id FROM region")
      .then(function(result){
        return  REGIONList.getAll(result);
      });
  }
 
  self.get = function(REGIONId) {
    var parameters = [REGIONId];
    return  REGIONList.query("SELECT id, name, area_id FROM region WHERE id = (?)", parameters)
      .then(function(result) {
        return  REGIONList.getById(result);
      });
  }
 
  self.add = function(REGION) {
    var parameters = [REGION.id, REGION.name, REGION.area_id];
    return  REGIONList.query("INSERT OR REPLACE INTO region (id, name, area_id) VALUES (?,?,?)", parameters);			
	}
	
   return self;
});


 
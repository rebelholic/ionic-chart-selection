angular.module('starter.factories')

.factory('DollTypeList', function($cordovaSQLite, $q, $ionicPlatform) {
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

.factory('DOLLTYPE', function($cordovaSQLite, $q, $http, $ionicPlatform, $localStorage, DollTypeList) {
  var id =  $localStorage.id;
  var token =  $localStorage.token;
  
  var self = this;
 
  self.all = function() {
    return  DollTypeList.query("SELECT id, name, basic_price FROM items")
      .then(function(result){
        return  DollTypeList.getAll(result);
      });
  }
 
  self.get = function(itemsId) {
    var parameters = [itemsId];
    return  DollTypeList.query("SELECT id, name, basic_price FROM items WHERE id = (?)", parameters)
      .then(function(result) {
        return  DollTypeList.getById(result);
      });
  }
 
  self.add = function(itemtype) {
    var parameters = [itemtype.id, itemtype.name, itemtype.basic_price];
    return  DollTypeList.query("INSERT OR REPLACE INTO items (id, name, basic_price) VALUES (?,?,?)", parameters);			
	}
	
   return self;
});

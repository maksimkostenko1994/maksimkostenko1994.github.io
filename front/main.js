angular.module('app', ['ngRoute']).run(['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
  $rootScope.item = {email: '', password: ''}

  $rootScope.login = function () {
    $http.post('http://192.168.0.93:8080/informatics/login', $rootScope.item).then(function (response) {
      console.log('Data ' + response.data.email)
      if (($rootScope.item.email === response.data.email) && ($rootScope.item.password === response.data.password)) {
        $window.location.href = '#!/user'
      }
    })
  }
  $rootScope.isLoggedIn = true;
  // $rootScope.logout = logout;
  /* $rootScope.$watch(
     function () {
       return store.get('token');
     },
     function () {
       $rootScope.isLoggedIn = !!store.get('token');
     }
   );

   function logout () {
     store.remove('token');
     $window.location.href = '/#/';
   }*/

}])
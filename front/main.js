import store from 'store'

angular.module('app', ['ngRoute', 'angular.filter', 'app.authentication']).config(['$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor')
  }]).run(['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
  $rootScope.item = {email: '', password: ''}
  $rootScope.login = function () {
    $http.post('http://192.168.43.16:8080/informatics/login', $rootScope.item).then(function (response) {
      store.set('token', response.data.token)
      store.set('user', response.data.user)
      return $rootScope.user = response.data.user
    })
    $window.location.href = '#!/user/hello'
  }
  // 192.168.0.93
  $http.get('http://192.168.43.16:8080/informatics/users').then(function (response) {
    return $rootScope.users = response.data
  })

  $rootScope.getIntegration = function() {
    $http.get('http://192.168.43.16:8080/informatics/integrateWithOptima');
  }

  $rootScope.user = JSON.parse(localStorage.getItem('user'))

  $rootScope.isLoggedIn = false
  $rootScope.logout = logout
  $rootScope.$watch(
    function () {
      return store.get('token')
    },
    function () {
      $rootScope.isLoggedIn = !!store.get('token')
    }
  )

  function logout () {
    store.remove('token')
    store.remove('user')
    localStorage.removeItem('id')
    localStorage.removeItem('d_id')
    localStorage.removeItem('group_id')
  }
}
])
angular.module('app').controller('DisciplineController', ['$scope', '$http', '$window', 'GroupService',
  function ($scope, $http, $window, GroupService) {
    $http.get('http://192.168.0.93:8080/informatics/courses').then(function (res) {
      return $scope.courses = res.data
    })

    $http.get('http://192.168.0.93:8080/informatics/courses?active').then(function (res) {
      console.log(res.data)
      return $scope.teacher = res.data
    })

    $scope.getGroups = function (id) {
      GroupService.setDId(id)
      $window.location.href = '#!/user/groups/' + id
    }
  }])
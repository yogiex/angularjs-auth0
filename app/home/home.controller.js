(function() {
    
    angular.module('app').controller('HomeController', homeController)

    homeController.$inject = ['$http','authService'];

    function homeController($http, authService){
        var vm = this;

        vm.message = '';
        vm.auth = authService;
        vm.getMessage = function(){
            $http.get('http://localhost:8080/authorized')
            .then(function(result){
                vm.message = result.data
            }, function(err){
                console.log(err)
            })
        }
    }
})();
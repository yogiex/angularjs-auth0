(function(){
    angular.module('app').controller('profileController', profileController);

    function profileController(){
        var vm = this;

        vm.profile = JSON.parse(localStorage.getItem('profile'))
    }
})()
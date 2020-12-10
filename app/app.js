(function() {

    angular
        .module('app', ['auth0.auth0', 'ui.router','angular-jwt'])
        .config(config);

        config.$inject = [
            '$stateProvider',
            '$locationProvider', 
            '$urlRouterProvider', 
            '$httpProvider',
            'angularAuth0Provider',
            'jwtOptionsProvider'
        ]

        function config($stateProvider,
                        $locationProvider, 
                        $urlRouterProvider, 
                        $httpProvider,
                        angularAuth0Provider,
                        jwtOptionsProvider
                        ) {
            $stateProvider.state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: 'app/home/home.html',
                controllerAs: 'vm'
            })
            .state('callback',{
                url: '/callback',
                controller: 'CallbackController',
                templateUrl: 'app/callback/callback.html',
                controllerAs: 'vm'
            })
            .state('profile',{
                url: '/profile',
                controller: 'profileController',
                templateUrl: 'app/profile/profile.html',
                controllerAs: 'vm'
            });
            
            angularAuth0Provider.init({
                clientID : '', //diisi dengan clientID
                domain: '', // diisi dengan domain pada auth0
                responseType: '', // diisi dengan responseType 
                redirectUri: '', // diisi dengan enpoint callback
                scope: '', // diisi dengan scope openid dan profile
                audience: '' // diisi dengan endpoint api yang dibuat pada auth0
            })

            jwtOptionsProvider.config({
                tokenGetter: function(){
                    return localStorage.getItem('access_token')
                },
                whiteListedDomains: ['localhost']
            });

            $httpProvider.interceptors.push('jwtInterceptor')

            $urlRouterProvider.otherwise('/');

            $locationProvider.hashPrefix('');

            $locationProvider.html5Mode(true)
        }

})();
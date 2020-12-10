(function(){

    angular.module('app').service('authService', authService);

    authService.$inject = ['$state', 'angularAuth0', '$timeout']


    // state
    function authService($state, angularAuth0, $timeout){
        function login(){
            angularAuth0.authorize();
        }

        // handle authentifikasi state
        function handleAuthentication(){
            angularAuth0.parseHash(function(err, authResult){
                if( authResult && authResult.accessToken && authResult.idToken){
                    setSession(authResult)
                    $timeout(function(){
                        $state.go('home')
                    })
                    //console.log(authResult)
                }
            })
        }

        // membuat item access_item, id_token, expires_at, JWT
        function setSession(authResult){
            var expiresAt = JSON.stringify(
                ( authResult.expiresIn * 1000) + new Date().getTime()
            );
            profile = {
                name: authResult.idTokenPayload.name,
                nickname: authResult.idTokenPayload.nickname,
                picture: authResult.idTokenPayload.picture,
            }
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('profile', JSON.stringify(profile))
        }

        // menghapus access_token, id_token, expires_at
        function logout(){
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
        }

        // mengecek kondisi authentifikasi dengan waktu
        function isAuthenticated(){
            var expiresAt = JSON.parse(localStorage.getItem('expires_at'))
            return new Date().getTime() < expiresAt;
        }

        // module exports
        return {
            login: login,
            handleAuthentication: handleAuthentication,
            logout: logout,
            isAuthenticated: isAuthenticated
        }
    }
})();
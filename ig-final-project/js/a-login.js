angular.module('adminLoginApp', [])
    .controller('AdminLoginController', ['$scope', function($scope) {
        // Initialize variables
        $scope.username = '';
        $scope.password = '';

        // Function to handle login
        $scope.login = function() {
            // Check if username and password are valid
            if ($scope.username === 's' && $scope.password === 's') {
                // Redirect to admin.html on successful login
                window.location.href = 'admin.html';
            } else {
                // Show error message or handle invalid login
                alert('Invalid username or password. Please try again.');
            }
        };
    }]);

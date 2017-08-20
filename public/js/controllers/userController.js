angular.module("ccvApp").controller("userController", function($scope, $rootScope, $state, mainService, modalService){

  $scope.updateSuccess = false;

  $scope.openModal = function(id){
    console.log(id, "openModal in user");
    modalService.Open(id);
  }

  $scope.closeMyModal = function(id){
    console.log(id,"clicked user controllers");
    modalService.Close(id);
  }

  var getOrderHistory = function(){
    mainService.getOrderHistory().then(function(response){
      $scope.history = response;
      if(response.reqUser === false){
        $state.go("login");
      }
    })
  }

  $scope.updateAccount = function(id, userEmail){
    let newEmail = {
      email: userEmail
    }

    mainService.updateAccount(newEmail).then(function(response){
      if(response.success === true){
        $scope.updateSuccess = true;
        $scope.accountMessage = "Your account has been updated!"
      } else {
        $scope.updateSuccess = true;
        $scope.accountMessage = "Sorry, that email already exists"
      }
      modalService.Open(id);

    })

  }






  if($state.params.orderid){
    console.log("order details");

    // mainService.getAuth().then(function(response){
    //   console.log(response, "userController");
    //   if(response.reqUser){
        mainService.getOrderById($state.params.orderid).then(function(response){
          // console.log(response, "HERE IS THE RESPONSE");
          if(response.reqUser === false){
            console.log("no reqUser");
            $state.go("login");
          } else if(response.results === false){
            console.log("LOGGING FALSE, SENDING TO ORDERHISTOR YPAGE");
            $state.go("orderhistory");
          } else if (response){
            $rootScope.$broadcast('cartCount')
            $scope.orderNumber = $state.params.orderid;
            $scope.orderProducts = response;
            $scope.shipping = parseFloat($scope.orderProducts[0].shipping);
            $scope.orderTotal = parseFloat($scope.orderProducts[0].ordertotal);
          }

        })
    //   } else {
    //     console.log("going to orderhistory");
    //     $state.go("orderhistory");
    //   }
    // })

  } else {
    console.log("order history");
    getOrderHistory();
  }

})

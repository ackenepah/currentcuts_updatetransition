angular.module("ccvApp").controller("productController", function($scope, $rootScope, $stateParams, mainService, $sce){

  $scope.addToCartModal = false;

  var getProductById = function() {
    mainService.getProductById($stateParams.id).then(function(response) {
      //response[0] gives us description, id, images, and name
      $scope.product = response[0];
      //set image on load
      $scope.vectorFile = $sce.trustAsResourceUrl(response[0].imgmainvector);
      //if there's an outline image, set ng if to true to show outline toggle
      $scope.product.imgoutlinevector ? $scope.outlineImage = true : $scope.outlineImage = false;
      //change inverted image
      $scope.changeInverted = function(inverted){
        console.log(inverted);
        //if inverted = true, set the image to second outline image
        inverted ? $scope.vectorFile = $scope.product.imgoutlinevector : $scope.vectorFile= $scope.product.imgmainvector;
      }
      //change color of vector graphic
      $scope.updateImgColor = function(productColor){
        //if productColor = true, set the new color to be selected color
        if(productColor){
          $scope.newColor = JSON.parse(productColor)
          console.log($scope.newColor.secon);
        }
      }
    })
    mainService.getProductById2($stateParams.id).then(function(response) {
      //response gives us all heights, widths and prices
      $scope.product2 = response;
    })
  }


  $scope.productQuantity = 1;
  $scope.addToCart = function(productColor,productQuantity, productObject){

    var productName = $scope.product.name;
    var productPrice = productObject.price;
    var productColorPrime = JSON.parse(productColor)
    // console.log(hello.prime, "HERE IS THE RICE LOL");
    var productSize = productObject.height + "H x " + productObject.width + "W";
    var productImage = $scope.product.img1;
    var productId = $scope.product.id;
    console.log(productSize, "psize");

// Quick fix - if quantity is zero, do not add to cart
    if(productQuantity !== "0"){
      mainService.addProductsToCart(productSize,productColorPrime.prime,productQuantity,productName,productPrice,productImage,productId);
      $scope.addToCartModal = true;

      $rootScope.$broadcast('cartCount')
      console.log($scope.addToCartModal);
    } else {
      swal("Please update quantity number")
    }
  }

  //modal to confirm item has been added to cart

  var modal = document.getElementById('modalz');

  $scope.closeModal = function(){
    $scope.addToCartModal = false;
    console.log($scope.addToCartModal, "close");
  }

  window.onclick = function(e) {
    if (e.target == modal) {
      $scope.addToCartModal = false;
      $scope.$apply(); //resets digest cycle so angular knows scope.userModal updated
      console.log($scope.addToCartModal, "close window");
    }
  }





    getProductById();
})

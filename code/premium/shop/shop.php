<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 

<style>
    .shopHeader{
      background: url('/img/bg.png') no-repeat center;
      height: 300px;
      background-size: 100%;
      margin-bottom:50px;
    }

    .shopContent{
      padding:0 5%;
      margin-bottom:50px;
    }

    .premiumFeatureWrapper{
        display:block;
        float:left;
        width:230px;
        margin-right:50px;
    }

    .premiumFeatureTop{
      margin-bottom:20px;
      text-align: center;
      width:100%;
      background: rgba(236,172,60,1);
      background-size:100px 100px;
      min-height:220px;
      border-radius:5px;
    }

    .premiumFeatureTop h4{
      margin:0 auto;      
      text-align:center;
      max-width:80%;
      padding-top:10px;
      color:white; 
      font-size:1.3em;    
    }

    .premiumFeatureTop img{
      width:150px;
      height:150px;
    }

    .premiumFeatureBottom{

      background: white;
      padding:10px;
    }
    .premiumFeatureBottom h4{
      color:black;
      font-weight: bold;
      font-size:0.8em;
      margin-bottom: 0;
      padding-bottom: 0;

    }

    .premiumFeatureBottom p{
      max-height:60px;
      overflow: hidden; 
      font-size:0.8em;      
    }
    .premiumFeatureBottom .price{
        font-weight: bold;
        line-height:28px;
    }

    .premiumFeatureBottom button{
       padding:5px 20px;
       float:right;
       border:none;
       outline:none;
    }

    .ng-modal-overlay {
  /* A dark translucent div that covers the whole screen */
  position:absolute;
  z-index:9999;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:#000000;
  opacity: 0.8;
}
.ng-modal-dialog {
  /* A centered div above the overlay with a box shadow. */
  z-index:10000;
  position: absolute;
  width: 50%; /* Default */

  /* Center the dialog */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);

  background-color: #fff;
  box-shadow: 4px 4px 80px #000;
}
.ng-modal-dialog-content {
  padding:10px;
  text-align: left;
}
.ng-modal-close {
  position: absolute;
  top: 3px;
  right: 5px;
  padding: 5px;
  cursor: pointer;
  font-size: 120%;
  display: inline-block;
  font-weight: bold;
  font-family: 'arial', 'sans-serif';
}

</style>

<div ng-app="shop" ng-controller="shopController">
  <div class='row'>
    <div class='shopHeader'></div>

    <div class='shopContent'>
        <div class='premiumFeatureWrapper' ng-repeat="feature in PremiumFeatures" >      
            <div class='premiumFeatureTop'>
                <h4>{{feature.name}}</h4>
                <img src='/img/icon_cog.png'/>
            </div>
            <div class='premiumFeatureBottom'>
                <h4>{{feature.name}}</h4>
                <p>{{feature.description}}</p>
                <span class='price'>£{{feature.price}}/month</span class='price'>
                <button ng-click="open()">Buy</button>
            </div>
        </div>
        <div class='clearfix'></div>
    </div>
  </div>
  

</div>

<script src="<?echo $_SESSION['path']?>/bower_components/angular/angular.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular-route/angular-route.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular-resource/angular-resource.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular-ui-bootstrap/dist/ui-bootstrap-0.11.0.js"></script>


  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/premium/shop/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/premium/shop/features.php"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/premium/shop/resource.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/premium/shop/controllers.js"></script>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 



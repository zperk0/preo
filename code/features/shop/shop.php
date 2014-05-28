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
    .premiumFeatureBottom .price, #featureModal .header .price{
        font-weight: bold;
        line-height:28px;
    }

    .premiumFeatureBottom button, #featureModal .header button{
       padding:5px 20px;
       float:right;
       border:none;
       outline:none;
    }

     #featureModal .header img{
        width:50px;
    }
    #featureModal .content img{
        width: 400px;
        margin: 0 auto;
        display: block;
    }   

   #featureModal .header{
      padding-bottom:20px;
      border-bottom: 1px solid gray;
      margin-bottom: 30px;
   }

   .rightWrapper{
      position:relative;
      max-width:40%;
      float:right;
   }

   .rightWrapper button{
    float: none;
    position: absolute;
    right: 0;
    top: 30px;
    padding: 5px 28px;    
   }

   .rightWrapper span{
      display: block;      
      position: Absolute;
      right: 0;
      top: 0;
      color: black;
   }

   .leftWrapper{
      float:left;
      display:block;
      width:60%;
      position:relative;
   }
   .leftWrapper span{
      position: absolute;
      left: 55px;
      top: 0;
   }   

   .leftWrapper h4{
     position: absolute;
    bottom: 0;
    margin-bottom: 0;
    left: 55px;
    color: black;    
   }

   #featureModal .content{
      position:relative;
   }

   #featureModal .content ul{
      margin-left:20px;
   }

   #featureModal .content h6{
      color:#2E70B7;
      margin-bottom:1.5em
   }

   .chevron {
      display:block;
      position:absolute;
      top:30%;
      left:20px;
      font-size:3em;
   }

   .chevron:hover{
      cursor:pointer;
   }

   .chevron.chevronRight{
      left:auto;
      right:20px;
   }

   #featureModal{
      border-radius: 25px;
      border: 8px solid #ccc;
      /*to add some spacing in case we're in the bottom of the page. Or the dialog looks weird*/
      margin-bottom:100px;
      padding:40px;
   }

</style>

<div ng-app="shop" ng-controller="shopController">
  <div class='row'>
    <div class='shopHeader'></div>
    <div class='shopContent'>
        <div class='premiumFeatureWrapper' ng-repeat="feature in PremiumFeatures" >      
            <div class='premiumFeatureTop'>
                <h4>{{feature.name}}</h4>
                <img ng-src='{{feature.icon}}'/>
            </div>
            <div class='premiumFeatureBottom'>
                <h4>{{feature.name}}</h4>
                <p>{{feature.description}}</p>
                <span class='price'>£{{feature.price}}/month</span class='price'>
                <button ng-click="setSelectedFeature($index)" data-reveal-id="featureModal">BUY</button>
            </div>
        </div>
        <div class='clearfix'></div>
    </div>
  </div>

  <div id="featureModal" class="reveal-modal medium" data-reveal>
    <div class='header'>
      <div class='leftWrapper'>
        <img ng-src='{{selectedFeature.feature.icon}}'/>
        <span>my order app</span>
        <h4>{{selectedFeature.feature.name}}</h4>
      </div>
      <div class='rightWrapper'>
          <span class='price'>£{{selectedFeature.feature.price}}/month</span class='price'>
          <button ng-click="setSelectedFeature(feature)" data-reveal-id="myModal">BUY</button>
      </div>
      <div class='clearfix'></div>
    </div>
    <div class='content'>
        <span class='chevron chevronRight' ng-click="selectNextFeature()">&gt;</span>
        <span class='chevron chevronLeft' ng-click="selectPreviousFeature()">&lt;</span>
        <img ng-src='{{selectedFeature.feature.promoImg}}'/>
        <h6><?echo _("Features")?></h6>
        <ul>
          <li ng-repeat='descriptionFeature in selectedFeature.feature.descriptionFeatures'> {{descriptionFeature}}</li>
        </ul>
        <h6><?echo _("Description")?></h6>
        <div class='description'>{{selectedFeature.feature.description}}</div>
    </div>
    <a class="close-reveal-modal">&#215;</a>
  </div>

</div>

  <script src="/js/angular_all.min.js"></script>

  <script type="text/javascript" src="/code/features/shop/app.js"></script>
  <script type="text/javascript" src="/code/features/shop/features.php"></script>
  <script type="text/javascript" src="/code/features/shop/resource.js"></script>
  <script type="text/javascript" src="/code/features/shop/controllers.js"></script>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 



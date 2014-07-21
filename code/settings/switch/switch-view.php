<?
  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint


  // Make sure we have perms to use this
  $apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
  $curlResult = callAPI('GET', $apiURL."users/auth/roles/admin", false, $apiAuth);
  if(empty($curlResult)) $curlResult = '[{"status" : 200}]';

  $result = json_decode($curlResult, true);

  if ( isset($result['status']) && $result['status'] == 403 ) { 
    // Send a 404 only admins should see this
    header("HTTP/1.0 404 Not Found");  
    require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
    require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
    require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/404/404_content.php');
    require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');

    // Short circuit
    return;

  }

  // We have permission so lets show the search form
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 

?>

  <div class="row">
    <div class="topSpacer"></div>
  </div>
  <div class="large-12 columns row--space1u">
    <div  ng-app="switch" ng-controller="switchController" ng-cloak>
      <div class='loader' ng-show="!finishedLoading">      
        <img src='/img/spinner.gif'/>
      </div>
      <div class='row deliveryHeader'> <h1 class="alignHeader"><?echo _("Search Venue")?></h1></div>
      <form name="switchForm" id="switchForm" ng-submit="processForm()" novalidate ng-show="finishedLoading">  
          <div class="row">
            <div class="large-12 columns">
              <label><?echo _("Venue Code");?></label>
              <input type="text" id="code" name="code" ng-model="form.code" placeholder="" tabindex=1>
            </div>
            <div class="large-12 columns">
              <label><?echo _("Admin username");?></label>
              <input type="text" id="admin" name="admin" ng-model="form.name" placeholder="" tabindex=2>
            </div>
          </div>

          <div class='row deliverySubmitHolder'>
            <div class="large-12 columns">
              <button ng-show="!isPosting" id="switchSearch" type="submit" ><?echo _("Search");?></button>
              <button ng-show="isPosting" class="secondary" type="button"><?echo _("SEARCHING...");?></button>
            </div>
          </div>
      </form>

      <div class="row">
        <div class="large-12 columns">
          <table>
            <tr><th>AccountId</th><th>Name</th><th>Code</th><th></th></tr>
            <tr ng-repeat="v in venues track by v.id">
              <td>{{ v.accountId }}</td>
              <td>{{ v.name }}</td>
              <td>{{ v.code }}</td>
              <td><button ng-click="switchAccount(v)"><?echo _("Switch");?></button>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>


  <script src="/js/angular_all.min.js"></script>


  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/switch/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/switch/controllers.js"></script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 



<?
  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');

  $result = getCurrentlyUserRole();

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
              <label><?echo _("Venue Name");?></label>
              <input type="text" id="name" name="name" ng-model="form.name" placeholder="" tabindex=2>
            </div>
            <div class="large-12 columns">
              <label><?echo _("Admin username");?></label>
              <input type="text" id="admin" name="admin" ng-model="form.admin" placeholder="" tabindex=3>
            </div>
          </div>

          <div class='row deliverySubmitHolder'>
            <div class="large-12 columns">
              <button ng-show="!isPosting" id="switchSearch" type="submit" ><?echo _("Search");?></button>
              <button ng-show="isPosting" class="secondary" type="button"><?echo _("SEARCHING...");?></button>
            </div>
          </div>
      </form>


      <div class="row" ng-if="query && (accounts || venues)">
        <div class="large-12 columns">
          <h4 ng-if="query.code"> Venue code '{{ query.code }}'</h4>
          <h4 ng-if="query.name"> Venue name like '{{ query.name }}'</h4>
          <h4 ng-if="query.admin"> Admin username '{{ query.admin }}'</h4>
        </div>
      </div>

      <div class="row">
        <div class="large-12 columns">
          <table ng-if="accounts">
            <tr><th>AccountId</th><th>Name</th><th></th></tr>
            <tr ng-repeat="a in accounts track by a.id">
              <td>{{ a.id }}</td>
              <td>{{ a.name }}</td>
              <td><button ng-click="switchAccount(a)"><?echo _("Switch");?></button>
            </tr>
          </table>
          <table ng-if="venues">
            <tr><th>VenueId</th><th>AccountId</th><th>Name</th><th>Code</th><th></th></tr>
            <tr ng-repeat="v in venues track by v.id">
              <td>{{ v.id }}</td>
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


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>



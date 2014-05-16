<?  
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
?> 

<!DOCTYPE html>
<html>
<head>
  <title>F-1 Feeder</title>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular/angular.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular-route/angular-route.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/jquery/dist/jquery.min.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/controllers.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/services.js"></script>
</head>
<body ng-app="F1FeederApp" ng-controller="driversController">
  <table>
    <thead>
      <tr><th colspan="4">Drivers Championship Standings</th></tr>
    </thead>
    <tbody>
      <tr ng-repeat="driver in driversList">
        <td>{{$index + 1}}</td>
        <td>
          <img src="img/flags/{{driver.Driver.nationality}}.png" />
          {{driver.Driver.givenName}}&nbsp;{{driver.Driver.familyName}}
        </td>
        <td>{{driver.Constructors[0].name}}</td>
        <td>{{driver.points}}</td>
      </tr>
    </tbody>
  </table>
</body>
</html>

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 
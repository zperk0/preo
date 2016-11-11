<?php
session_start();
?>
<html>
<head>
<script type="text/javascript" src="/vendor.bundle.d48aacffc8e943302877.js"></script>
</head>
<body>
    <div class='validating'>Validating your connection, please hold</div>
    <script>
        Preoday.PaymentProvider.auth(code, state)
          .then(function(){

          }, function(){

          })
    </script>
</body>
</html>
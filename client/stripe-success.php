<?php ?>
<html>
  <head></head>
  <body>
    <script>
      window.onload = function () {
        window.localStorage.setItem('STRIPE_REDIRECT', window.location.href);
      };
    </script>
  </body>
</html>

	
	<script type="text/javascript">	
		<?if((isset($_SESSION['venue_currency']) && $_SESSION['venue_currency'])){?>
			var SESSION_VENUE_CURRENCY = <? echo json_encode($_SESSION['venue_currency']);?>
		<? } else {?>
			var SESSION_VENUE_CURRENCY = "GBP"; /*defaults to GBP*/
		<? } ?>	
	</script>

	<script src="<?echo $_SESSION['path']?>/js/all_scripts.min.js"></script>

	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/modernizr.custom.js'></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/classie.js'></script>
	

	<script type="text/javascript">
	  $(document)
		.foundation()
		.foundation('abide', {
		  <?if(preg_match('/\/login$/',$_SERVER['REQUEST_URI']) || preg_match('/\/profile$/',$_SERVER['REQUEST_URI'])  || preg_match('/\/users$/',$_SERVER['REQUEST_URI']) ){?>
		  live_validate: false,
		  <?}?>
		  patterns: {
			password: /^.+$/
		  }
		});

		$('#trigger-overlay').on('click', function ($e) {
			$e.preventDefault();
			window.history.go(-1);
		})		
	</script>

    <div class="loading" id="loading">
      <div class="background-loading"></div>
      <div class="loading-content">
        <div class="spinner">
          <div class="b1 se"></div>
          <div class="b2 se"></div>
          <div class="b3 se"></div>
          <div class="b4 se"></div>
          <div class="b5 se"></div>
          <div class="b6 se"></div>
          <div class="b7 se"></div>
          <div class="b8 se"></div>
          <div class="b9 se"></div>
          <div class="b10 se"></div>
          <div class="b11 se"></div>
          <div class="b12 se"></div>
        </div>
      </div>
    </div>  
</body>
</html>
<div class="contain-to-grid">
	<nav class="top-bar hide-for-small">
		<ul class="title-area">
			<li class="name">
				<h1>
					<a href="/"><? echo _("PreoDay");?></a>
				</h1>
			</li>
			<li class="toggle-topbar">
				<a href="#"></a>
			</li>
		</ul>

		<section class="top-bar-section">
			<!-- Right Nav Section -->
			<ul class="right">
				<?php if(!isset($_SESSION['logged'])) : ?>
					<li class=""><a href="/signup" class="small button success radius"><? echo _("Sign Up");?></a></li>
					<li class=""><a href="/signin" class="small button radius"><? echo _("Sign In");?></a></li>
				<?php else : ?>
					<li class=""><a href="#" data-reveal-id="settingsM"><i class="fi-wrench large"> <? echo _("Settings");?></i></a></li>
					<li class=""><a href="/signout"><i class="fi-arrow-right large"> <? echo _("Sign Out");?></a></i></li>
				<?php endif; ?>
			</ul>
		</section>
	</nav>
	<?php if(isset($_SESSION['logged'])) : ?>
		<div id="settingsM" class="reveal-modal">
			<h2><i class="fi-wrench large"> <? echo _("Settings");?></i></h2>
			<p class="lead">Title 2</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat a augue a elementum. Nullam vitae posuere nisl. Nunc enim justo, sagittis sed dolor vitae, euismod blandit massa. Mauris sodales dignissim nunc sed dignissim. Nullam nec egestas leo. In sed magna sem. Phasellus eget aliquam tortor. Nunc sit amet ultricies odio, vel cursus ipsum. Etiam porta egestas mauris, dapibus bibendum elit feugiat non. Fusce quis venenatis lectus. Nunc tincidunt molestie imperdiet. Duis nec lorem a nibh auctor rutrum eget in urna. Integer neque risus, imperdiet sed blandit id, lacinia eu felis. Proin ante neque, luctus sed purus id, varius convallis dolor.<br/><br/>Sed consequat tincidunt lorem, quis gravida enim sodales eu. Maecenas dignissim venenatis eros, ac vestibulum leo rutrum vitae. Sed eros dui, fringilla at elit in, auctor tempus ligula. Suspendisse bibendum eros quis erat ornare, quis rutrum est pharetra. Integer dapibus lorem sed interdum condimentum. Curabitur luctus nisi sit amet lectus aliquet dictum. Cras at metus sit amet lectus pretium accumsan id eu justo. Donec massa neque, congue sed fringilla eget, lacinia non purus. Vivamus pretium velit at ligula scelerisque, id dictum orci mattis. Praesent aliquam nibh ac imperdiet bibendum. Ut pretium sollicitudin quam, non imperdiet arcu facilisis eget.<br/><br/>Nunc mauris orci, accumsan ut mauris at, malesuada interdum arcu. Suspendisse feugiat est et vehicula interdum. Vestibulum nec sollicitudin quam. Nulla lobortis suscipit lacus a tincidunt. Praesent sodales ultricies massa, sed elementum quam blandit vitae. Sed eu mauris dui. Fusce et hendrerit orci. Sed eu mauris at metus dictum tempor vel ut ipsum. Proin a viverra lacus. Suspendisse dictum ultricies consectetur. Sed est felis, sodales vitae iaculis in, interdum at est. Nullam in arcu ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed metus nisi, placerat vitae tortor nec, gravida ullamcorper lectus. Proin vestibulum imperdiet laoreet.<br/><br/>Pellentesque vel quam vehicula, varius dolor at, egestas risus. Cras hendrerit convallis augue vel gravida. Etiam ut tempus nunc. Nullam eget ligula suscipit, ornare justo et, auctor lectus. Pellentesque ac consequat quam. Phasellus fermentum tempus tristique. Duis consequat suscipit arcu. Cras nec neque eu urna vehicula mollis at vitae est.<br/><br/>Vivamus nisl velit, dictum nec odio nec, scelerisque iaculis urna. Suspendisse nec justo sit amet velit fermentum aliquam sed vitae tortor. Quisque vel imperdiet nibh. Donec bibendum ipsum mi, eu tempus est malesuada ac. Duis porttitor pretium arcu. Praesent at elementum ante. Mauris ut laoreet arcu. Mauris id adipiscing enim, ac vulputate dui. Morbi facilisis tortor quis felis fermentum adipiscing. Maecenas eu mauris vel lectus blandit tincidunt. Pellentesque ut orci at elit bibendum commodo.</p>
			<a class="close-reveal-modal">&#215;</a>
		</div>
	<?php endif; ?>
</div>
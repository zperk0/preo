		<script>
			document.write('<script src=' + ('__proto__' in {} ? '<?echo $_SESSION['path']?>/js/vendor/zepto' : '<?echo $_SESSION['path']?>/js/vendor/jquery') + '.js><\/script>')
		</script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.alerts.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.cookie.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.dropdown.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.forms.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.placeholder.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.reveal.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.section.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.tooltips.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.topbar.js"></script>
		
<!--	<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.orbit.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.clearing.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.joyride.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.magellan.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.interchange.js"></script> -->

		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.datepicker.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.abide.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/jquery.noty-full-min.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/jsColor/jscolor.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/form.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/tweet.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/timepicker.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/multi-select.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/tableSlide.js"></script>
		
		<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
		
		<!-- Google+ -->
		<script src="<?echo $_SESSION['path']?>/js/googleplus.js"></script>
		<script type="text/javascript">
			window.___gcfg = {
			  lang: 'en-US',
			  parsetags: 'onload'
			};
			(function() {
				var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
				po.src = 'https://apis.google.com/js/client:plusone.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			  })();
		</script>
		
		<script src="<?echo $_SESSION['path']?>/js/general.js"></script>
		
		<script type="text/javascript">
		  $(document)
			.foundation()
			.foundation('abide', {
			  patterns: {
				password: /^.+$/,
			  }
			});
		</script>
		
		<script type="text/javascript">
		$(document).ready(function() {
			if($("#mName").length > 0){
				$(".sortWithinDiv").sortable({ 
					opacity: 0.5, 
					axis: "y", 
					cursor: "move", 
					containment: "parent", 
					handle: ".sortHandle", 
					cancel: "input,textarea,select,option",
					placeholder: "sortable-placeholder",
					tolerance: "pointer",
					revert: 100,
					delay: 100,
					start: function(event,ui){
						$("<tbody><tr><td></td></tr></tbody>").appendTo(ui.placeholder);
						oldItemOrder = $(this).sortable('toArray');
						oldItemOrder.clean("");
						if($(ui.item).find('.itemSave').is(":visible")) $(ui.item).find('.itemSave').trigger('click');
						//$('.sortable-placeholder').height($(ui.item).height());
					},
					update: function(event, ui) {
						currentItemOrder = $(this).sortable('toArray');
  					    $parentDiv = $(ui.item).parent('.sortWithinDiv');

						itemCounter=1;
						$parentDiv.find('table').each(function(){
						
							var newIndex = oldItemOrder[itemCounter-1]; //we need the old order here so the new elements retain DOM order
							newIndex = newIndex.replace("item","");
							
							//update table id
							tempName = $(this).attr('id');
							newName = tempName.replace(/\item\d+/gi, "item"+newIndex+"");
							$(this).attr('id', newName);
							
							//update item_dup button id
							$(this).find('button[id^=dup]').each(function(){
								tempName = $(this).attr('id');
								newName = tempName.replace(/dup\d+_/gi, "dup"+newIndex+"_");
								$(this).attr('id', newName);
							});
							
							//update item inputs
							$(this).find('.itemTR input').each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[\d+\]/gi, "["+newIndex+"]");
								$(this).attr('name', newName);
							});
							
							//update modifier and options
							$(this).find('.subHeaderTR input, .subHeaderTR select, .optionTR input').each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[item\d+\]/gi, "[item"+newIndex+"]");
								$(this).attr('name', newName);
							});
							
							itemCounter++;
						});
						
						//console.log("old:"+oldItemOrder+" new:"+currentItemOrder);
						
						//update item-option counts
						var itemCountArray = new Array();
						var itemCountActArray = new Array();
						
						var modCountArray = new Array();
						var modCountActArray = new Array();
						
						for(var i=0;i<currentItemOrder.length;i++)
						{
							itemCountArray[i] = $("#"+currentItemOrder[i]+"_optionCount").val();
							itemCountActArray[i] = $("#"+currentItemOrder[i]+"_optionCountAct").val();
							
							modCountArray[i] = $("#"+currentItemOrder[i]+"_modCount").val();
							modCountActArray[i] = $("#"+currentItemOrder[i]+"_modCountAct").val();
						}
						
						for(var i=0;i<oldItemOrder.length;i++) //the new values go to the old order. that's how the association is preserved.
						{
							$("#"+oldItemOrder[i]+"_optionCount").val(itemCountArray[i]);
							$("#"+oldItemOrder[i]+"_optionCountAct").val(itemCountActArray[i]);
							
							$("#"+oldItemOrder[i]+"_modCount").val(modCountArray[i]);
							$("#"+oldItemOrder[i]+"_modCountAct").val(modCountActArray[i]);
						}
					}
				});
				$(".dynamicDataTable").sortable({ 
					opacity: 0.5, 
					axis: "y", 
					cursor: "move", 
					containment: ".dynamicDataTable", 
					handle: ".sortSecHandle", 
					cancel: "input,textarea,select,option",
					placeholder: "sortable-placeholder-sec",
					tolerance: "pointer",
					items: "> .moveSec",
					revert: 100,
					delay: 100,
					update: function(event, ui) {
						//update all sections from the first one in the doc
						var section = 1 ;
						$('body').find('.moveSec').each(function(){
							//for each section
							$(this).find("input[name^=mSectionName]").attr('name','mSectionName['+section+']'); //update name
							$(this).find("input[name^=mSectionName]").alterClass('section*', "section"+section);
							
							$(this).find("button[id^=add_section]").attr('id','add_section'+section+''); //update add button
							$(this).find("button[id^=delete_section]").attr('id','delete_section'+section+''); //update delete button
							
							
							$(this).find("table.menuTable").alterClass('tablesection*', "tablesection"+section);   
							
							$(this).find("input[name^=iName]").each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
								$(this).attr('name', newName);
							});//update name
							
							$(this).find("input[name^=iDesc]").each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
								$(this).attr('name', newName);
							});//update name
							
							$(this).find("input[name^=iPrice]").each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
								$(this).attr('name', newName);
							});//update name
							
							$(this).find("input[name^=iQuan]").each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
								$(this).attr('name', newName);
							});//update name
							
							$(this).find("input[name^=iVisi]").each(function(){
								tempName = $(this).attr('name');
								newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
								$(this).attr('name', newName);
							});//update name 
							
							$(this).find("button[id^=dup]").each(function(){
								tempName = $(this).attr('id');
								newName = tempName.replace(/_section\d+/gi, "_section"+section);
								$(this).attr('id', newName);
							});//update duplicate button
							
							$(this).find("div").alterClass('firstItemDivsection*', "firstItemDivsection"+section); 
							
							section++;
						});
					}
				});
			}
		});
		</script>
		
		<?if((isset($_SESSION['venue_edit_on']) && $_SESSION['venue_edit_on'])){?>
			<script type="text/javascript">
				$(document).ready(function() {
					if($("#map").length > 0)
					{
						var myLatLng = new google.maps.LatLng(<?echo $_SESSION['venue_latitude'].", ".$_SESSION['venue_longitude'];?>);
						var marker = new google.maps.Marker({
							position: myLatLng,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: pinImage,
							title: '<?echo $_SESSION['venue_name'].", ".$_SESSION['venue_address'];?>'
						  });
						  map.setCenter(marker.position);
						  map.setZoom(15);
					}
				});
			</script>
		<?}?>
		
		<?if((isset($_SESSION['app1_edit_on']) && $_SESSION['app1_edit_on']) || (isset($procMem) && $procMem)){?>
			<script type="text/javascript">
				$(document).ready(function() {
					var content = $("#aHeading").val();
					if(content != '') $("#appHeading").html(content);
					
					var content = $("#aSubheading").val();
					if(content != '') $("#subHeading").html(content);
					
					<?if(isset($_SESSION['app_textColour'])){?>updateTextColour('<?echo $_SESSION['app_textColour']?>');<?}?>
					<?if(isset($_SESSION['app_buttonColour'])){?>updateButtonColour('<?echo $_SESSION['app_buttonColour']?>');<?}?>
					<?if(isset($_SESSION['app_buttonTextColour'])){?>updateButtonTextColour('<?echo $_SESSION['app_buttonTextColour']?>');<?}?>
					
					<?if(isset($_SESSION['app_logo']) && !empty($_SESSION['app_logo'])){?>
						content="<img src='<?echo $lPath.$_SESSION['app_logo']."_thumb.png";?>'/>";
						$('#appHeading').html(content);
					<?}?>
				});
			</script>
		<?}?>
		
		<?if(isset($_SESSION['app2_edit_on']) && $_SESSION['app2_edit_on']){?>
			<script type="text/javascript">
				$(document).ready(function() {
					var content = $("#vTitle").val();
					$("#venTitle").html(content);
					
					<?if(isset($_SESSION['app_button2Colour'])){?>updateButton2Colour('<?echo $_SESSION['app_button2Colour']?>');<?}?>
					<?if(isset($_SESSION['app_button2TextColour'])){?>updateButton2TextColour('<?echo $_SESSION['app_button2TextColour']?>');<?}?>
					
					<?if(isset($_SESSION['app_button3Colour'])){?>updateButton3Colour('<?echo $_SESSION['app_button3Colour']?>');<?}?>
					<?if(isset($_SESSION['app_button3TextColour'])){?>updateButton3TextColour('<?echo $_SESSION['app_button3TextColour']?>');<?}?>
				});
			</script>
		<?}?>
		</div> <!-- #wrap ends here -->
		<?if(isset($_SESSION['dashboardFlag']) && $_SESSION['dashboardFlag'])
		{
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/dashboard_footer.php');
			$_SESSION['dashboardFlag']=0;
		}
		else
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/regular_footer.php');?>
	
		<div id="termsM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/terms.php');?>
		</div>
		
		<div id="privM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/privacy.php');?>
		</div>
	</body>
</html>
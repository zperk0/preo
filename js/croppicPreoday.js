(function(window, document){
	Croppic.prototype.idItem = 0;
	Croppic.prototype.onRemoveCroppedImage = null;
	Croppic.prototype.onUploadProgress = null;
	Croppic.prototype.crop = function() {
		var that = this;
		
		if (that.options.onBeforeImgCrop) that.options.onBeforeImgCrop.call(that);
		
		that.cropControlsCrop.hide();
		that.showLoader();

		var cropData = {
				imgUrl:that.imgUrl,
				imgInitW:that.imgInitW,
				imgInitH:that.imgInitH,
				imgW:that.imgW,
				imgH:that.imgH,
				imgY1:Math.abs( parseInt( that.img.css('top') ) ),
				imgX1:Math.abs( parseInt( that.img.css('left') ) ),
				cropH:that.objH,
				cropW:that.objW
			};
		
		var formData = new FormData();

		for (var key in cropData) {
			if( cropData.hasOwnProperty(key) ) {
					formData.append( key , cropData[key] );
			}
		}
		
		for (var key in that.options.cropData) {
			if( that.options.cropData.hasOwnProperty(key) ) {
					formData.append( key , that.options.cropData[key] );
			}
		}

		$.ajax({
	        url: that.options.cropUrl,
	        data: formData,
	        context: document.body,
	        cache: false,
	        contentType: false,
	        processData: false,
	        type: 'POST'
			}).always(function(data){

				var valid = false;

				if ( typeof data === 'string' ) {
					response = jQuery.parseJSON(data);	
					valid = true;
				} else if ( data.status === 'success' || data.status === 'error' ) {
					response = data;
					valid = true;
				}
				
				if ( valid ) {
					if(response.status=='success'){
						
						that.imgEyecandy.hide();
						
						that.destroy();
						
						that.obj.append('<img class="croppedImg" src="'+response.url+'">');
						if(that.options.outputUrlId !== ''){	$('#'+that.options.outputUrlId).val(response.url);	}
						
						that.croppedImg = that.obj.find('.croppedImg');

						that.init();
						
						that.hideLoader();

					}
					if(response.status=='error'){
						that.obj.append('<p style="width:100%; height:100%;>'+response.message+'</p>">');
					}
					
					if (that.options.onAfterImgCrop) that.options.onAfterImgCrop.call(that);

			 	}
			});
	};
	Croppic.prototype.bindImgUploadControl = function() {
		
		var that = this;
		
		// CREATE UPLOAD IMG FORM
		var formHtml = '<form class="'+that.id+'_imgUploadForm" style="display: none; visibility: hidden;">  <input type="file" name="img">  </form>';
		that.outputDiv.append(formHtml);
		that.form = that.outputDiv.find('.'+that.id+'_imgUploadForm');
		
		that.imgUploadControl.off('click');
		that.imgUploadControl.on('click',function(){ 
			that.form.find('input[type="file"]').trigger('click');										
		});						
		
		if( !$.isEmptyObject(that.croppedImg)){
		
			that.cropControlRemoveCroppedImage.on('click',function(){ 

				if ( typeof that.onRemoveCroppedImage === 'function' ) {
					that.onRemoveCroppedImage.call(that);
				} 

				that.croppedImg.remove();
				$(this).hide();
				
				if( !$.isEmptyObject(that.defaultImg)){ 
					that.obj.append(that.defaultImg);
				}
				
				if(that.options.outputUrlId !== ''){	$('#'+that.options.outputUrlId).val('');	}
			
			});	
		
		}
										
		that.form.find('input[type="file"]').change(function(){
			
			if (that.options.onBeforeImgUpload) that.options.onBeforeImgUpload.call(that);
			
			that.showLoader();
			that.imgUploadControl.hide();
		
			var formData = new FormData(that.form[0]);
		
			for (var key in that.options.uploadData) {
				if( that.options.uploadData.hasOwnProperty(key) ) {
					formData.append( key , that.options.uploadData[key] );	
				}
			}

			var settings = {
                url: that.options.uploadUrl,
                data: formData,
                context: document.body,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST'
			};

			var xhr = new XMLHttpRequest();

			var transferComplete = function( data ){

				if ( typeof(data) === 'string' ) {
					var response = $.parseJSON(data);

					if(response.status=='success'){
						
						that.imgInitW = that.imgW = response.width;
						that.imgInitH = that.imgH = response.height;
						
						if(that.options.modal){	that.createModal(); }
						if( !$.isEmptyObject(that.croppedImg)){ that.croppedImg.remove(); }
						
						that.imgUrl=response.url;
						
						that.obj.append('<img src="'+response.url+'">');
						that.initCropper();
						
						that.hideLoader();

						if (that.options.onAfterImgUpload) that.options.onAfterImgUpload.call(that);
						
					}
					
					if(response.status=='error'){
						//that.obj.append('<p style="width:100%; height:100%; text-align:center; line-height:'+that.objH+'px;">'+response.message+'</p>');
						that.hideLoader();
						if (that.options.onAfterImgUpload) that.options.onAfterImgUpload.call({
							status: 'error',
							message: response.message
						});
						setTimeout( function(){ that.reset(); })
					}
				}
			};

	        if (that.onUploadProgress) {
                xhr.upload.addEventListener('progress', function(event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    that.onUploadProgress(event, position, total, percent);
                }, false);
	        }

			xhr.onreadystatechange = function (aEvt) {
			  if (xhr.readyState == 4) {
			     if(xhr.status == 200) {
			     	transferComplete( xhr.responseText );
			     }
			  }
			};
			xhr.addEventListener('load', transferComplete, false);
			xhr.open('POST', that.options.uploadUrl, true);
			xhr.send(formData);		        

		});
	
	};
}(window, document))
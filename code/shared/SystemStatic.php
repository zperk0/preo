<?php 

class SystemStatic {

	static function getUploadRoot( $folder ) {
		if(isset($_SERVER['PREO_UPLOAD_ROOT']))
			$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'];
		else
			$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/tmp/upload';

		return $PREO_UPLOAD_ROOT . $folder;
	}

}
<?php 

class SystemStatic {

	static function getUploadRoot( $folder ) {
		if(isset($_SERVER['PREO_UPLOAD_ROOT']))
			$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'];
		else
			$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/tmp/upload';

		return $PREO_UPLOAD_ROOT . $folder;
	}

	static function getRoot( ) {
		if(isset($_SERVER['PREO_UPLOAD_ROOT']))
			$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'];
		else
			$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'];

		return $PREO_UPLOAD_ROOT;
	}

}
<?php 

function compress_image($source_url, $destination_url, $quality) {
	$info = getimagesize($source_url);
 
	if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source_url);
	elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source_url);
	elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source_url);
	
	list($width, $height, $type, $attr) = getimagesize("$source_url");

	$resizeFlag = 0;
	
	$max_dimension = 1920; //width for landscape, height for portrait/square
	
	if($width > $height) //landscape
	{
		if($width > $max_dimension)
		{
			$gcd = GCD($width, $height);
			$widthGCD = $width/$gcd;
			$heightGCD = $height/$gcd;
			
			$newWidth = $max_dimension;
			$newHeight =(($newWidth * $heightGCD) / $widthGCD);
			
			// Resample the image.
			$tempImg = imagecreatetruecolor($newWidth, $newHeight) or die("Cant create temp image");
			imagecopyresampled($tempImg, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height) or die("Cant resize copy");
			
			$resizeFlag = 1;
		}
	}
	else //portrait or square
	{
		if($height > $max_dimension)
		{
			$gcd = GCD($width, $height);
			$widthGCD = $width/$gcd;
			$heightGCD = $height/$gcd;
			
			$newHeight = $max_dimension;
			$newWidth =(($newHeight * $widthGCD) / $heightGCD);
			
			// Resample the image.
			$tempImg = imagecreatetruecolor($newWidth, $newHeight) or die("Cant create temp image");
			imagecopyresampled($tempImg, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height) or die("Cant resize copy");
			
			$resizeFlag = 1;
		}
	}
	
	//save file
	if($resizeFlag)
		imagejpeg($tempImg, $destination_url, $quality);
	else
		imagejpeg($image, $destination_url, $quality);
 
	//destory temp
	if($resizeFlag)
		imagedestroy($tempImg); //destroy temp file
		
	imagedestroy($image); //destroy temp file
 
	return true;
}

function GCD($a, $b) {
	while ($b != 0)
	{
		$remainder = $a % $b;
		$a = $b;
		$b = $remainder;
	}
	return abs ($a);
}


function createThumbnail($source_url, $fileName, $destination_url, $newWidth, $newHeight, $quality)
{
  //Determine type
  $ext = strtolower(substr($fileName, strrpos($fileName, '.')+1)); //this gets jpg, png, etc (note no .)
  
  //echo" $source_url;  $ext; "; //if this debug output is on the frontend wont pick up the file
  
  // Open the original image.
  if($ext == "png")
  {
	$original = imagecreatefrompng("$source_url") or die("Error Opening original");
  }
  else
  {
	$original = imagecreatefromjpeg("$source_url") or die("Error Opening original");
  }
  
  list($width, $height, $type, $attr) = getimagesize("$source_url");
 
  // Resample the image.
  $tempImg = imagecreatetruecolor($newWidth, $newHeight) or die("Cant create temp image: $newWidth, $newHeight");
  if($ext == "png")
  {
	imagealphablending( $tempImg, false );
	imagesavealpha( $tempImg, true );
  }
  
  imagecopyresampled($tempImg, $original, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height) or die("Cant resize copy");
 
  // Save the image.
  if($ext == "png")
  {
	imagepng($tempImg, "$destination_url", 9) or die("Cant save image");
  }
  else
  {
	imagejpeg($tempImg, "$destination_url", $quality) or die("Cant save image");
  }
 
  // Clean up.
  imagedestroy($tempImg);
  return true;
}



function uploadFile($fileUploadID, $fileLocation, $folderMenu, $fileEXT, $fileMIME, $fileMIME2, $maxFileSize, $debug)
{
	if ( !is_array($fileUploadID['name']) ) {
		$_FILES['file'] = array(
			'name' => array( $fileUploadID['name'] ),
			'type' => array( $fileUploadID['type'] ),
			'tmp_name' => array( $fileUploadID['tmp_name'] ),
			'error' => array( $fileUploadID['error'] ),
			'size' => array( $fileUploadID['size'] )
		);
	} else {
		$_FILES["file"] = $fileUploadID;
	}

	$length = count($_FILES['file']['name']);

	$fileNames = [];

	$MAX_WIDTH = 600;
	$MAX_HEIGHT = 400;

	$LIMIT_WIDTH = 1000;

	for ($i=0; $i < $length; $i++) {
		$fileName = strtoupper(uniqid('', false));
		
		$tempFile = $_FILES["file"]['tmp_name'][$i];  // path of the temp file created by PHP during upload
		$imginfo_array = getimagesize($tempFile);   // returns a false if not a valid image file

		if(($imginfo_array !== false) && (($imginfo_array['mime'] == $fileMIME) || ( $imginfo_array['mime'] == $fileMIME2)) && ($_FILES["file"]["size"][$i] < $maxFileSize))
		{
			if ($_FILES["file"]["error"][$i] > 0)
			{
				$fileNames[] = array(
					"status" => 'error',
					"message" => "Return Code: " . $_FILES["file"]["error"][$i],
				);

				return $fileNames;
				if($debug) echo "Return Code: " . $_FILES["file"]["error"][$i] . "<br />";
				else return false;
			}
			else
			{
				if($debug) echo "Upload: " . $_FILES["file"]["name"][$i] . "<br />";
				if($debug) echo "New Name: " . $fileName . $fileEXT . "<br />";
				if($debug) echo "Type: " . $_FILES["file"]["type"][$i] . "<br />";
				if($debug) echo "Size: " . ($_FILES["file"]["size"][$i] / 1024) . " Kb<br />";
				if($debug) echo "Temp file: " . $_FILES["file"]["tmp_name"][$i] . "<br />";

				if (file_exists($fileLocation . $fileName . $fileEXT))
				{
					if($debug) echo $fileName . " already exists. ";
					else return false;
				}
				else
				{
					$image = array(
						'new' 	  => true,
						'cropped' => false
					);
					$fileEXT = strtolower(substr($_FILES["file"]["name"][$i], strrpos($_FILES["file"]["name"][$i], '.'))); //this gets .jpg,.png, etc
					$destination = $fileLocation . $fileName . $fileEXT;
					$destination_thumb = $fileLocation . $fileName. "_thumb" . $fileEXT;
					
					//create original->compressed to 99%
					//compress_image($_FILES["file"]["tmp_name"][$i], $destination, 99);
					
					//create thumbnail -> size reduced and compressed to 99%
					$width = $imginfo_array[0];  
					$height = $imginfo_array[1]; 
					
					if ( $width > $MAX_WIDTH ) {
						$image['cropped'] = true;
						$image['width'] = $width;
						$image['height'] = $height;

						if ( $width > $LIMIT_WIDTH ) {
							$image['width'] = 800;
							$image['height'] = 600;
							createThumbnail($_FILES["file"]["tmp_name"][$i], $_FILES["file"]["name"][$i], $fileLocation . "item_".$fileName. $fileEXT, 800, 600, 99);
						} else {
							move_uploaded_file($_FILES['file']['tmp_name'][$i], $fileLocation . "item_".$fileName. $fileEXT);
						}
					} else {
						move_uploaded_file($_FILES['file']['tmp_name'][$i], $fileLocation . "item_".$fileName. $fileEXT);
					}
					
					//delete destination file
					//unlink($destination);
					
					//destory temp
					imagedestroy($_FILES["file"]["tmp_name"][$i]); //destroy temp file
					
					if($debug) echo "Stored in: " . $destination;
					if($debug) echo "Thumbnail Stored in: " . $destination_thumb;
					
					$image['status'] = 'success';
					$image['url'] = $folderMenu . "/item_".$fileName. $fileEXT;
					$fileNames[] = $image;
					//return true;
				}
			}
			//return true;
		}
		else
		{
			$fileNames[] = array(
				"status" => 'error',
				"message" => 'Invalid file',
			);
		}

	}

	return $fileNames;
}

function cropImage( $src, $dest, $sourceFolder, $destFolder, $imgInitW, $imgInitH, $imgW, $imgH, $imgY1, $imgX1, $cropW, $cropH, $quality = 90 ) {
	$quality = 90;

	$MAX_WIDTH = 600;
	$MAX_HEIGHT = 400;

	$imginfo_array = getimagesize($src);   // returns a false if not a valid image file

	$width = $imginfo_array[0];  
	$height = $imginfo_array[1]; 	

	if ( $width < $MAX_WIDTH ) {
		return array(array(
			"status" => 'success',
			"url" => $sourceFolder
		  ));
	}

	$what = getimagesize($src);
	switch(strtolower($what['mime']))
	{
	    case 'image/png':
	        $img_r = imagecreatefrompng($src);
			$source_image = imagecreatefrompng($src);
			$type = '.png';
	        break;
	    case 'image/jpeg':
	        $img_r = imagecreatefromjpeg($src);
			$source_image = imagecreatefromjpeg($src);
			$type = '.jpeg';
	        break;
	    default: die('image type not supported');
	}

	$resizedImage = imagecreatetruecolor($imgW, $imgH);
	imagecopyresampled($resizedImage, $source_image, 0, 0, 0, 0, $imgW, 
				$imgH, $imgInitW, $imgInitH);	
	
	
	$dest_image = imagecreatetruecolor($cropW, $cropH);
	imagecopyresampled($dest_image, $resizedImage, 0, 0, $imgX1, $imgY1, $cropW, 
				$cropH, $cropW, $cropH);

    if($type == ".png")
    {
	  imagepng($dest_image, $dest, 9) or die(json_encode( array(
															'status' => 'error',
															'message' => 'Error in save file'
													)));
    }
    else
    {
	  imagejpeg($dest_image, $dest, $quality) or die(json_encode( array(
															'status' => 'error',
															'message' => 'Error in save file'
													)));
    }

	return array(array(
			"status" => 'success',
			"url" => $destFolder
		  ));
}

?>
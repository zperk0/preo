<?php session_start();

function compress_image($source_url, $destination_url, $quality) {
	$info = getimagesize($source_url);
 
	if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source_url);
	elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source_url);
	elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source_url);
	
	list($width, $height, $type, $attr) = getimagesize("$source_url");

	$resizeFlag = 0;
	
	$max_dimension = 1024; //width for landscape, height for portrait/square
	
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



function uploadFile($fileUploadID, $fileLocation, $fileName, $fileEXT, $fileMIME, $fileMIME2, $maxFileSize, $debug)
{
	$_FILES["file"] = $fileUploadID;
	
	$tempFile = $_FILES["file"]['tmp_name'];  // path of the temp file created by PHP during upload
	$imginfo_array = getimagesize($tempFile);   // returns a false if not a valid image file

	if(($imginfo_array !== false) && (($imginfo_array['mime'] == $fileMIME) || ( $imginfo_array['mime'] == $fileMIME2)) && ($_FILES["file"]["size"] < $maxFileSize))
	{
		if ($_FILES["file"]["error"] > 0)
		{
			if($debug) echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
			else return false;
		}
		else
		{
			if($debug) echo "Upload: " . $_FILES["file"]["name"] . "<br />";
			if($debug) echo "New Name: " . $fileName . $fileEXT . "<br />";
			if($debug) echo "Type: " . $_FILES["file"]["type"] . "<br />";
			if($debug) echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
			if($debug) echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

			if (file_exists($fileLocation . $fileName . $fileEXT))
			{
				if($debug) echo $fileName . " already exists. ";
				else return false;
			}
			else
			{
				$fileEXT = strtolower(substr($_FILES["file"]["name"], strrpos($_FILES["file"]["name"], '.'))); //this gets .jpg,.png, etc
				$destination = $fileLocation . $fileName . $fileEXT;
				$destination_thumb = $fileLocation . $fileName. "_thumb" . $fileEXT;
				
				//create original->compressed to 99%
				compress_image($_FILES["file"]["tmp_name"], $destination, 80);
				
				//create thumbnail -> size reduced and compressed to 85%
				$width = $imginfo_array[0];  
				$height = $imginfo_array[1]; 
				
				if($width >= $height) //landscape
				{
					$newWidth = 100;
					
					//(original height / original width) x new width = new height
					$newHeight = round((($height) / ($width)) * $newWidth,0);
				}
				else //portrait
				{
					$newHeight = 100;
				
					//newheight / (original height / original width) = new width
					$newWidth = round($newHeight/($height / $width),0);
				}

				createThumbnail($_FILES["file"]["tmp_name"], $_FILES["file"]["name"], $destination_thumb, $newWidth, $newHeight, 99);
				
				//create main image
				if($ext == "png")
				{
					//disabled$im = imagecreatefrompng($destination_thumb); //black substitutes transparency
				}
				else
				{
					//disabled$im = imagecreatefromjpeg($destination_thumb);
				}
				
				//delete destination file
				unlink($destination);
				
				//destory temp
				imagedestroy($_FILES["file"]["tmp_name"]); //destroy temp file
				
				if($debug) echo "Stored in: " . $destination;
				if($debug) echo "Thumbnail Stored in: " . $destination_thumb;
				
				return true;
			}
		}
		return true;
	}
	else
	{
		if($debug) echo "Invalid file";
		return false;
	}
	
	return false;
}

?>
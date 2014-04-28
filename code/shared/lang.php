<?php //works on Linux and Windows!

$lang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'en';

//$lang="de"; //debug or force german

switch ($lang)
{
	case 'cs':
		$locale = 'czech';
		$strings = 'cs_CZ';
		break;

	case 'en':
		$locale = 'english';
		$strings = 'en_US';
		break;

	case 'de':
		$locale = 'german';
		$strings = 'de_DE';
		break;

	case 'hu':
		$locale = 'hungarian';
		$strings = 'hu_HU';
		break;

	case 'ru':
		$locale = 'russian';
		$strings = 'ru_RU';
		break;
	
	default:
		$locale = 'english';
		$strings = 'en_US';
		break;
}

putenv("LANGUAGE=$strings");
putenv("LC_ALL=$locale");
setlocale(LC_ALL, $locale);
//echo setlocale(LC_ALL, 0); //debug

$domain = 'messages';


//create a symlink on locale named nocache (cd locale && ln -s . nocache) and uconmment the following line to clear gettext cache
//bindtextdomain($domain, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/nocache');
bindtextdomain($domain, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/locale");
bind_textdomain_codeset($domain, "UTF-8");
textdomain($domain);


/* BACKUP WORKING DEFAULT */
/*

//required PHP extensions
//php_gettext
//php_intl

//required PHP settings
//short open tag

//required Tools
//POedit to create messages.po and messages.mo files. Make sure you give the root folder as starting location to look for _(..)s in all of the code

//locale structure
// ./locale/en_US/LC_MESSAGES/messages.po,./locale/en_US/LC_MESSAGES/messages.mo | ./locale/en_DE/LC_MESSAGES/messages.po,./locale/en_DE/LC_MESSAGES/messages.mo, ...

//Link the locale to $_SESSION but remember that on logout the value is saved to the new session

$lang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'en';

//$lang="de"; //debug or force german

switch ($lang)
{
	case 'cs':
		$locale = 'czech';
		$strings = 'cs_CZ';
		break;

	case 'en':
		$locale = 'english';
		$strings = 'en_US';
		break;

	case 'de':
		$locale = 'german';
		$strings = 'de_DE';
		break;

	case 'hu':
		$locale = 'hungarian';
		$strings = 'hu_HU';
		break;

	case 'ru':
		$locale = 'russian';
		$strings = 'ru_RU';
		break;
	
	default:
		$locale = 'english';
		$strings = 'en_US';
		break;
}

putenv("LANGUAGE=$strings");
putenv("LC_ALL=$locale");
setlocale(LC_ALL, $locale);
//echo setlocale(LC_ALL, 0); //debug

$domain = 'messages';
bindtextdomain($domain, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/locale");
bind_textdomain_codeset($domain, "UTF-8");
textdomain($domain);

*/
?>
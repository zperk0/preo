<?php

session_start();

$cdnRoot = "https://cdn-demo.preoday.com/";
$ordersapp = "https://orders-demo.preoday.com/";
$weborders = "https://menus-v2-demo.preoday.com/";
$webordersEdit = "https://menus-v2-demo.preoday.com/";
$webappV1 = "https://app-demo.preoday.com/";
$resetPasswordLink = "https://app-demo.preoday.com/reset";
$analytics = '';
$sessionId = session_id();
$rollbarEnv = null;
$rollbarTokenClient = '';
$domain = 'preoday';
$isChannel = false;
$FAVICON_ICO = '/favicon.ico';

if (strpos($_SERVER['REQUEST_URI'], '/channel') === 0) {
    $isChannel = true;
}

if (isset($_SERVER["PREO_CDN"]))
{
    $cdnRoot = $_SERVER["PREO_CDN"];
}

if (isset($_SERVER["PREO_WEBORDERS"]))
{
    $weborders = $_SERVER["PREO_WEBORDERS"];
}

if (isset($_SERVER["PREO_WEBORDERS_EDIT"]))
{
    $webordersEdit = $_SERVER["PREO_WEBORDERS_EDIT"];
}

if (isset($_SERVER["PREO_ORDERSAPP"]))
{
    $ordersapp = $_SERVER["PREO_ORDERSAPP"];
}

if (isset($_SERVER["PREO_WEBAPP_V1"]))
{
    $webappV1 = $_SERVER["PREO_WEBAPP_V1"];
}

if (isset($_SERVER["PREO_RESET_PASSWORD"]))
{
    $resetPasswordLink = $_SERVER["PREO_RESET_PASSWORD"];
}

if (isset($_SERVER["PREO_ROLLBAR_ENV"]))
{
    $rollbarEnv = $_SERVER["PREO_ROLLBAR_ENV"];
}

if (isset($_SERVER["PREO_ROLLBAR_POST_CLIENT"]))
{
    $rollbarTokenClient = $_SERVER["PREO_ROLLBAR_POST_CLIENT"];
}

if (isset($_SERVER["PREO_DOMAIN"]))
{
    $domain = $_SERVER["PREO_DOMAIN"];
}

// SET domain favicon
$favicon = $cdnRoot . 'images/' . $domain . $FAVICON_ICO;

if (isset($_SERVER["PREO_PWA_ANALYTICS_UA"])){
    $analytics .=" <script>";
    $analytics .="   window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;";
    $analytics .="   !function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){";
    $analytics .="     (A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),";
    $analytics .="     r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)";
    $analytics .="   }(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
    $analytics .="   ga('create', '".$_SERVER['PREO_PWO_ANALYTICS_UA']."');";
    $analytics .="   ga('send', 'pageview');";
    $analytics .=" </script>";
}

$pathIndexHTML = './index.html';
$contentsIndexHTML = file_get_contents($pathIndexHTML);

$overrides = "<script>";
$overrides .= "window._PREO_DATA={};";
$overrides .= "window._PREO_DATA._CDNROOT='$cdnRoot';";
$overrides .= "window._PREO_DATA._ORDERSAPP='$ordersapp';";
$overrides .= "window._PREO_DATA._WEBORDERS='$weborders';";
$overrides .= "window._PREO_DATA._WEBORDERS_EDIT='$webordersEdit';";
$overrides .= "window._PREO_DATA._WEBAPP_V1='$webappV1';";
$overrides .= "window._PREO_DATA._RESET_PASSWORD='$resetPasswordLink';";
$overrides .= "window._PREO_DATA._SESSION='$sessionId';";
$overrides .= "window._PREO_DATA._ROLLBAR_ENV='$rollbarEnv';";
$overrides .= "window._PREO_DATA._ROLLBAR_CLIENT_TOKEN='$rollbarTokenClient';";
$overrides .= "window._PREO_DATA._DOMAIN='$domain';";
$overrides .= "window._PREO_DATA._IS_CHANNEL=" . ($isChannel ? 1 : 0) . ";";
$overrides .= "</script>";

$contentsIndexHTML = str_replace('@@FAVICON', $favicon, $contentsIndexHTML);
$contentsIndexHTML = str_replace('<!-- @@OVERRIDES -->', $overrides, $contentsIndexHTML);
$contentsIndexHTML = str_replace('<!-- @@ANALYTICS -->', $analytics, $contentsIndexHTML);
$contentsIndexHTML = str_replace('cdn/', $cdnRoot, $contentsIndexHTML);

// CSS Override Styles
$cssOverridePath = './overrides/'. $domain . '/override.css';
if (file_exists($cssOverridePath)) {
    $contentsCssOverride = file_get_contents($cssOverridePath);
    $tempOverride = '<style type="text/css">'. $contentsCssOverride. '</style>';
    $contentsIndexHTML = str_replace('<!-- @@CSSOVERRIDE -->', $tempOverride, $contentsIndexHTML);
}

echo $contentsIndexHTML;

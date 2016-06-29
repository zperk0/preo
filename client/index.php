<?php
session_start();

$cdnRoot = "https://cdn-demo.preoday.com/";
$analytics = '';

if(isset($_SERVER["PREO_CDN"]))
{
    $cdnRoot = $_SERVER["PREO_CDN"];
}

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
$overrides .= "</script>";

$contentsIndexHTML = str_replace("<!-- @@OVERRIDES -->",$overrides,$contentsIndexHTML);
$contentsIndexHTML = str_replace("<!-- @@ANALYTICS -->",$analytics,$contentsIndexHTML);
$contentsIndexHTML = str_replace("cdn/",$cdnRoot,$contentsIndexHTML);

echo $contentsIndexHTML;


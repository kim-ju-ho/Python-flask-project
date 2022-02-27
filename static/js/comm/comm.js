$(document).ready(function () {
    set_temp();

});
function nav_home(){

    window.location='/';
}
function nav_photo() {
    window.location="photo";
}
function nav_bbs(){
    window.location="bbs";
}
function nav_login(){
    window.location="login";
}

function signUp(){
    window.location="signUp";
}

function write_bbs(){
    window.location="write_bbs";
}

function nav_logout(){
        $.ajax({
        type: "GET",
        url: "/logout",
        data: {},
        success: function (response) {
            nav_home();
        }
    })
}
function set_temp() {
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
        data: {},
        success: function (response) {
            $('#temp').text(response['temp'])
        }
    })
}


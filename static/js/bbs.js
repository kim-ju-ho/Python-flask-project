$(function (){

    function bbs(){
        $.ajax({
            type: "POST",
            url: "/bbs",
            data: {
                'userName': loginName.val(),
                'userId': loginId.val(),
                'userPwd': loginPwd.val()
            },
            success: function (response) {
                alert('가입되었습니다.');
                nav_login();
            }
        })
    }
});
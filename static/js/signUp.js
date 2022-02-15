$(function () {
    let loginName = $('#floatingName')
    let loginId = $('#floatingInput');
    let loginPwd = $('#floatingPassword');
    let confirmPwd = $('#floatingConfirmPassword');
    let chkDupResult =$('#chkDupResult')

    loginId.keyup(function () {
        if (loginId.val().length < 4) {
            $('#chkId').css('display', 'block')
        } else {
            $('#chkId').css('display', 'none')
        }
        $.ajax({
            type: "POST",
            url: "/chk_Id_Dup",
            data: {
                'userId': loginId.val()
            },
            success: function (response) {

                if(response['msg'] === true){
                    $('#chkIdDup').css('display', 'none')
                    chkDupResult.val("true")
                }else{
                    $('#chkIdDup').css('display', 'block')
                    chkDupResult.val("false")
                }
            }
        });

    });

    loginPwd.keyup(function () {
        if (loginPwd.val().length < 4) {
            $('#chkPwd').css('display', 'block')
        } else {
            $('#chkPwd').css('display', 'none')
        }
    });

    confirmPwd.keyup(function () {
        if (confirmPwd.val() != loginPwd.val()) {
            $('#chkConfirmPwd').css('display', 'block')
        } else {
            $('#chkConfirmPwd').css('display', 'none')
        }
    });


    function validation() {
        let valid = true;
        if (loginId.val().length < 4) {
            valid = false;
        }
        if (loginPwd.val().length < 4) {
            valid = false;
        }
        if (loginPwd.val() != confirmPwd.val()) {
            valid = false;
        }
        if(chkDupResult.val() === 'false'){
            valid =false;
        }

        return valid;
    }


    function login() {
        if (validation() === false) {
            alert('아이디 또는 비밀번호를 확인해주세요!')
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/signup_usr",
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

    $('#signUp').bind("click", login);


});
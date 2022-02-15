$(function () {
    let loginId = $('#floatingInput');
    let loginPwd = $('#floatingPassword');

    loginId.keyup(function () {
        if (loginId.val().length < 4) {
            $('#chkId').css('display', 'block')
        } else {
            $('#chkId').css('display', 'none')
        }
    });

    loginPwd.keyup(function () {
        if (loginPwd.val().length < 4) {
            $('#chkPwd').css('display', 'block')
        } else {
            $('#chkPwd').css('display', 'none')
        }
    });



    function validation() {

        let valid = true;


        if (loginId.val().length < 4) {
            valid = false;
        }
        if (loginId.val().length < 4) {
            valid = false;
        }
        return valid;
    }


    function login() {
        if (validation() === false) {
            alert('아이디 또는 비밀번호를 확인해주세요!')
            return false;
        }

        $.ajax({
            type: "GET",
            url: "/signIn_usr",
            data: {
                'userId': loginId.val(),
                'userPwd': loginPwd.val()
            },
            success: function (response) {
                console.log(response['status']);
                console.log(response['session']);
                if(response['status'] =="True"){
                    nav_home();
                }else{
                    alert("아이디 또는 비밀번호를 확인해주세요");
                    loginId.val("");
                    loginPwd.val("")
                    
                }
            }
        });


    }


    $('#signIn').bind("click", login);


});

    function enroll_bbs(){
        let bbs = {
            title : $('#title').val(),
            writer : $('#writer').val(),
            content : $('#content').val()
        }
        $.ajax({
            type: "POST",
            url: "/enroll_bbs",
            data: {
                title : bbs.title,
                writer : bbs.writer,
                content : bbs.content
            },
            success: function (response) {
                console.log(response)
            }
        })
    }
    $('#writeBtn').on('click',enroll_bbs());
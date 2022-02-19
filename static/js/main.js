$(document).ready(function () {
    set_temp();
    show_comment();
});
function save_comment() {
    let name = $('#name').val();
    let comment = $('#comment').val();
    $.ajax({
        type: 'POST',
        url: '/homework',
        data: {
            'name': name,
            'comment': comment
        },
        success: function (response) {

            window.location.reload()
        }
    })
}

function show_comment() {
    $.ajax({
        type: "GET",
        url: "/homework",
        data: {},
        success: function (response) {
            console.log(response)
            let rows = response['msg'];
            for (let i = rows.length-1; i >-1; i--) {
                let name = rows[i]['name'];
                let comment = rows[i]['comment'];
                let commentNo = rows[i]['commentNo']
                let commentDiv = "comment"+commentNo
                let temp_html = `<div class="card" id="${commentDiv}">
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <p>${comment}</p>
                                            <footer class="blockquote-footer">${name}</footer>
                                        </blockquote>
                                        <button type="submit" class="btn btn-outline-dark" id="deleteBtn" onclick="deleteComment(${commentNo})">Delete</button>
                                        <a class="btn btn-outline-dark" id="modifyBtn" data-bs-toggle="modal" href="#exampleModalToggle" role="button"onclick="modifyForm(${name},${comment},${commentNo})">Modify</a>
                                    </div>
                                </div>`;
                $('#comment-list').append(temp_html);

            }

         }
    });
}

function modifyForm(name,comment,count){

    let commSection   =$('#comment'+count);
    let commentInfo   ={
        commentName : $('#modifyName'),
        comment     : $('#modifyComment')
    }
    commentInfo.commentName.val(name);
    commentInfo.comment.val(comment);

}

function deleteComment(count){
    $.ajax({
        type: "POST",
        url: "/deleteComment",
        data: {'commentNo': count},
        success: function (response) {
         window.location.reload();

        }
    });
}




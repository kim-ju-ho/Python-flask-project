from flask import Flask, render_template, request, jsonify, session, url_for

from werkzeug.utils import secure_filename, redirect
from flask_bcrypt import Bcrypt

app = Flask(__name__)
from pymongo import MongoClient
import certifi

# -----------------------------------------------------------------
# secret key (session)
# -----------------------------------------------------------------
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
# -----------------------------------------------------------------
# 암호화
# -----------------------------------------------------------------
bcrypt = Bcrypt(app)
# -----------------------------------------------------------------
# DB연결
# -----------------------------------------------------------------
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.d1kjh.mongodb.net/Cluster0?retryWrites=true&w=majority',
                     tlsCAFile=ca)
db = client.dbsparta
file_path = '/home/ubuntu/sparta/static/upload/'


# -----------------------------------------------------------------
# 페이지 이동
# -----------------------------------------------------------------
@app.route('/')
def home():
    return render_template('index.html')


@app.route("/photo")
def photo():
    return render_template('photo.html')


@app.route("/login")
def login():
    return render_template('login.html')


@app.route("/signUp")
def signup():
    return render_template('signUp.html')


# -----------------------------------------------------------------
# main
# -----------------------------------------------------------------
def auth():
    session_chk = False;
    session_userid = session['userId']
    if session_userid is None:
        return session_chk
    else:
        session_chk = True
        return session_chk


# -----------------------------------------------------------------
# main
# -----------------------------------------------------------------
# COMMENT INSERT
@app.route("/homework", methods=["POST"])
def homework_post():
    name_receive = request.form['name']
    comment_receive = request.form['comment']
    max_comment = db.homework.find_one(sort=[("commentNo", -1)])
    count = max_comment['commentNo'] + 1

    doc = {
        'commentNo': count,
        'name': name_receive,
        'comment': comment_receive
    }

    db.homework.insert_one(doc)
    return jsonify({'msg': 'comment 등록 완료'})


# COMMENT LIST
@app.route("/homework", methods=["GET"])
def homework_get():
    comment_list = list(db.homework.find({}, {"_id": False}))
    return jsonify({'msg': comment_list})


# COMMENT 삭제
@app.route("/deleteComment", methods=["POST"])
def delete_comment():
    comment = request.form['commentNo']
    db.homework.delete_one({'commentNo': int(comment)})
    return jsonify({'msg': '삭제 성공'})


# COMMENT 수정
@app.route("/modifyComment", methods=["POST"])
def modify_comment():
    comment_name = request.form['commentName']
    comment = request.form['comment']
    comment_no = request.form['commentNo']
    print(comment_no, comment_name, comment)

    db.homework.update_one({'commentNo': int(comment_no)}, {'$set': {'name': comment_name, 'comment': comment}})
    return jsonify({'msg': '삭제 성공'})


# -----------------------------------------------------------------
# photo
# -----------------------------------------------------------------

@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if not auth():
        login();
    else:
        if request.method == 'POST':
            img_file = request.files['file']
            title = request.form['title']
            comment = request.form['comment']
            file_name = secure_filename(img_file.filename)

            # 파일 업로드
            img_file.save(file_path + file_name)
            # DB 데이터 포맷
            doc = {
                'comment': comment,
                'title': title,
                'file_name': file_name
            }
            # DB insert
            db.file.insert_one(doc)
    return redirect('photo')


@app.route("/showphoto", methods=["GET"])
def photo_get():
    photo_list = list(db.file.find({}, {'_id': False}))
    return jsonify({'photo': photo_list})


# -----------------------------------------------------------------
# login
# -----------------------------------------------------------------+
@app.route("/signIn_usr", methods=["GET"])
def login_get():
    if request.method == 'GET':
        user_id = request.args.get('userId', type=str)
        user_pwd = request.args.get('userPwd', type=str)
        user_info = db.user.find_one({'userId': user_id})
        chk_pwd = bcrypt.check_password_hash(user_info['userPwd'], user_pwd)
        if chk_pwd:
            session['userId'] = user_info['userId']
            session['userName'] = user_info['userName']
        else:
            return "False"

    return jsonify({'session': session, 'status': "True"})


@app.route("/logout", methods=["GET"])
def logout():
    session.pop('userId')
    return jsonify({'msg': 'logout'})


@app.route("/signup_usr", methods=["POST"])
def signup_usr():
    user_name = request.form.get('userName', type=str)
    user_id = request.form.get('userId', type=str)
    user_pwd = request.form.get('userPwd', type=str)

    pw_hash = bcrypt.generate_password_hash(user_pwd).decode('utf-8')
    doc = {
        'userName': user_name,
        'userId': user_id,
        'userPwd': pw_hash,
    }

    db.user.insert_one(doc)
    return jsonify({'msg': '가입완료!'})


@app.route("/chk_Id_Dup", methods=["POST"])
def chk_id_dup():
    chk_id = False
    user_id = request.form.get('userId', type=str)
    user_info = db.user.find_one({'userId': user_id})
    if user_info is None:
        chk_id = True

    return jsonify({'msg': chk_id})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

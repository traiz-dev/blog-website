from sqlite3 import IntegrityError
from model import Post, User
from config import app, db
from flask import request, jsonify
import datetime
import bcrypt

# -------------------------------------------------------------- POST API'S --------------------------------------------------------------
@app.route('/posts', methods=["GET"])
def get_posts():
    posts = Post.query.all()
    posts_json = list(map(lambda x: x.to_json(), posts))
    
    return jsonify({"posts": posts_json}), 200

@app.route('/post/<int:post_id>', methods=["GET"])
def get_post(post_id):
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({"message": "There was no post found!"}), 404
    
    return jsonify({"post": post.to_json()}), 200

@app.route('/create_post', methods=["POST"])
def create_post():
    title = request.json.get('title')
    content = request.json.get('content')
    created_at = datetime.datetime.now()
    
    if not title or not content:
        return jsonify({"message": "You need to include title and content in order to create new post!"}), 400
    
    new_post = Post(title = title, content = content, created_at = created_at)
    try:
        db.session.add(new_post)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)})
    
    return jsonify({"message": "Post created successfully!"}), 201

@app.route('/delete_post/<int:post_id>', methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({"message": "No post found!"}), 404
    
    try:
        db.session.delete(post)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Post deleted successfully!"}), 200

@app.route('/edit_post/<int:post_id>', methods=["PATCH"])
def edit_post(post_id):
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({"message": "No post found!"}), 404
    
    data = request.json
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    
    db.session.commit()
    
    return jsonify({"message": "Post edited successfully!"}), 200

# -------------------------------------------------------------- USER API'S --------------------------------------------------------------
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_json = list(map(lambda x: x.to_json(), users))
    
    if not users:
        return jsonify({"message": "No users found!"}), 404
    
    return jsonify({"users": users_json})

@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    if not email or not username or not password:
        return jsonify({"message": "You need to include username, email and password in order to create account!"}), 400
    
    new_user = User(email = email, username = username, password = hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Username or email already exists. Please choose another one."}), 409
    except Exception as e:
        return jsonify({"message": "There was an error " + str(e)}), 500
    
    return jsonify({"message": "User registered successfully!"}), 201
    
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    if not username or not password:
        return jsonify({"message": "You need to include username and password in order to login!"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Login failed! Wrong username or password!"}), 404
    
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"message": "No user found!"}), 404
    
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "There was an error while deleting user!" + str(e)}), 400
    
    return jsonify({"message": "User deleted successfully!"}), 200
        
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=3001)
from model import Post
from config import app, db
from flask import request, jsonify
import datetime

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
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True, port=3001)
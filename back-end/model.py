from config import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False)
    content = db.Column(db.String(300), unique=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    
    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'createdAt': self.created_at
        }
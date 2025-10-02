
from flask import Flask, jsonify
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)

def random_task():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))

def generate_random_todos(n=5):
    return [
        {'id': i+1, 'task': random_task(), 'done': random.choice([True, False])}
        for i in range(n)
    ]

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(generate_random_todos())

@app.route('/health', methods=['GET'])
def health():
    return 'OK', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

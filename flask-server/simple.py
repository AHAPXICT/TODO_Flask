from flask import Flask


app = Flask(__name__)


@app.route('/home/posts/iakas-notatka-1612103654')
def index():
    return "<h1>Hello Vasia</h1>"


if __name__ == '__main__':
    app.run()

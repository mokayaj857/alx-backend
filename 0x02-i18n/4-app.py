#!/usr/bin/env python3

from flask import Flask, render_template, request
from flask_babel import Babel, _

app = Flask(__name__)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    locale = request.args.get("locale")
    if locale in app.config["LANGUAGES"]:
        return locale

    return app.config["BABEL_DEFAULT_LOCALE"]


@app.route("/")
def index():
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run(debug=True)

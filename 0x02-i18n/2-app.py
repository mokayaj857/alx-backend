from flask import request
from . import babel, app


def get_locale():
    """Get locale"""
    return request.accept_languages.best_match(app.config["LANGUAGES"])

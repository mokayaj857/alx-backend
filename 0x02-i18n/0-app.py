#!/usr/bin/env python3
from flask import render_template
from . import app

app.route("/")


def hello():
    return render_template("templates/0-index.html")

# Blueprint For Justice
# Copyright (C) 2022 Anish Sinha
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# you should have received a copy of the GNU General Public License
# along with this program.  If not, see http://www.gnu.org/licenses/.
#

import os
from flask import Flask
from dotenv import load_dotenv
from app.middleware.prefix import PrefixMiddleware
import sqlite3

workdir = os.path.dirname(os.path.abspath(__file__))
load_dotenv()


def get_conn():
    conn = sqlite3.connect(f"{workdir}/../db.sqlite3", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def create_app():
    app = Flask(__name__)
    from app.resources.controllers import module as resource_module
    from app.mail.controllers import module as mail_module

    app.register_blueprint(resource_module)
    app.register_blueprint(mail_module)
    app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix="/api")
    return app

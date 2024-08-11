#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from models.user import User
from os import environ
from flask import Flask, render_template
import uuid 
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/1-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    places_with_users = []
    for place in places:
        user = storage.get(User, place.user_id)
        places_with_users.append((place, user))

    return render_template('1-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=st_ct,
                           amenities=amenities,
                           places=places_with_users)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)

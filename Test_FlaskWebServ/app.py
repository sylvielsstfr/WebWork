from flask import Flask, render_template, request, g
import sqlite3

app = Flask(__name__)
DATABASE = "database.db"

# Fonction pour se connecter à la base SQLite
def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row  # Permet d’accéder aux colonnes par leur nom
    return db

# Page d'accueil qui affiche les utilisateurs
@app.route("/")
def index():
    db = get_db()
    cursor = db.execute("SELECT * FROM users")
    users = cursor.fetchall()
    return render_template("index.html", users=users)

# Route pour ajouter un utilisateur (via formulaire ou API)
@app.route("/add", methods=["POST"])
def add_user():
    name = request.form["name"]
    age = request.form["age"]
    db = get_db()
    db.execute("INSERT INTO users (name, age) VALUES (?, ?)", (name, age))
    db.commit()
    return "Utilisateur ajouté avec succès !"

# Fermeture de la connexion DB après chaque requête
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()

if __name__ == "__main__":
    app.run(debug=True)

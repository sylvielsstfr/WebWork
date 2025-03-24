import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)
""")

# Ajouter quelques utilisateurs pour tester
cursor.executemany("INSERT INTO users (name, age) VALUES (?, ?)", [
    ("Alice", 25),
    ("Bob", 30),
    ("Charlie", 22)
])

conn.commit()
conn.close()
print("Base de données créée avec succès !")

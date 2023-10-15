import psycopg2
import csv

# Conecta a la base de datos PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    port=5433,
    database="spotify",
    user="admin",
    password="admin123"
)

# Abre un cursor para realizar operaciones en la base de datos
cur = conn.cursor()

# Lee los datos desde el archivo CSV
with open('csv_files/sp_release.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Omitir la fila de encabezado
    for row in reader:
        # Desempaqueta los valores de la fila
        release_id = row[0]
        release_title = row[1]
        release_date = row[2]
        upc = row[3]
        popularity = row[4]
        total_tracks = row[5]
        album_type = row[6]
        release_img = row[7]
        label_name = row[8]
        updated_on = row[9]

        if upc == '':

            upc = 2234567890123

        print(release_id, release_title, release_date, upc, popularity, total_tracks, album_type, release_img, label_name, updated_on)

        # Inserta datos en la tabla sp_release
        sql = "INSERT INTO sp_release (release_id, release_title, release_date, upc, popularity, total_tracks, album_type, release_img, label_name, updated_on) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        data = (release_id, release_title, release_date, upc, popularity, total_tracks, album_type, release_img, label_name, updated_on)
        cur.execute(sql, data)

# Confirma la transacción
conn.commit()

# Cierra el cursor y la conexión
cur.close()
conn.close()

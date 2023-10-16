import psycopg2
import csv

MAX_DATA_ROWS = 100000

# Conecta a la base de datos PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    port=5433,
    database="spotify",
    user="admin",
    password="admin123"
)

cur = conn.cursor()

sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"

cur.execute(sql)

table_names = [row[0] for row in cur.fetchall()][1:]

def check_data_in_table(table_name, conn):

    # Abre un cursor para realizar operaciones en la base de datos
    cur = conn.cursor()

    # Define la consulta SQL para contar los registros en la tabla
    sql = f"SELECT COUNT(*) FROM {table_name};"

    try:
        # Ejecuta la consulta
        cur.execute(sql)

        # Recupera el resultado
        result = cur.fetchone()

        # Cierra el cursor
        cur.close()

        # Si el recuento es mayor que cero, hay datos en la tabla
        return result[0] > 0

    except Exception as e:
        # En caso de error, maneja la excepción (puedes imprimir o registrar el error)
        print(f"Error al verificar la tabla {table_name}: {str(e)}")
        return False

if (not check_data_in_table('sp_release', conn)):

    print('Seeding sp_release')

    contador = 0

    # Lee los datos desde el archivo CSV
    with open('csv_files/sp_release.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Omitir la fila de encabezado
        for row in reader:

            if contador == MAX_DATA_ROWS: break
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

            # Inserta datos en la tabla sp_release
            sql = "INSERT INTO sp_release (release_id, release_title, release_date, upc, popularity, total_tracks, album_type, release_img, label_name, updated_on) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            data = (release_id, release_title, release_date, upc, popularity, total_tracks, album_type, release_img, label_name, updated_on)
            cur.execute(sql, data)

            contador += 1

    # Confirma la transacción
    conn.commit()

    print('sp_release seeded')


if (not check_data_in_table('audio_features', conn)):

    print('Seeding audio_features')

    contador = 0

    # Lee los datos desde el archivo CSV
    with open('csv_files/audio_features.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Omitir la fila de encabezado
        for row in reader:

            if contador == MAX_DATA_ROWS: break
            # Desempaqueta los valores de la fila
            isrc = row[0]
            acousticness = row[1]
            danceability = row[2]
            duration_ms = row[3]
            energy = row[4]
            instrumentalness = row[5]
            key = row[6]
            liveness = row[7]
            loudness = row[8]
            mode = row[9]

            # Inserta datos en la tabla sp_release
            sql = "INSERT INTO audio_features (isrc, acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            data = (isrc, acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, mode)
            cur.execute(sql, data)

            contador += 1

    # Confirma la transacción
    conn.commit()

    print('audio_features seeded')


if (not check_data_in_table('sp_artist_release', conn)):

    print('Seeding sp_artist_release')

    contador = 0

    # Lee los datos desde el archivo CSV
    with open('csv_files/sp_artist_release.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Omitir la fila de encabezado
        for row in reader:

            if contador == MAX_DATA_ROWS: break
            # Desempaqueta los valores de la fila
            release_id = row[0]
            artist_id = row[1]
            updated_on = row[2]

            # Inserta datos en la tabla sp_release
            sql = "INSERT INTO sp_artist_release (release_id, artist_id, updated_on) VALUES (%s, %s, %s);"
            data = (release_id, artist_id, updated_on)
            cur.execute(sql, data)

            contador += 1

    # Confirma la transacción
    conn.commit()

    print('sp_artist_release seeded')

if (not check_data_in_table('sp_artist_track', conn)):

    print('Seeding sp_artist_track')

    contador = 0

    # Lee los datos desde el archivo CSV
    with open('csv_files/sp_artist_track.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Omitir la fila de encabezado
        for row in reader:

            if contador == MAX_DATA_ROWS: break
            # Desempaqueta los valores de la fila
            track_id = row[0]
            artist_id = row[1]
            updated_on = row[2]

            # Inserta datos en la tabla sp_release
            sql = "INSERT INTO sp_artist_track (track_id, artist_id, updated_on) VALUES (%s, %s, %s);"
            data = (track_id, artist_id, updated_on)
            cur.execute(sql, data)

            contador += 1

    # Confirma la transacción
    conn.commit()

    print('sp_artist_track seeded')

if (not check_data_in_table('sp_artist', conn)):

    contador = 0

    print('Seeding sp_artist')

    # Lee los datos desde el archivo CSV
    with open('csv_files/sp_artist.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Omitir la fila de encabezado
        for row in reader:

            if contador == MAX_DATA_ROWS: break
            # Desempaqueta los valores de la fila
            artist_id = row[0]
            artist_name = row[1]
            updated_on = row[2]

            # Inserta datos en la tabla sp_release
            sql = "INSERT INTO sp_artist (artist_id, artist_name, updated_on) VALUES (%s, %s, %s);"
            data = (artist_id, artist_name, updated_on)
            cur.execute(sql, data)

            contador += 1

    # Confirma la transacción
    conn.commit()

    print('sp_artist seeded')

if (not check_data_in_table('sp_track', conn)):

    print('Seeding sp_track')

    contador = 0

    # Lee los datos desde el archivo CSV
    with open('csv_files/sp_release.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Omitir la fila de encabezado
        for row in reader:

            if contador == MAX_DATA_ROWS: break
            # Desempaqueta los valores de la fila
            track_id = row[0]
            track_title = row[1]
            duration_ms = row[2]
            isrc = row[3]
            track_number = row[4]
            release_id = row[5]
            explicit = row[6]
            disc_number = row[7]
            preview_url = row[8]
            updated_on = row[9]

            # Inserta datos en la tabla sp_release
            sql = "INSERT INTO sp_track (track_id, track_title, duration_ms, isrc, track_number, release_id, explicit, disc_number, preview_url, updated_on) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            data = (track_id, track_title, duration_ms, isrc, track_number, release_id, explicit, disc_number, preview_url, updated_on)
            cur.execute(sql, data)

            contador += 1

    # Confirma la transacción
    conn.commit()

    print('sp_track seeded')

print('Seeding completed')

cur.close()
conn.close()


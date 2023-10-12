-- CREATE DATABASE IF NOT EXISTS spotify --
SELECT 'CREATE DATABASE spotify'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'spotify')\gexec

-- CREATE DATABASE IF NOT EXISTS SB --
SELECT 'CREATE DATABASE SB'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'SB')\gexec

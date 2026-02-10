const path = require('path');

module.exports = ({ env }) => {
  const dbUrl = env('DATABASE_URL');

  // If DATABASE_URL exists (Render environment), use Postgres
  if (dbUrl) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false, // Required for Render Postgres
          },
        },
        pool: { min: 2, max: 10 },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  // Otherwise, fallback to SQLite (Local environment)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
      acquireConnectionTimeout: 60000,
    },
  };
};
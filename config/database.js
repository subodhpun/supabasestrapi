// config/database.js
const fs = require('fs');
const path = require('path');

// Optional: Check if certificate file exists
const certPath = path.resolve(__dirname, '..', 'supabase-ca.pem');
let sslConfig = {
  rejectUnauthorized: false // fallback
};

try {
  if (fs.existsSync(certPath)) {
    sslConfig = {
      rejectUnauthorized: true,
      ca: fs.readFileSync(certPath).toString()
    };
  }
} catch (error) {
  console.warn('Warning: Could not load SSL certificate, falling back to basic SSL');
}

module.exports = {
  connection: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST || 'db.yfvuxylytaogopltosdb.supabase.co',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      database: process.env.DATABASE_NAME || 'postgres',
      user: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      ssl: sslConfig
    },
    debug: false,
  },
};
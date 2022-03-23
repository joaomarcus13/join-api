const config = (database = 'nugei') => {
  return {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: database,
    server: process.env.SERVER,
    options: {
      // encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
};

export default config;

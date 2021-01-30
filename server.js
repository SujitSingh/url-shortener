const http = require('http');
const app = require('./app.js');
const appConfig = require('./utils/config.js');
const mongoConnect = require('./utils/db-connection.js').mongoConnect;
const PORT = appConfig.serverPort;

const server = http.createServer(app);

mongoConnect().then(connection => {
  console.log('MongoDB connected');
  server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
  }).on('error', error => {
    console.log('Server error -', error);
  });
}).catch(error => {
  console.log(error.message || 'Failed to start server', error);
});
const http = require('http');
const app = require('./app.js');
const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
}).on('error', error => {
  console.log('Server error -', error);
});
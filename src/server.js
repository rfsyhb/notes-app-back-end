const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    // jika ingin seluruh route dapat diakses
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  // Event handler for client errors
  server.listener.on('clientError', (err, socket) => {
    console.error('Client error:', err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  // Event handler for errors on the socket
  server.listener.on('error', (err, socket) => {
    console.error('Socket error:', err);
    socket.destroy();
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
});

init();

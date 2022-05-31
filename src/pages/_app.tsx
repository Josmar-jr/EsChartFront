import '../styles/globals.css';
import { createServer, Model, Response } from 'miragejs';

createServer({
  models: {
    users: Model
  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          email: 'john.doe@test.com',
          password: 'Bob_esponja123'
        }
      ]
    });
  },

  routes() {
    this.namespace = 'fake';

    this.post('/login', (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);
      const userAlreadyExist = schema.db.users.findBy({ email, password });

      if (!userAlreadyExist) return new Response(401);

      return new Response(
        201,
        { 'x-token': 'Berear adf212d2f12a1dsf1adb_asmBJm.dfjklm' },
      );
    });
  }
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

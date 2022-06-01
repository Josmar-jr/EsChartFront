import { createServer, Model, Response } from 'miragejs';

type User = {
  name: string;
  email: string;
  password: string;
  permissions: string[];
  roles: string[];
};

export function makeServer() {
  const server = createServer({
    models: {
      users: Model
    },

    seeds(server) {
      server.db.loadData({
        users: [
          {
            name: 'John Doe',
            email: 'john.doe@test.com',
            password: '@Abc1234',
            permissions: ['Administration'],
            roles: ['user.create', 'user.edit']
          }
        ]
      });
    },

    routes() {
      this.namespace = 'fake';
      this.timing = 750;

      this.get('/me', (schema, request) => {
        const { name, email, roles, permissions } = schema.db.users[0];

        return {
          name,
          email,
          roles,
          permissions
        };
      });

      this.post('/sessions', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({ email, password }) as User;

        if (!user) return new Response(401);

        return new Response(
          201,
          {},
          {
            permissions: user.permissions,
            roles: user.roles,
            token: 'adf212d2f12a1dsf1adb_asmBJm.dfjklm',
            refreshToken: 'lhnln_dn.adfa2sdfa3hspvnb.12511asdf'
          }
        );
      });
    }
  });

  return server;
}

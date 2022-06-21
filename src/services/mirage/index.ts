// import {
//   createServer,
//   Factory,
//   Model,
//   Response,
//   ActiveModelSerializer
// } from 'miragejs';

// type User = {
//   name: string;
//   email: string;
//   password: string;
//   permissions: string[];
//   roles: string[];
// };
export const t = 'oi'
// let mockToken = 'akBVskl_Jfdk.asdjh_aslv-asldfjasmv.jKMhbL.asdf';

// export function makeServer({ environment = 'test' } = {}) {
//   const server = createServer({
//     environment,

//     serializers: {
//       application: ActiveModelSerializer
//     },

//     models: {
//       users: Model.extend<Partial<User>>({})
//     },

//     seeds(server) {
//       server.db.loadData({
//         users: [
//           {
//             name: 'John Doe',
//             email: 'john.doe@test.com',
//             password: '@Abc1234',
//             permissions: ['user.create', 'user.edit', 'metrics.list'],
//             roles: ['Administration'],
//             avatar: 'https://github.com/josmar-jr.png'
//           }
//         ]
//       });
//     },

//     routes() {
//       this.namespace = 'api';
//       this.timing = 1250;

//       this.get('/me', (schema, request) => {
//         const { name, email, roles, permissions, avatar } = schema.db.users[0];
//         const { Authorization } = request.requestHeaders;
//         const [, token] = Authorization.split(' ');

//         if (token !== mockToken) return new Response(401);

//         return {
//           name,
//           email,
//           roles,
//           permissions,
//           avatar
//         };
//       });

//       this.post('/sessions', (schema, request) => {
//         const { email, password } = JSON.parse(request.requestBody);
//         const user = schema.db.users.findBy({ email, password }) as User;

//         if (!user) return new Response(401);

//         return new Response(
//           201,
//           {},
//           {
//             permissions: user.permissions,
//             roles: user.roles,
//             token: mockToken,
//             refreshToken: 'lhnln_dn.adfa2sdfa3hspvnb.12511asdf'
//           }
//         );
//       });

//       this.namespace = '';
//       this.passthrough();
//     }
//   });

//   return server;
// }

export default function(server) {
  server.create('user', {
    email: 'test@example.com'
  });

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  // server.createList('contact', 10);
}

export default function(server) {
  server.create('user', {
    first_name: 'Nick',
    last_name: 'Felicelli',
    email: 'nick.felicelli@gmail.com',
    admin: true
  });
  server.create('team', {userId: 1});

  let users = server.createList('user', 5);
  users.forEach((user) => {
    server.createList('team', 3, { userId: user.id });
  });
}

async function saveUsers() {
  const demoUsers = [
    {
      username: 'vonta',
      password: '1',
      email: 'v@alchemy.com',
    },
    {
      username: 'cristian',
      password: '2',
      email: 'c@alchemy.com',
    },
    {
      username: 'alice',
      password: '3',
      email: 'a@alchemy.com',
    },
  ];
  await Promise.all(
    demoUsers.map(async (user) => {
      await request(app).post('/api/users').send(user);
    })
  );
}

db = db.getSiblingDB('testdb');
db.createUser({
  user: 'starter-test',
  pwd: 'starter',
  roles: [
    {
      role: 'readWrite',
      db: 'testdb',
    },
  ],
});

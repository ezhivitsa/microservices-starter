db = db.getSiblingDB('appointments');
db.createUser({
  user: 'starter',
  pwd: 'starter',
  roles: [
    {
      role: 'readWrite',
      db: 'appointments',
    },
  ],
});

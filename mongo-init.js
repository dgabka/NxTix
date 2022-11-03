authDb = db.getSiblingDB('auth');
authDb.createCollection('users');

db.getSiblingDB('products');

db.getSiblingDB('orders');

db.getSiblingDB('payments');

db.createUser({
  user: 'dev',
  pwd: 'passwd',
  roles: [
    { role: 'readWrite', db: 'auth' },
    { role: 'readWrite', db: 'orders' },
    { role: 'readWrite', db: 'products' },
    { role: 'readWrite', db: 'payments' },
  ],
});

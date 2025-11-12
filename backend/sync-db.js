// sync-db.js
const { sequelize } = require('./config/db');
require('./models/User'); // ensure the User model is loaded

(async () => {
  try {
    console.log(' Syncing database...');
    await sequelize.sync({ alter: true });
    console.log(' Database sync complete!');
    process.exit(0);
  } catch (err) {
    console.error(' Error syncing database:', err);
    process.exit(1);
  }
})();

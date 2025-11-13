// backend/sync-db.js
const { sequelize } = require('./config/db');

// ✅ Import all models so Sequelize knows them
require('./models/User');
require('./models/Branch');
require('./models/Device');
require('./models/Request'); // if you have one

(async () => {
  try {
    console.log('🔄 Syncing database...');
    await sequelize.sync({ alter: true }); // add/modify columns safely, keeps data
    console.log('✅ Database sync complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error syncing database:', err);
    process.exit(1);
  }
})();

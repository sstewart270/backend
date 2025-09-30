const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://sstewart270_db_user:password255@songdb.mlcnisd.mongodb.net/SongDB?retryWrites=true&w=majority&appName=SongDB"
);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

module.exports = mongoose;
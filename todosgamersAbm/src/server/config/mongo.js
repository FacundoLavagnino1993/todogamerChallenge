const mongoose = require('mongoose');

try {

  const connect = () => {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(`mongodb://localhost:27017/users`, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
    }
  }

  mongoose.connection.on('connecting', () => {
    console.log('Connecting to mongo...')
  })

  mongoose.connection.on('open', () => {
    console.log('Connected to mongo')
  })

  mongoose.connection.on('error', () => {
    console.error('MongoDB Error');
  })

  mongoose.connection.on('reconnected', () => {
    console.error('MongoDB reconnected...');
  })

  mongoose.connection.on('disconnected', () => {
    console.log('mongoDb disconnected');
    setTimeout(() => {
      connect()
    }, 10000)
  });

  connect();
  // If the node procces ends. close the mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
  })

}catch (error) {
  console.error(error);
}


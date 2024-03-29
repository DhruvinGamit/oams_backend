require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1/OAMS2',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
      },
    )

    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed')
    process.exit(1)
  }
}

module.exports = {connectDB}

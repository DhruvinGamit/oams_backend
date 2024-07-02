require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dhruving21:dGamit%402104@flutterp.j2pbpkd.mongodb.net/?retryWrites=true&w=majority&appName=flutterP',
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

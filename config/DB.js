const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://project:<username>@<password>.uc3ja.mongodb.net/<datbasename>?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('MongoDb is connected'.yellow)
    } catch (error) {
        console.log("Error: ", error)
    }

}
module.exports = connectDB;

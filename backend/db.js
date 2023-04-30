const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      () => {
        console.log("mongdb is connected");
      })
}
module.exports = connectToMongo;
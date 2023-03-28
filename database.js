const { connect } = require("mongoose")

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_SERVER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = {
  serverPort: process.env.PORT || 3500,
  mongoDBPath: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`
}
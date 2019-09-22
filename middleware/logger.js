function logger(req, res, next){
  console.log(`This is Logger..`);
  next();
}

function authentication(req, res, next) {
  console.log(`This is Authentication...`);
  next();
}

module.exports = {
  logger,
  authentication
};
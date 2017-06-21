module.exports = function error(err, req, res, next) { // jshint ignore:line
  // Set no cache on errors
  res.set('Cache-Control', 'no-cache');

  let status = err.status || 500;
  let message;
  if (typeof err.message !== 'undefined' && typeof err.message  === 'string') {
    try {
      message = JSON.parse(err.message);
    } catch(e) {
      message = err.message;
    }
  }
  console.log(err);
  res.status(status).json({code:err.code, message:message});
};

exports.get400 = (req, res, next) => {
  const err = new Error('The server cannot process the request due to an apparent client error');
  err.statusCode = 400;
  next(err);
}

exports.get500 = (err, req, res, next) => {
  const data = err.data;
  console.log(err);
  
  res.status(err.statusCode || 500);
  res.json({
    err: {
      message: err.message,
      data: data
    }
  });
}
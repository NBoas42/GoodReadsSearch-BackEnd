const ErrorMiddleWare = (error, request, response, next) => {
  const status = error.status ? error.status:500
    response.status(status).send({ message: error.message, stack: error.stack });
  }

  module.exports = ErrorMiddleWare
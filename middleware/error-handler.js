const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    // set default
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || "SomeThing went Wrong "
  }


  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // return res.status(customError.statusCodes).json({ msg : customError })
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
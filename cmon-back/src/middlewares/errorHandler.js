import helpers from '../helpers';

const errorHandler = (err, req, res, next) => {
  helpers.LOGGER.info(`errorHandler - '${err}' - ${err.output.statusCode} - ${err.output.payload}`);

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  if (err.isServer) {
    // log the error...
    // probably you don't want to log unauthorized access
    // or do you?
  }
  return res.status(err.output.statusCode).json(err.output.payload);
};

export default errorHandler;

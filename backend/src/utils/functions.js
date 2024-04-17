export const responseMiddleware = (req, res, next) => {
  res.sendResponse = (body, status = STATUS.SUCCESS) => {
    return res.status(status).json(body);
  };
  next();
};

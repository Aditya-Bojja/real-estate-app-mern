import jwt from "jsonwebtoken";
//Use this when you want to create and throw manual errors
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, userIdObject) => {
    if (err) return next(errorHandler(401, "Unauthorized"));
    req.user = userIdObject;
    next();
  });
};

const accessToken = require("jsonwebtoken");

module.exports = {
  validToken: async (req, res, next) => {
    let result;
    // get request header authorization data
    // console.log("validation Token", req);
    // console.log("req.headers.authorization", req.headers.authorization);
    let authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      authorizationHeader = req.query.token;
    }

    // if header authorization exists
    if (authorizationHeader) {
      // const token = req.headers.authorization.split(' ')[1] // Bearer <token>
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = accessToken.verify(
          authorizationHeader,
          process.env.JWT_SECRET
        );
        // We call next to pass execution to the subsequent middleware
        return next();
      } catch (e) {
        // throw Error
        // console.log("Invalid Token", e);
        return res.status(200).send({ status: 401, msg: "invalid token" });
      }
    } else {
      res.status(200).send({
        error: "Authentication error. Token required.",
        status: 401,
      });
    }
  },
};

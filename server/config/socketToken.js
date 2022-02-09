const accessToken = require("jsonwebtoken");

module.exports = {
  socketToken: async (req, res) => {
    let result;
    let authorizationHeader = req.headers.authorization;
    // if header authorization exists
    if (authorizationHeader) {
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = accessToken.verify(
          authorizationHeader,
          process.env.JWT_SECRET
        );
        return true
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  },
};

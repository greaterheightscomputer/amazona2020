"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config.default.JWT_SECRET, {
    expiresIn: '48h'
  }); // 1st argument is payload which user data, 2nd argument is secret key inside config.js file and 3rd argument is {expiresIn: '48'}  
}; //Authenticate user and admin


exports.getToken = getToken;

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    //if token exist
    const onlyToken = token.slice(7, token.length); //remove the Bearer part from the token and get access to token part only

    _jsonwebtoken.default.verify(onlyToken, _config.default.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          msg: 'Invalid Token'
        });
      }

      req.user = decode;
      next(); //called next() to go for the next step

      return;
    });
  } else {
    return res.status(401).send({
      msg: "Token is not supplied."
    });
  }
};

exports.isAuth = isAuth;

const isAdmin = (req, res, next) => {
  // console.log(req.user)                            
  if (req.user && req.user.isAdmin) {
    //req.user === token and req.user.isAdmin === true
    return next(); //next() means accept this request
  }

  return res.status(401).send({
    msg: 'Admin Token is not valid.'
  });
};

exports.isAdmin = isAdmin;
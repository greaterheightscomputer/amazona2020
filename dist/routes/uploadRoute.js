"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create disk storage with Date.now().jpg as filename
const storage = _multer.default.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/'); //uploads/ is the folder is the root folder of the app where all the images we be residenting
  },

  filename(req, file, callback) {
    callback(null, `${Date.now()}.jpg`); //`${Date.now()}.jpg` means the filename
  }

}); // Set upload as multer({storage})


const upload = (0, _multer.default)({
  storage
});

const router = _express.default.Router();

router.post('/', upload.single('image'), (req, res) => {
  //'/' is the root of the router. upload.single('image') means upload a single file named image from frontend/ProductsScreen bodyFormData.append('image', file)
  res.send(`/${req.file.path}`); //`/${req.file.path}` means sending file path to client which i can then use to save the image inside mongodb
}); //setting aws basic on the api key and secret key

_awsSdk.default.config.update({
  accessKeyId: _config.default.accessKeyId,
  secretAccessKey: _config.default.secretAccessKey
}); //Using aws in multerS3 


const s3 = new _awsSdk.default.S3(); //getting access to S3 service by creating the instant of aws.S3

const storageS3 = (0, _multerS.default)({
  //creating an instant of multerS3
  s3,
  bucket: 'amazona0102020',
  acl: 'public-read',
  //acl is about permission for uploaded file which mean after uploading the file is going to be publicly readable
  contentType: _multerS.default.AUTO_CONTENT_TYPE,

  key(req, file, callback) {
    callback(null, file.originalname);
  }

});
const uploadS3 = (0, _multer.default)({
  storage: storageS3
}); //creating an instant of multer

router.post('/s3', uploadS3.single('image'), (req, res) => {
  res.send(req.file.location); //req.file.location is the location or url of the file uploaded to aws S3 storage server
});
var _default = router;
exports.default = _default;
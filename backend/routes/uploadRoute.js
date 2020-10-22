import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';

//Create disk storage with Date.now().jpg as filename
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, 'uploads/')   //uploads/ is the folder is the root folder of the app where all the images we be residenting
    },
    filename(req, file, callback){
        callback(null, `${Date.now()}.jpg`); //`${Date.now()}.jpg` means the filename
    }
});

// Set upload as multer({storage})
const upload = multer({ storage });

const router = express.Router();
router.post('/', upload.single('image'), (req, res)=>{ //'/' is the root of the router. upload.single('image') means upload a single file named image from frontend/ProductsScreen bodyFormData.append('image', file)
    res.send(`/${req.file.path}`); //`/${req.file.path}` means sending file path to client which i can then use to save the image inside mongodb
});

//setting aws basic on the api key and secret key
aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});

//Using aws in multerS3 
const s3 = new aws.S3();  //getting access to S3 service by creating the instant of aws.S3
const storageS3 = multerS3({ //creating an instant of multerS3
    s3,
    bucket: 'amazona0102020',
    acl: 'public-read',         //acl is about permission for uploaded file which mean after uploading the file is going to be publicly readable
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, callback){
        callback(null, file.originalname);
    }
});

const uploadS3 = multer({ storage: storageS3 }); //creating an instant of multer
router.post('/s3', uploadS3.single('image'), (req, res)=>{
    res.send(req.file.location);  //req.file.location is the location or url of the file uploaded to aws S3 storage server
})

export default router;
import express from 'express';
import multer from 'multer';

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

export default router;
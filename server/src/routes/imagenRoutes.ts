import { Router } from 'express';
import { imageController } from '../controllers/imageController';
import multer from 'multer';

var path = require('path');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        
        cb(null, path.join(__dirname+'/../../upload/images'));
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage});

class ImagenRoutes{
    
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config(): void{

        //this.router.post('/:id', imageController.index);
        this.router.get('/', imageController.getIndex);
        this.router.post('/:id', upload.array('file'), function (req, res, next) {
            res.send({
                text: "Recibido"
            });
          });
    }

}

const imagenRoutes = new ImagenRoutes();
export default imagenRoutes.router;
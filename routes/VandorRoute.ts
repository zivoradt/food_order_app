import express, {Request, Response, NextFunction} from 'express';
import { AddFood, GetFood, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';
import { Authentificate } from '../middelewares/CommonAuth';
import { imageStore } from '../middelewares/ImageMiddle';


// Creating express Router for handle request
const router = express.Router();

// Login page without authentificate
router.post('/login', VandorLogin);

// Handle requst with authentification
router.use(Authentificate);
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', UpdateVandorService);

// ImageStores middelware for insert images and add food to vandor
router.post('/food', imageStore, AddFood);


router.get('/food', GetFood);

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.json({message: "Hello from Vandor"})
});


export { router as VandorRoute};
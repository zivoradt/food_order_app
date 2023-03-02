import express, {Request, Response, NextFunction} from 'express';
import { GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';
import { Authentificate } from '../middelewares/CommonAuth';

const router = express.Router();


router.post('/login', VandorLogin);

router.use(Authentificate);
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', UpdateVandorService);

router.post('/food');
router.get('/food');

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.json({message: "Hello from Vandor"})
});


export { router as VandorRoute};
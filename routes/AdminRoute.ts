import express, {Request, Response, NextFunction} from 'express';
import { CreateVandor, DeleteVandorByID, GetVandor, GetVandorByID } from '../controllers';

const router = express.Router();


router.post('/vandor', CreateVandor);
router.get('/vandor', GetVandor);
router.get('/vandor/:id', GetVandorByID);
router.delete('/vandor', DeleteVandorByID);

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.json({message: "Hello from Admin"})
});


export { router as AdminRoute};
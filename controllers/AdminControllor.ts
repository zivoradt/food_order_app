import { json } from 'body-parser';
import  {Request, Response, NextFunction} from 'express';
import { CreateVandorInput } from '../data_transfer_object';


export const CreateVandor = async (req:Request, res:Response, next:NextFunction)=>{

    const { name, address, pincode, phone, email, password, ownerName, foodType} = <CreateVandorInput>req.body;

    return res.json({name, address, pincode, phone, email, password, ownerName, foodType});
}

export const GetVandor = async (req:Request, res:Response, next:NextFunction)=>{

}

export const GetVandorByID = async (req:Request, res:Response, next:NextFunction)=>{

}
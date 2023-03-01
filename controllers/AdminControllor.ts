import { json } from 'body-parser';
import  {Request, Response, NextFunction} from 'express';
import { CreateVandorInput } from '../data_transfer_object';
import { Vandor } from '../models';


export const CreateVandor = async (req:Request, res:Response, next:NextFunction)=>{

    const { name, address, pincode, phone, email, password, ownerName, foodType} = <CreateVandorInput>req.body;

    const existingVandor = await Vandor.findOne({email: email});

    if(existingVandor){
        return res.json({"message": "Vandor with this email exist"});
    }

    // Generate salt

    const createVandor = await Vandor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: password,
        salt: "fsdfa",
        serviceAvailable: false,
        coverImages: ["evo jedan"],
        rating: 0
    })

    return res.json(createVandor);
}

export const GetVandor = async (req:Request, res:Response, next:NextFunction)=>{

}

export const GetVandorByID = async (req:Request, res:Response, next:NextFunction)=>{

}

export const DeleteVandorByID = async (req:Request, res:Response, next:NextFunction)=>{
    const {id }= req.body;
    console.log(id);

     await Vandor.findByIdAndRemove(id);

    res.json("Deleted");

}
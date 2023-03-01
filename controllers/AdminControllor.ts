import { json } from 'body-parser';
import  {Request, Response, NextFunction} from 'express';
import { CreateVandorInput } from '../data_transfer_object';
import { Vandor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';


export const findVandor = async (id: string | undefined, email?: string) =>{
    if(email){
        return await Vandor.findOne({email:email});
    }
    else{
        return await Vandor.findById(id);
    }
}


export const CreateVandor = async (req:Request, res:Response, next:NextFunction)=>{

    const { name, address, pincode, phone, email, password, ownerName, foodType} = <CreateVandorInput>req.body;

    const existingVandor = await findVandor('',email);

    if(existingVandor){
        return res.json({"message": "Vandor with this email exist"});
    }

    // Generate salt

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createVandor = await Vandor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: userPassword,
        salt: salt,
        serviceAvailable: false,
        coverImages: [],
        rating: 0
    })

    return res.json(createVandor);
}

export const GetVandor = async (req:Request, res:Response, next:NextFunction)=>{
    const vandors  =  await Vandor.find();

    if(vandors){
        return res.json(vandors);
    }
    else {
        return res.json({"messaage": "Vandors data not avilabe"});
    }
}

export const GetVandorByID = async (req:Request, res:Response, next:NextFunction)=>{
    const vandorID = req.params.id;

    const vandor = await findVandor(vandorID);

    if(vandor){
        return res.json(vandor);
    }
    else{
        return res.json({"messaage": "Vandors not found!"});
    }

}

export const DeleteVandorByID = async (req:Request, res:Response, next:NextFunction)=>{
    const {id }= req.body;
    console.log(id);

     await Vandor.findByIdAndRemove(id);

    res.json("Deleted");

}
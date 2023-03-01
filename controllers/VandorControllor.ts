import { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../data_transfer_object";
import { GenerateSignature, ValidatePassword } from "../utility";
import { findVandor } from "./AdminControllor";

export const VandorLogin = async (req:Request, res:Response, next:NextFunction)=>{
    const {email, password} = <VandorLoginInputs>req.body;

    const existingVandor = await findVandor('', email);

    if (existingVandor) {
        // Validation
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);

        if(validation){
            const signature = await GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodType: existingVandor.foodType,
                name: existingVandor.name
            })
            console.log(signature);
            return res.json(signature);
            
        }
        else{
            return res.json({"message":"Password not valid"});
        }

    }
    return res.json({"message":"Login creditential are not valid"});
}

export const GetVandorProfile = async (req:Request, res:Response, next:NextFunction)=>{
    const user = req.user;

    if(user){
        const existingVandor = await findVandor(user._id);
        return res.json(existingVandor);
    }
    else {
        return res.json({"message": "Vandor not found!"});
    }
}

export const UpdateVandorProfile = async (req:Request, res:Response, next:NextFunction)=>{
    
}

export const UpdateVandorService = async (req:Request, res:Response, next:NextFunction)=>{
    
}
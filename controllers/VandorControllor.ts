import { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../data_transfer_object";
import { ValidatePassword } from "../utility";
import { findVandor } from "./AdminControllor";

export const VandorLogin = async (req:Request, res:Response, next:NextFunction)=>{
    const {email, password} = <VandorLoginInputs>req.body;

    const existingVandor = await findVandor('', email);

    if (existingVandor) {
        // Validation
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);

        if(validation){
            return res.json(existingVandor);
        }
        else{
            return res.json({"message":"Password not valid"});
        }

    }
    return res.json({"message":"Login creditential are not valid"});
}
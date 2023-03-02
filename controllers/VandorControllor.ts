import { Request, Response, NextFunction } from "express";
import { CreateFoodInput, EditVandorInputs, VandorLoginInputs } from "../data_transfer_object";
import { Food } from "../models";
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

    const {name, foodType, address, phone} = <EditVandorInputs>req.body;

    const user = req.user;

    if(user){
        const existingVandor = await findVandor(user._id);

        if(existingVandor){
            existingVandor.name = name;
            existingVandor.phone = phone;
            existingVandor.foodType = foodType;
            existingVandor.address = address;

            const saveResult = await existingVandor.save();
            return res.json(saveResult);
        }
        return res.json(existingVandor);
    }
    else {
        return res.json({"message": "Vandor information not found!"});
    } 
}

export const UpdateVandorService = async (req:Request, res:Response, next:NextFunction)=>{
    

    const user = req.user;

    if(user){
        const existingVandor = await findVandor(user._id);

        if(existingVandor){
            existingVandor.serviceAvailable = true;

            const saveResult = await existingVandor.save();
            return res.json(saveResult);
        }
        return res.json(existingVandor);
    }
    else {
        return res.json({"message": "Vandor information not found!"});
    } 
}

export const AddFood = async (req:Request, res:Response, next:NextFunction)=>{
    
    const user = req.user;

    if(user){
        const {name , description, category, foodType, readyTime, price} =<CreateFoodInput>req.body;

        const vandor = await findVandor(user._id);

        if(vandor){

            const createFood = await Food.create({
                vandorId: vandor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                rating: 0,
                images: ["mock.jpg"]
            })
        }
    }
    else{
        return res.json({"message": "Something get wrong with add food!"});
    }
 
}

export const GetFood = async (req:Request, res:Response, next:NextFunction)=>{
    
    const user = req.user;

    if(user){

    }
    else{
        return res.json({"message": "Something get wrong with getting food!"});
    }
 
}
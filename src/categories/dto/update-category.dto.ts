import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategotyDto{
    
   
    name?: string;
    description?: string;
    image?: string;
}
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategotyDto{
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    image: string;
}
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto{

    @IsNotEmpty()
    @IsString()
    name?: String;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName?: String;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phone?: String;


    image?: String;
    notification_token?:String;
}
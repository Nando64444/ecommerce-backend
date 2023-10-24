export class CreateUserDto{

    name : string;
    lastName : string;
    email : string;
    phone : string;
    password : string;
    image? : string;
    notificate_token? : string;
}
import { IsEmail, IsNotEmpty } from "class-validator";
export class UserSignInDTO {
    @IsNotEmpty()
    @IsEmail()
    loginMail : String
    @IsNotEmpty() 
    loginPassword : String
}
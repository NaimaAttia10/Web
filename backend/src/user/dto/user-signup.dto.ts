import { IsEmail, IsNotEmpty } from "class-validator";
export class UserSignUpDTO {
    @IsNotEmpty()
    signUpFirstName : String
    @IsNotEmpty()
    signUpLastName : String
    @IsNotEmpty()
    @IsEmail()
    signUpMail : String
    @IsNotEmpty()
    signUpAdress : String
    @IsNotEmpty()
    signUpPostCode : String 
    @IsNotEmpty() 
    signUpPassword : String
    @IsNotEmpty()
    signUpPasswordConfirm : String
}
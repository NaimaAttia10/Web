import { IsNotEmpty } from "class-validator";
export class CategoryAddDTO {
    @IsNotEmpty() 
    addCategory : String
}
import { IsNotEmpty } from "class-validator";
export class BrandDeleteDTO {
    @IsNotEmpty() 
    id : number
}
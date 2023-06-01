import { IsNotEmpty } from "class-validator";
export class BrandAddDTO {
    @IsNotEmpty() 
    addBrand : String
}
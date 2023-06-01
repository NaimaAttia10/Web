import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { Equal, Repository } from 'typeorm';
import { BrandAddDTO } from './dto/add-brand';
import { BrandDeleteDTO } from './dto/delete-brand';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(BrandEntity)
        private brandRepository : Repository<BrandEntity>
    ){}


    async addBrand(brand : BrandAddDTO){
        const brandCreated = this.brandRepository.create({
            name : brand.addBrand
        })

        try{
            await this.brandRepository.save(brandCreated);
        }catch(err){
            throw new ConflictException("Brand already exists !");
        }

        return brandCreated;
    }

    async deleteBrand(id : number){
        const brandToRemove = await this.brandRepository.find({where : {id : Equal(id)}})

        if(!brandToRemove){
            throw new NotFoundException("Brand introuvable !")
        }
        return await this.brandRepository.remove(brandToRemove);
    }

    async getBrandsWithProducts(){
        return await this.brandRepository.find();
    }
}

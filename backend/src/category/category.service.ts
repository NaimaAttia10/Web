import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Equal, Repository } from 'typeorm';
import { CategoryAddDTO } from './dto/add-category';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository : Repository<CategoryEntity>
    ){}


    async addCategory(category : CategoryAddDTO){
        const categoryCreated = this.categoryRepository.create({
            name : category.addCategory
        })

        try{
            await this.categoryRepository.save(categoryCreated);
        }catch(err){
            throw new ConflictException("Category already exists !");
        }

        return categoryCreated;
    }

    async deleteCategory(id : number){
        const categoryToRemove = await this.categoryRepository.find({where : {id : Equal(id)}})

        if(!categoryToRemove){
            throw new NotFoundException("Categorie introuvable !")
        }
        return await this.categoryRepository.remove(categoryToRemove);
    }

    async getCategoriesWithProducts(){
        return await this.categoryRepository.find();
    }
}

import { Controller, UseGuards, Post, Body, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminGuard } from 'src/user/admin.guard';
import { CategoryAddDTO } from './dto/add-category';

@Controller('category')
export class CategoryController {
    constructor(private categoryService : CategoryService){}

    @UseGuards(AdminGuard)
    @Post('/add')
    async addCategory(@Body() category : CategoryAddDTO){
        return await this.categoryService.addCategory(category)
    }
    @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteCategory(@Param('id', ParseIntPipe) id : number){
        return await this.categoryService.deleteCategory(id)
    }
    
    @Get()
    async getCategoriesWithProducts(){
        return await this.categoryService.getCategoriesWithProducts();
    }
}

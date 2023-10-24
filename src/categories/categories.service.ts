import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { create } from 'domain';
import { Category } from './category.entity';
import { CreateCategotyDto } from './dto/create-category.dto';
import storage = require('../utils/cloud_storage')
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategotyDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ){}

    findAll(){
        return this.categoriesRepository.find()
    }
    async create (file: Express.Multer.File, category: CreateCategotyDto){
       

        const url = await storage(file, file.originalname);
        if(url == undefined && url == null){
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        category.image = url
        const newCategory = this.categoriesRepository.create(category)
        return this.categoriesRepository.save(newCategory);
    }


    async updatewithImage (file: Express.Multer.File,  id: number,category: UpdateCategotyDto){
       
        const url = await storage(file, file.originalname);

        if(url == undefined && url == null){
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const categoryFound = await this.categoriesRepository.findOneBy({id: id});
        if (!categoryFound){
            throw new HttpException('La categoría no existe', HttpStatus.NOT_FOUND);
        }
        category.image = url
        const updatedCategory = Object.assign(categoryFound, category)
        return this.categoriesRepository.save(categoryFound);
    }
    async update (id: number,category: UpdateCategotyDto){
       
        const categoryFound = await this.categoriesRepository.findOneBy({id: id});
        if (!categoryFound){
            throw new HttpException('La categoría no existe', HttpStatus.NOT_FOUND);
        }
        const updatedCategory = Object.assign(categoryFound, category)
        return this.categoriesRepository.save(categoryFound);
    }
    async delete(id: number){
        const categoryFound = await this.categoriesRepository.findOneBy({id: id});
        if (!categoryFound){
            throw new HttpException('La categoría no existe', HttpStatus.NOT_FOUND);
    }
    return this.categoriesRepository.delete(id);
    }
}

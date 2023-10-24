import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { CreateCategotyDto } from './dto/create-category.dto';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategotyDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private CategoriesService: CategoriesService){}


    @HasRoles(JwtRole.CLIENT, JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll(){
        return this.CategoriesService.findAll()

    }

@HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard, JwtRolesGuard)
@Post()
@UseInterceptors(FileInterceptor('file'))
CreateWithImage(
    @UploadedFile(
        new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            ],
          }),
    ) file: Express.Multer.File,
    @Body() category: CreateCategotyDto
 ) { 
  return this.CategoriesService.create(file, category)


 }
 
 @HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard, JwtRolesGuard)
 @Put(':id')
 update( @Param('id', ParseIntPipe) id: number, @Body() category: UpdateCategotyDto){

    return this.CategoriesService.update(id, category)
 }

 @HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard, JwtRolesGuard)
@Put('upload/:id')
@UseInterceptors(FileInterceptor('file'))
updateWithImage(
    @UploadedFile(
        new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            ],
          }),
    ) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategotyDto
 ) { 
  return this.CategoriesService.updatewithImage(file,id,category)


 }

 @HasRoles(JwtRole.ADMIN)
 @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Delete(':id')
  delete( @Param('id', ParseIntPipe) id: number){
    return this.CategoriesService.delete(id);
}
}


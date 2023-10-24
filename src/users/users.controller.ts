import { Body, Put, Controller, UseGuards, Post, Get, Param, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator} from '@nestjs/common'
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get() // http://192.168.0.41:3000/users -> GET
    findAll(){
        return this.usersService.findAll();
        }

    @Post() // http://192.168.0.41:3000/users -> POST
    create(@Body() user: CreateUserDto){
        return this.usersService.create(user);

    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') // http://192.168.0.41:3000/users:id -> PUT
    update(@Param('id', ParseIntPipe)id:number, @Body() user: UpdateUserDto){
        return this.usersService.update(id, user);

}

@HasRoles(JwtRole.CLIENT)
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
    @Param('id', ParseIntPipe)id:number, @Body() user: UpdateUserDto,
 ) { 
  return this.usersService.updateWithImage(file, id, user);


 }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { create } from 'domain';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Rol) private rolesRepository: Repository<Rol>){}

        create(rol: CreateRolDto){
            const newRol = this.rolesRepository.create(rol);
            return this.rolesRepository.save(newRol);
        }
    
}

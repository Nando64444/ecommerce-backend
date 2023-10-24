import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { jwtConstans } from './auth/jwt/jwt.constants';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '558590cassiani',
    database: 'ecommer_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
 
UsersModule,
AuthModule,
RolesModule,
CategoriesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

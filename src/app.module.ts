import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './Global/config/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.db,
      autoLoadEntities: true,
      synchronize: true,      
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './Global/config/config';
import { PlayerModule } from './player/module/player.module';
import { ResultModule } from './Result/module/result.module';
import { TournamentModule } from './Tournament/module/tournament.module';


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
    PlayerModule,
    ResultModule,
    TournamentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

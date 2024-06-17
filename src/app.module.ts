import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './Global/config/config';
import { PlayerModule } from './modules/player/module/player.module';
import { ResultModule } from './modules/Result/module/result.module';
import { TournamentModule } from './modules/Tournament/module/tournament.module';
import { ConfigModule } from '@nestjs/config';
import { PrizesModule } from './modules/prize/module/prize.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.db,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: true,
      },
    }),
    ScheduleModule.forRoot(),
    PlayerModule,
    ResultModule,
    TournamentModule,
    PrizesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

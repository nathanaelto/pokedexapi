import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokeApiModule } from './infra/poke-api/poke-api.module';
import { FeaturesModule } from './features/features.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    PokeApiModule,
    FeaturesModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('Pokedex API', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

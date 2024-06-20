import { Module } from '@nestjs/common';
import { PokeApiService } from './poke-api.service';
import { HttpModule } from '@nestjs/axios';
import { PokeApiController } from './poke-api.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://pokeapi.co/api/v2',
      timeout: 5000,
    }),
  ],
  providers: [PokeApiService],
  exports: [PokeApiService],
  controllers: [PokeApiController],
})
export class PokeApiModule {}

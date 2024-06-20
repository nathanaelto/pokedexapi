import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PokeApiService } from './poke-api.service';

@ApiTags('PokeApi Provider')
@Controller('poke-api')
export class PokeApiController {
  constructor(private readonly pokeApiService: PokeApiService) {}

  @Get()
  async fetchPokemon() {
    return await this.pokeApiService.fetchPokemons();
  }
}

import { Module } from '@nestjs/common';
import { PokeApiModule } from '../../infra/poke-api/poke-api.module';
import { IndexPokemonsCommand } from './index-pokemons.command';

@Module({
  imports: [PokeApiModule],
  providers: [IndexPokemonsCommand],
})
export class PokemonsModule {}

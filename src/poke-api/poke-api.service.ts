import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonResponse } from './types/pokemon-response';
import * as fs from 'fs';

@Injectable()
export class PokeApiService {
  private readonly pokemonSpeciesEndpoint = 'pokemon';
  constructor(private readonly httpService: HttpService) {}

  async fetchPokemon() {
    // return this.httpService.get(this.pokemonSpeciesEndpoint).toPromise();

    // 1 à 1008
    /*
    const startProcedural = new Date().getTime();
    const pokemonsProcedural: PokemonResponse[] = [];
    for (let i = 1; i <= 1008; i++) {
      const { data } = await firstValueFrom(
        this.httpService.get<PokemonResponse>(
          `${this.pokemonSpeciesEndpoint}/${i}`,
        ),
      );
      pokemonsProcedural.push(data);
    }
    console.log(pokemonsProcedural.length);
    console.log(`Time procedural: ${new Date().getTime() - startProcedural}ms`);
    */

    const startParallel = new Date().getTime();
    const ids = Array.from({ length: 1008 }, (_, i) => i + 1);
    const pokemonsParallel = await Promise.all(
      ids.map(async (i): Promise<PokemonResponse> => {
        const { data } = await firstValueFrom(
          this.httpService.get<PokemonResponse>(
            `${this.pokemonSpeciesEndpoint}/${i}`,
          ),
        );
        return {
          id: data.id,
          name: data.name,
          types: data.types,
          sprites: { front_default: data.sprites.front_default },
        };
      }),
    );
    console.log(pokemonsParallel.length);
    console.log(`Time parallel: ${new Date().getTime() - startParallel}ms`);

    console.log(pokemonsParallel[0]);

    const jsonToWrite = JSON.stringify(pokemonsParallel, null, 2);
    fs.writeFileSync('pokemons.json', jsonToWrite);

    return 'WIP';
  }
}

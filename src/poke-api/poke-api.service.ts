import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonResponse } from './types/pokemon-response';

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
      ids.map(async (i) => {
        const { data } = await firstValueFrom(
          this.httpService.get<PokemonResponse>(
            `${this.pokemonSpeciesEndpoint}/${i}`,
          ),
        );
        return data;
      }),
    );
    console.log(pokemonsParallel.length);
    console.log(`Time parallel: ${new Date().getTime() - startParallel}ms`);

    const response = await firstValueFrom(
      this.httpService.get<PokemonResponse>(`${this.pokemonSpeciesEndpoint}/1`),
    );
    const { data } = response;

    return data;
  }
}

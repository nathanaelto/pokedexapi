import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonResponse } from './types/pokemon-response';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PokeApiService {
  private readonly pokemonEndpoint = 'pokemon';
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
  ) {}

  async fetchPokemons(): Promise<PokemonResponse[]> {
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
    const pokemons = await Promise.all(
      ids.map(async (i): Promise<PokemonResponse> => {
        const { data } = await firstValueFrom(
          this.httpService.get<PokemonResponse>(`${this.pokemonEndpoint}/${i}`),
        );
        return {
          id: data.id,
          name: data.name,
          types: data.types,
          sprites: { front_default: data.sprites.front_default },
        };
      }),
    );
    this.logger.log(
      `Time to fetch pokemons: ${new Date().getTime() - startParallel}ms`,
    );

    return pokemons;
  }
}

export interface PokemonResponse {
  id: number;
  name: string;
  types: TypeSlot[];
  sprites: PokemonImages;
}

export interface TypeSlot {
  slot: number;
  type: Type;
}

export interface Type {
  name: string;
  url: string;
}

export interface PokemonImages {
  front_default: string;
}

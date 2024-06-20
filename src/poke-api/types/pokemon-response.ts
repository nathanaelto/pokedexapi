export class PokemonResponse {
  id: number;
  name: string;
  types: TypeSlot[];
  sprites: PokemonImages;
}

export class TypeSlot {
  slot: number;
  type: Type;
}

export class Type {
  name: string;
  url: string;
}

export class PokemonImages {
  front_default: string;
}

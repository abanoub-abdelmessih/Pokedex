export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  front_image: string;
  back_image: string;
  types: PokemonType[];
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonDetails extends Pokemon {
  id: number;
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

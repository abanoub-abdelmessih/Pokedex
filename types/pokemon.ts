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

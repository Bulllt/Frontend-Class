import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const PokeAPI = {
  async getPokemonList(limit = 100, offset = 0) {
    try {
      const listResponse = await apiClient.get(
        `/pokemon?limit=${limit}&offset=${offset}`
      );

      const pokemonDetails = await Promise.all(
        listResponse.data.results.map(async (pokemon) => {
          const detailResponse = await apiClient.get(pokemon.url);
          const data = detailResponse.data;
          return {
            id: data.id,
            name: data.name,
            types: data.types.map((type) => type.type.name),
            sprite: data.sprites.other["official-artwork"].front_default,
          };
        })
      );

      return {
        count: listResponse.data.count,
        results: pokemonDetails,
      };
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      throw error;
    }
  },

  async searchPokemonByName(name) {
    try {
      const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        types: data.types.map((type) => type.type.name),
        sprite: data.sprites.other["official-artwork"].front_default,
      };
    } catch (error) {
      if (error.response?.status === 404) return null;
      console.error("Error searching Pokémon:", error);
      throw error;
    }
  },

  async getPokemonByType(type) {
    try {
      const response = await apiClient.get(`/type/${type}`);
      const pokemonList = response.data.pokemon.map((item) => item.pokemon);

      const limitedList = pokemonList.slice(0, 100);
      const pokemonDetails = await Promise.all(
        limitedList.map(async (pokemon) => {
          const detailResponse = await apiClient.get(pokemon.url);
          const data = detailResponse.data;
          return {
            id: data.id,
            name: data.name,
            types: data.types.map((type) => type.type.name),
            sprite: data.sprites.other["official-artwork"].front_default,
          };
        })
      );
      return pokemonDetails;
    } catch (error) {
      console.error(`Error fetching Pokémon of type ${type}:`, error);
      throw error;
    }
  },
};

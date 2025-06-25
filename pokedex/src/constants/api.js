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

          let sprite = data.sprites.other["official-artwork"].front_default;
          if (!sprite) {
            sprite = data.sprites.front_default;
          }

          return {
            id: data.id,
            name: data.name,
            types: data.types.map((type) => type.type.name),
            sprite: sprite,
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

      let sprite = data.sprites.other["official-artwork"].front_default;
      if (!sprite) {
        sprite = data.sprites.front_default;
      }

      return {
        id: data.id,
        name: data.name,
        types: data.types.map((type) => type.type.name),
        sprite: sprite,
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

          let sprite = data.sprites.other["official-artwork"].front_default;
          if (!sprite) {
            sprite = data.sprites.front_default;
          }

          return {
            id: data.id,
            name: data.name,
            types: data.types.map((type) => type.type.name),
            sprite: sprite,
          };
        })
      );
      return pokemonDetails;
    } catch (error) {
      console.error(`Error fetching Pokémon of type ${type}:`, error);
      throw error;
    }
  },

  async getPokemonDetails(id) {
    try {
      const response = await apiClient.get(`/pokemon/${id}`);
      const data = response.data;

      let sprite = data.sprites.other["official-artwork"]?.front_default;
      if (!sprite) {
        sprite = data.sprites.front_default;
      }

      return {
        id: data.id,
        name: data.name,
        types: data.types.map((type) => type.type.name),
        sprite: sprite,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability) => ability.ability.name),
        stats: data.stats,
        speciesUrl: data.species.url,
      };
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      throw error;
    }
  },
};

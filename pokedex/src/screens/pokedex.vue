<script setup>
import { ref, computed } from "vue";
import PokemonCard from "../components/pokemonCard.vue";

const placeholderPokemons = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Pokémon ${i + 1}`,
  types: ["normal"],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
}));

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;

const filteredPokemons = computed(() => {
  return placeholderPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredPokemons.value.length / itemsPerPage)
);
const displayedPokemons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPokemons.value.slice(start, end);
});

const handleSearch = () => {
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="pokedexContainer">
    <header class="pokedexHeader">
      <h1>Pokédex</h1>
      <div class="searchContainer">
        <font-awesome-icon icon="fa-solid fa-search" class="searchIcon" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Pokémon..."
          class="searchInput"
          @input="handleSearch"
        />
      </div>
    </header>

    <div class="pokemonGrid">
      <PokemonCard
        v-for="pokemon in displayedPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="paginationButton"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <span class="pageIndicator">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="paginationButton"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.pokedexContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.pokedexHeader {
  text-align: center;
  margin-bottom: 2rem;
}

.pokedexHeader h1 {
  color: var(--primary-color);
  font-size: var(--font-size-title);
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 0 var(--secondary-color);
}

.searchContainer {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.searchInput {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 3px solid var(--dark-color);
  border-radius: 50px;
  font-family: var(--font-family);
  font-size: 0.9rem;
  outline: none;
  box-shadow: 5px 5px 0 var(--secondary-color);
  transition: all 0.3s ease;
}

.searchInput:focus {
  border-color: var(--primary-color);
  box-shadow: 5px 5px 0 var(--primary-color);
}

.searchIcon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-color);
}

.pokemonGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.paginationButton {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 0 var(--secondary-color);
}

.paginationButton:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  box-shadow: 3px 3px 0 #999;
}

.paginationButton:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 5px 5px 0 var(--secondary-color);
}

.pageIndicator {
  font-size: 0.9rem;
  color: var(--dark-color);
}

@media (max-width: 768px) {
  .pokemonGrid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .pokedexHeader h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .pokemonGrid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }

  .searchInput {
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
    font-size: 0.8rem;
  }

  .searchIcon {
    left: 0.8rem;
    font-size: 0.9rem;
  }
}
</style>

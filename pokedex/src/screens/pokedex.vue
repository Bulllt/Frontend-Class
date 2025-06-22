<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import PokemonCard from "../components/pokemonCard.vue";
import { PokeAPI } from "../constants/api";

const route = useRoute();
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 100;
const pokemons = ref([]);
const totalCount = ref(0);
const isLoading = ref(false);
const selectedType = ref(null);

const fetchPokemons = async () => {
  try {
    isLoading.value = true;
    const offset = (currentPage.value - 1) * itemsPerPage;

    if (selectedType.value) {
      const typeResponse = await PokeAPI.getPokemonByType(selectedType.value);
      pokemons.value = typeResponse;
      totalCount.value = typeResponse.length;
    } else {
      const data = await PokeAPI.getPokemonList(itemsPerPage, offset);
      pokemons.value = data.results;
      totalCount.value = data.count;
    }
  } catch (error) {
    console.error("Error loading Pokémon:", error);
    pokemons.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    fetchPokemons();
    return;
  }

  try {
    isLoading.value = true;
    const result = await PokeAPI.searchPokemonByName(searchQuery.value);
    pokemons.value = result ? [result] : [];
    totalCount.value = result ? 1 : 0;
    currentPage.value = 1;
  } catch (error) {
    console.error("Error searching Pokémon:", error);
    pokemons.value = [];
  } finally {
    isLoading.value = false;
  }
};

const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage));
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPokemons();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPokemons();
  }
};

watch(
  () => route.query.type,
  (newType) => {
    selectedType.value = newType || null;
    currentPage.value = 1;
    fetchPokemons();
  },
  { immediate: true }
);
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
          placeholder="Buscar Pokémon..."
          class="searchInput"
          @input="handleSearch"
        />
      </div>
    </header>

    <div v-if="isLoading" class="loadingState">
      <div class="loadingSpinner"></div>
      <p>Cargando Pokémon...</p>
    </div>

    <div v-else-if="pokemons.length === 0" class="emptyState">
      <p>No se encontraron Pokémon</p>
    </div>

    <div class="pokemonGrid">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <div v-if="!searchQuery && pokemons.length > 0" class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="paginationButton"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>

      <span class="pageIndicator">
        Página {{ currentPage }} de {{ totalPages }}
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

.loadingState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.loadingSpinner {
  width: 50px;
  height: 50px;
  border: 5px solid var(--background-color);
  border-top: 5px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.emptyState {
  text-align: center;
  padding: 2rem;
  color: var(--dark-color);
  font-size: 1.2rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

<script setup>
import { ref, onMounted } from "vue";
import PokemonCard from "../components/pokemonCard.vue";

const favoritePokemons = ref([]);
const isLoading = ref(false);

const loadFavorites = () => {
  isLoading.value = true;
  try {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoritePokemons")) || [];
    favoritePokemons.value = storedFavorites;
  } catch (error) {
    console.error("Error loading favorites:", error);
    favoritePokemons.value = [];
  } finally {
    isLoading.value = false;
  }
};

window.addEventListener("storage", (event) => {
  if (event.key === "favoritePokemons") {
    loadFavorites();
  }
});

onMounted(loadFavorites);
</script>

<template>
  <div class="favoritesContainer">
    <header class="favoritesHeader">
      <h1>Estos son tus favoritos</h1>
      <p v-if="favoritePokemons.length === 0" class="emptyMessage">
        Aún no tienes Pokémon favoritos. ¡Empieza a agregarlos!
      </p>
    </header>

    <div v-if="isLoading" class="loadingState">
      <div class="loadingSpinner"></div>
      <p>Cargando tus Pokémon favoritos...</p>
    </div>

    <div v-else class="pokemonGrid">
      <PokemonCard
        v-for="pokemon in favoritePokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<style scoped>
.favoritesContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.favoritesHeader {
  text-align: center;
  margin-bottom: 2rem;
}

.favoritesHeader h1 {
  color: var(--primary-color);
  font-size: var(--font-size-title);
  margin-bottom: 1rem;
  text-shadow: 3px 3px 0 var(--secondary-color);
}

.emptyMessage {
  color: var(--dark-color);
  font-size: 1.2rem;
  margin-top: 1rem;
}

.pokemonGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .pokemonGrid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .favoritesHeader h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .pokemonGrid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
}
</style>

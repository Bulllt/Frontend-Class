<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { PokeAPI } from "../constants/api";

const route = useRoute();
const pokemon = ref(null);
const isLoading = ref(false);

const estimatedWeaknesses = computed(() => {
  const weaknessMap = {
    normal: ["fighting"],
    fire: ["water", "ground", "rock"],
    water: ["electric", "grass"],
    electric: ["ground"],
    grass: ["fire", "ice", "poison", "flying", "bug"],
    ice: ["fire", "fighting", "rock", "steel"],
    fighting: ["flying", "psychic", "fairy"],
    poison: ["ground", "psychic"],
    ground: ["water", "grass", "ice"],
    flying: ["electric", "ice", "rock"],
    psychic: ["bug", "ghost", "dark"],
    bug: ["fire", "flying", "rock"],
    rock: ["water", "grass", "fighting", "ground", "steel"],
    ghost: ["ghost", "dark"],
    dragon: ["ice", "dragon", "fairy"],
    dark: ["fighting", "bug", "fairy"],
    steel: ["fire", "fighting", "ground"],
    fairy: ["poison", "steel"],
  };

  return pokemon.value.types
    .flatMap((type) => weaknessMap[type])
    .filter((value, index, self) => self.indexOf(value) === index);
});

const fetchPokemonDetails = async () => {
  try {
    isLoading.value = true;
    const pokemonId = route.params.id;
    pokemon.value = await PokeAPI.getPokemonDetails(pokemonId);
    await fetchEvolutions();
  } catch (err) {
    console.error("Error fetching Pokémon details:", err);
  } finally {
    isLoading.value = false;
  }
};

const translateType = (type) => {
  const typesMap = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
  };
  return typesMap[type];
};

const translateStat = (stat) => {
  const statsMap = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defensa Especial",
    speed: "Velocidad",
  };
  return statsMap[stat];
};

const formatAbilityName = (ability) => {
  return ability
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getStatColorClass = (value) => {
  if (value >= 100) return "highStat";
  if (value >= 50) return "mediumStat";
  return "lowStat";
};

onMounted(fetchPokemonDetails);
</script>

<template>
  <div class="pokemonDetailContainer">
    <button @click="$router.go(-1)" class="backButton">
      <font-awesome-icon icon="fa-arrow-left" />
      <span>Volver</span>
    </button>

    <div v-if="pokemon" class="pokemonDetailContent">
      <div class="pokemonHeader">
        <div class="pokemonImageContainer">
          <img
            :src="pokemon.sprite"
            :alt="pokemon.name"
            class="pokemonMainImage"
          />
        </div>
        <div class="pokemonBasicInfo">
          <span class="pokemonId"
            >#{{ pokemon.id.toString().padStart(3, "0") }}</span
          >
          <h1 class="pokemonName">{{ pokemon.name }}</h1>
          <div class="pokemonTypes">
            <span
              v-for="type in pokemon.types"
              :key="type"
              class="pokemonType"
              :class="`type-${type}`"
            >
              {{ translateType(type) }}
            </span>
          </div>
        </div>
      </div>

      <div class="pokemonInfoGrid">
        <div class="infoCard">
          <h2 class="sectionTitle">Características</h2>
          <div class="characteristicsGrid">
            <div class="characteristic">
              <span class="characteristicLabel">Altura</span>
              <span class="characteristicValue"
                >{{ (pokemon.height / 10).toFixed(1) }} m</span
              >
            </div>
            <div class="characteristic">
              <span class="characteristicLabel">Peso</span>
              <span class="characteristicValue"
                >{{ (pokemon.weight / 10).toFixed(1) }} kg</span
              >
            </div>
            <div class="characteristic">
              <span class="characteristicLabel">Habilidades</span>
              <div class="abilitiesList">
                <span
                  v-for="ability in pokemon.abilities"
                  :key="ability"
                  class="ability"
                >
                  {{ formatAbilityName(ability) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="infoCard">
          <h2 class="sectionTitle">Estadísticas</h2>
          <div class="statsContainer">
            <div
              v-for="stat in pokemon.stats"
              :key="stat.stat.name"
              class="statRow"
            >
              <span class="statName">{{ translateStat(stat.stat.name) }}</span>
              <div class="statBarContainer">
                <div
                  class="statBar"
                  :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
                  :class="getStatColorClass(stat.base_stat)"
                ></div>
                <span class="statValue">{{ stat.base_stat }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="infoCard">
          <h2 class="sectionTitle">Debilidades</h2>
          <div class="weaknessesContainer">
            <span
              v-for="type in estimatedWeaknesses"
              :key="type"
              class="weaknessType"
              :class="`type-${type}`"
            >
              {{ translateType(type) }}
            </span>
            <p v-if="estimatedWeaknesses.length === 0" class="noWeaknesses">
              No se encontraron debilidades significativas
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isLoading" class="loadingState">
      <div class="loadingSpinner"></div>
      <p>Cargando información del Pokémon...</p>
    </div>
  </div>
</template>

<style scoped>
.pokemonDetailContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

.backButton {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  font-family: var(--font-family);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.backButton:hover {
  background-color: var(--primary-color);
  transform: translateX(-5px);
}

.pokemonHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.pokemonImageContainer {
  background-color: var(--background-color);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border: 3px solid var(--dark-color);
}

.pokemonMainImage {
  width: 250px;
  height: 250px;
  object-fit: contain;
}

.pokemonBasicInfo {
  text-align: center;
}

.pokemonId {
  display: block;
  color: var(--dark-color);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.pokemonName {
  color: var(--dark-color);
  font-size: 2rem;
  margin: 0.5rem 0;
  text-transform: capitalize;
}

.pokemonTypes {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pokemonType {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

.pokemonInfoGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.infoCard {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  border: 3px solid var(--dark-color);
}

.sectionTitle {
  color: var(--primary-color);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.5rem;
}

.characteristicsGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.characteristic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.characteristicLabel {
  font-weight: bold;
  color: var(--dark-color);
}

.characteristicValue {
  color: var(--secondary-color);
}

.abilitiesList {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ability {
  background-color: var(--background-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.statsContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
}

.statRow {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 1rem;
}

.statName {
  font-weight: bold;
  color: var(--dark-color);
}

.statBarContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.statBar {
  height: 10px;
  border-radius: 5px;
  background-color: var(--secondary-color);
  transition: width 0.5s ease;
}

.statBar.highStat {
  background-color: #4caf50;
}

.statBar.mediumStat {
  background-color: #ffc107;
}

.statBar.lowStat {
  background-color: #f44336;
}

.statValue {
  min-width: 30px;
  text-align: right;
  font-weight: bold;
}

.weaknessesContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.weaknessType {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
}

.noWeaknesses {
  color: #666;
  font-style: italic;
}

.evolutionsSection {
  margin-top: 3rem;
}

.evolutionsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.evolutionCard {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.evolutionCard:hover {
  transform: translateY(-5px);
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

.errorState {
  text-align: center;
  padding: 2rem;
}

.retryButton {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
  font-family: var(--font-family);
  transition: all 0.2s ease;
}

.retryButton:hover {
  background-color: var(--secondary-color);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.type-normal {
  background-color: var(--type-normal);
}
.type-fire {
  background-color: var(--type-fire);
}
.type-water {
  background-color: var(--type-water);
}
.type-electric {
  background-color: var(--type-electric);
}
.type-grass {
  background-color: var(--type-grass);
}
.type-ice {
  background-color: var(--type-ice);
}
.type-fighting {
  background-color: var(--type-fighting);
}
.type-poison {
  background-color: var(--type-poison);
}
.type-ground {
  background-color: var(--type-ground);
}
.type-flying {
  background-color: var(--type-flying);
}
.type-psychic {
  background-color: var(--type-psychic);
}
.type-bug {
  background-color: var(--type-bug);
}
.type-rock {
  background-color: var(--type-rock);
}
.type-ghost {
  background-color: var(--type-ghost);
}
.type-dragon {
  background-color: var(--type-dragon);
}
.type-dark {
  background-color: var(--type-dark);
}
.type-steel {
  background-color: var(--type-steel);
}
.type-fairy {
  background-color: var(--type-fairy);
}

@media (max-width: 768px) {
  .pokemonHeader {
    flex-direction: column;
  }

  .pokemonMainImage {
    width: 200px;
    height: 200px;
  }

  .pokemonInfoGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .pokemonMainImage {
    width: 150px;
    height: 150px;
  }

  .pokemonName {
    font-size: 1.5rem;
  }

  .statRow {
    grid-template-columns: 100px 1fr;
  }
}
</style>

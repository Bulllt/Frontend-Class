<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="pokemonCard" :class="`type-${pokemon.types[0]}`">
    <div class="pokemonImageContainer">
      <img :src="pokemon.sprite" :alt="pokemon.name" class="pokemonImage" />
    </div>
    <div class="pokemonInfo">
      <span class="pokemonId"
        >#{{ pokemon.id.toString().padStart(3, "0") }}</span
      >
      <h3 class="pokemonName">{{ pokemon.name }}</h3>
      <div class="pokemonTypes">
        <span
          v-for="type in pokemon.types"
          :key="type"
          class="pokemonType"
          :class="`type-${type}`"
        >
          {{ type }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemonCard {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 3px solid var(--dark-color);
}

.pokemonCard:hover {
  transform: translateY(-5px);
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
}

.pokemonImageContainer {
  background-color: var(--background-color);
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.pokemonImage {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.pokemonInfo {
  padding: 1rem;
  text-align: center;
}

.pokemonId {
  display: block;
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.pokemonName {
  color: var(--dark-color);
  margin: 0.5rem 0;
  font-size: 1rem;
  text-transform: capitalize;
}

.pokemonTypes {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.pokemonType {
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.7rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
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

.pokemonCard.type-normal {
  border-color: var(--type-normal);
}
.pokemonCard.type-fire {
  border-color: var(--type-fire);
}
.pokemonCard.type-water {
  border-color: var(--type-water);
}
.pokemonCard.type-electric {
  border-color: var(--type-electric);
}
.pokemonCard.type-grass {
  border-color: var(--type-grass);
}
.pokemonCard.type-ice {
  border-color: var(--type-ice);
}
.pokemonCard.type-fighting {
  border-color: var(--type-fighting);
}
.pokemonCard.type-poison {
  border-color: var(--type-poison);
}
.pokemonCard.type-ground {
  border-color: var(--type-ground);
}
.pokemonCard.type-flying {
  border-color: var(--type-flying);
}
.pokemonCard.type-psychic {
  border-color: var(--type-psychic);
}
.pokemonCard.type-bug {
  border-color: var(--type-bug);
}
.pokemonCard.type-rock {
  border-color: var(--type-rock);
}
.pokemonCard.type-ghost {
  border-color: var(--type-ghost);
}
.pokemonCard.type-dragon {
  border-color: var(--type-dragon);
}
.pokemonCard.type-dark {
  border-color: var(--type-dark);
}
.pokemonCard.type-steel {
  border-color: var(--type-steel);
}
.pokemonCard.type-fairy {
  border-color: var(--type-fairy);
}
</style>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer class="mainFooter">
    <div class="footerContainer">
      <div class="footerContent">
        <div class="footerSection">
          <div class="footerLogoSection">
            <img
              src="../assets/logo1.png"
              alt="LOGO"
              class="footerPokeballLogo"
            />
            <h3 class="footerTitle">PokéDex</h3>
          </div>
          <p class="footerDescription">
            Tu compañero definitivo para explorar el mundo de Pokémon.
            ¡Descubre, busca y guarda como favoritos a tus criaturas favoritas!
          </p>
        </div>

        <div class="footerSection">
          <h4 class="footerSectionTitle">Enlaces Rápidos,</h4>
          <ul class="footerLinks">
            <li><router-link to="/" class="footerLink">Inicio</router-link></li>
            <li>
              <router-link to="/pokedex" class="footerLink"
                >Pokédex</router-link
              >
            </li>
            <li>
              <router-link to="/favorites" class="footerLink"
                >Favoritos</router-link
              >
            </li>
          </ul>
        </div>

        <div class="footerSection">
          <h4 class="footerSectionTitle">Tipos de Pokémon</h4>
          <div class="typeGrid">
            <span class="typeChip fire">Fuego</span>
            <span class="typeChip water">Agua</span>
            <span class="typeChip grass">Planta</span>
            <span class="typeChip electric">Eléctrico</span>
            <span class="typeChip psychic">Psíquico</span>
            <span class="typeChip dragon">Dragón</span>
          </div>
        </div>

        <div class="footerSection">
          <h4 class="footerSectionTitle">Acerca de</h4>
          <p class="footerText">
            Este proyecto utiliza la PokéAPI para ofrecerte información completa
            sobre Pokémon. Desarrollado con Vue.js para brindarte una
            experiencia increíble.
          </p>
          <div class="socialLinks">
            <a href="https://pokeapi.co/" target="_blank" class="socialLink">
              <span>PokéAPI</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footerBottom">
        <div class="footerBottomContent">
          <p class="copyrightText">© {{ currentYear }} Proyecto PokéDex.</p>
          <p class="disclaimerText">
            Pokémon y los nombres de los personajes de Pokémon son marcas
            registradas de Nintendo.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.mainFooter {
  background: linear-gradient(135deg, var(--dark-color), #333);
  color: white;
  margin-top: auto;
}

.footerContainer {
  max-width: 1200px;
  margin: 0 auto;
}

.footerContent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem 2rem;
}

.footerSection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footerLogoSection {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footerPokeballLogo {
  width: 35px;
  height: 35px;
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.footerTitle {
  font-size: 1.5rem;
  margin: 0;
  color: var(--accent-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.footerDescription,
.footerText {
  font-size: 0.8rem;
  line-height: 1.6;
  color: #ccc;
}

.footerSectionTitle {
  font-size: 1rem;
  color: var(--accent-color);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footerLinks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footerLink {
  color: #ccc;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
}

.footerLink:hover {
  color: var(--accent-color);
  transform: translateX(5px);
}

.typeGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.typeChip {
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.typeChip.fire {
  background: var(--type-fire);
}
.typeChip.water {
  background: var(--type-water);
}
.typeChip.grass {
  background: var(--type-grass);
}
.typeChip.electric {
  background: var(--type-electric);
}
.typeChip.psychic {
  background: var(--type-psychic);
}
.typeChip.dragon {
  background: var(--type-dragon);
}

.socialLinks {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.socialLink {
  padding: 0.5rem 1rem;
  background: var(--secondary-color);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.socialLink:hover {
  background: var(--accent-color);
  color: var(--dark-color);
  transform: translateY(-2px);
}

.footerBottom {
  border-top: 1px solid #444;
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.2);
}

.footerBottomContent {
  text-align: center;
}

.copyrightText,
.disclaimerText {
  margin: 0.5rem 0;
  font-size: 0.7rem;
  color: #999;
}

.copyrightText {
  font-weight: bold;
}

@media (max-width: 768px) {
  .footerContent {
    grid-template-columns: 1fr;
    padding: 2rem 1rem 1rem;
    gap: 1.5rem;
  }

  .footerLogoSection {
    justify-content: center;
    text-align: center;
  }

  .footerSection {
    text-align: center;
  }

  .footerLinks {
    align-items: center;
  }

  .typeGrid {
    grid-template-columns: repeat(3, 1fr);
  }

  .socialLinks {
    justify-content: center;
  }

  .footerBottom {
    padding: 1rem;
  }
}
</style>

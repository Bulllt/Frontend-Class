<script>
export default {
  name: "Home",
  methods: {
    searchByType(type) {
      this.$router.push({ path: "/pokedex", query: { type: type } });
    },
  },
};
</script>

<template>
  <div class="homeContainer">
    <section class="heroSection">
      <div class="heroContent">
        <div class="heroText">
          <h1 class="heroTitle">
            Bienvenido a la
            <span class="highlightText">PokéDex</span> Definitiva
          </h1>
          <p class="heroDescription">
            Descubre, explora y recopila información sobre todos tus Pokémon
            favoritos. ¡Tu aventura para convertirte en un Maestro Pokémon
            comienza aquí!
          </p>
          <div class="heroButtons">
            <router-link to="/pokedex" class="primaryButton">
              <span class="buttonText">Comienza a Explorar</span>
              <font-awesome-icon
                icon="fa-solid fa-bolt"
                class="buttonIcon"
                style="color: var(--type-rock)"
              />
            </router-link>
            <router-link to="/favoritos" class="secondaryButton">
              <span class="buttonText">Ver Favoritos</span>
              <font-awesome-icon
                icon="fa-solid fa-heart"
                class="buttonIcon"
                style="color: var(--type-fighting)"
              />
            </router-link>
          </div>
        </div>
        <div class="heroVisual">
          <div class="pokemonSilhouettes">
            <div class="silhouette pikachu"></div>
            <div class="silhouette charizard"></div>
            <div class="silhouette pokeball"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="featuresSection">
      <div class="featuresContainer">
        <h2 class="sectionTitle">Descubre Funciones Asombrosas</h2>
        <div class="featuresGrid">
          <div class="featureCard searchCard">
            <font-awesome-icon
              icon="fa-solid fa-search"
              class="featureIcon"
              style="color: var(--type-ice)"
            />
            <h3 class="featureTitle">Búsqueda Inteligente</h3>
            <p class="featureDescription">
              Encuentra cualquier Pokémon al instante con nuestra potente
              función de búsqueda. Busca por nombre, tipo o cualquier otro
              atributo.
            </p>
          </div>

          <div class="featureCard detailsCard">
            <font-awesome-icon
              icon="fa-solid fa-chart-bar"
              class="featureIcon"
              style="color: var(--type-psychic)"
            />
            <h3 class="featureTitle">Estadísticas Detalladas</h3>
            <p class="featureDescription">
              Accede a información completa que incluye estadísticas,
              habilidades, cadenas de evolución y mucho más de cada Pokémon.
            </p>
          </div>

          <div class="featureCard favoritesCard">
            <font-awesome-icon
              icon="fa-solid fa-star"
              class="featureIcon"
              style="color: var(--type-electric)"
            />
            <h3 class="featureTitle">Sistema de Favoritos</h3>
            <p class="featureDescription">
              Guarda tus Pokémon favoritos y crea tu propia colección personal.
              ¡Nunca pierdas de vista a tus criaturas más queridas!
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="statsSection">
      <div class="statsContainer">
        <h2 class="sectionTitle statsTitle">En Cifras</h2>
        <div class="statsGrid">
          <div class="statCard">
            <div class="statNumber">1000+</div>
            <div class="statLabel">Pokémon Disponibles</div>
          </div>
          <div class="statCard">
            <div class="statNumber">18</div>
            <div class="statLabel">Tipos Diferentes</div>
          </div>
          <div class="statCard">
            <div class="statNumber">9</div>
            <div class="statLabel">Generaciones</div>
          </div>
          <div class="statCard">
            <div class="statNumber">∞</div>
            <div class="statLabel">Aventuras a la Espera</div>
          </div>
        </div>
      </div>
    </section>

    <section class="typesSection">
      <div class="typesContainer">
        <h2 class="sectionTitle">Explora Todos los Tipos de Pokémon</h2>
        <div class="typesGrid">
          <div class="typeCard normal" @click="searchByType('normal')">
            <span class="typeName">Normal</span>
          </div>
          <div class="typeCard fire" @click="searchByType('fire')">
            <span class="typeName">Fuego</span>
          </div>
          <div class="typeCard water" @click="searchByType('water')">
            <span class="typeName">Agua</span>
          </div>
          <div class="typeCard electric" @click="searchByType('electric')">
            <span class="typeName">Eléctrico</span>
          </div>
          <div class="typeCard grass" @click="searchByType('grass')">
            <span class="typeName">Planta</span>
          </div>
          <div class="typeCard ice" @click="searchByType('ice')">
            <span class="typeName">Hielo</span>
          </div>
          <div class="typeCard fighting" @click="searchByType('fighting')">
            <span class="typeName">Lucha</span>
          </div>
          <div class="typeCard poison" @click="searchByType('poison')">
            <span class="typeName">Veneno</span>
          </div>
          <div class="typeCard ground" @click="searchByType('ground')">
            <span class="typeName">Tierra</span>
          </div>
          <div class="typeCard flying" @click="searchByType('flying')">
            <span class="typeName">Volador</span>
          </div>
          <div class="typeCard psychic" @click="searchByType('psychic')">
            <span class="typeName">Psíquica</span>
          </div>
          <div class="typeCard bug" @click="searchByType('bug')">
            <span class="typeName">Bicho</span>
          </div>
          <div class="typeCard rock" @click="searchByType('rock')">
            <span class="typeName">Roca</span>
          </div>
          <div class="typeCard ghost" @click="searchByType('ghost')">
            <span class="typeName">Fantasma</span>
          </div>
          <div class="typeCard dragon" @click="searchByType('dragon')">
            <span class="typeName">Dragón</span>
          </div>
          <div class="typeCard dark" @click="searchByType('dark')">
            <span class="typeName">Siniestro</span>
          </div>
          <div class="typeCard steel" @click="searchByType('steel')">
            <span class="typeName">Acero</span>
          </div>
          <div class="typeCard fairy" @click="searchByType('fairy')">
            <span class="typeName">Hada</span>
          </div>
        </div>
      </div>
    </section>

    <section class="ctaSection">
      <div class="ctaContainer">
        <div class="ctaContent">
          <h2 class="ctaTitle">Listo para comenzar tu aventura?</h2>
          <p class="ctaDescription">
            Únete a miles de entrenadores que ya han comenzado su aventura. ¡El
            mundo de Pokémon te está esperando!
          </p>
          <router-link to="/pokedex" class="ctaButton">
            Comienza el viaje
            <span class="ctaButtonIcon">🚀</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homeContainer {
  min-height: 100vh;
  overflow-x: hidden;
}

.heroSection {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  padding: 4rem 2rem;
  min-height: 75vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.heroContent {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.heroTitle {
  font-size: 3rem;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
}

.highlightText {
  color: var(--accent-color);
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
}

.heroDescription {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.heroButtons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primaryButton,
.secondaryButton {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 180px;
  justify-content: center;
}

.primaryButton {
  background: var(--accent-color);
  color: var(--dark-color);
}

.secondaryButton {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.primaryButton:hover,
.secondaryButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.primaryButton:hover {
  background: #ffed4a;
}

.buttonIcon {
  font-size: 1.2rem;
}

.heroVisual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemonSilhouettes {
  position: relative;
  width: 300px;
  height: 300px;
}

.silhouette {
  position: absolute;
  border-radius: 50%;
  animation: bounce 3s ease-in-out infinite;
}

.pikachu {
  width: 80px;
  height: 80px;
  background: var(--accent-color);
  top: 20px;
  right: 20px;
  animation-delay: -1s;
}

.charizard {
  width: 100px;
  height: 100px;
  background: var(--type-fire);
  bottom: 30px;
  left: 10px;
  animation-delay: -2s;
}

.pokeball {
  width: 120px;
  height: 120px;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid var(--primary-color);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.featuresSection {
  padding: 4rem 2rem;
  background: white;
}

.featuresContainer {
  max-width: 1200px;
  margin: 0 auto;
}

.sectionTitle {
  text-align: center;
  font-size: 2.5rem;
  color: var(--dark-color);
  margin: 0 0 3rem 0;
  position: relative;
}

.sectionTitle::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
}

.featuresGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.featureCard {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.featureCard:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.searchCard:hover {
  border-color: var(--type-electric);
}
.detailsCard:hover {
  border-color: var(--type-psychic);
}
.favoritesCard:hover {
  border-color: var(--type-fairy);
}

.featureIcon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.featureTitle {
  font-size: 1.5rem;
  color: var(--dark-color);
  margin: 0 0 1rem 0;
}

.featureDescription {
  color: #666;
  line-height: 1.6;
  font-size: 0.9rem;
}

.statsSection {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--dark-color), #333);
  color: white;
}

.statsContainer {
  max-width: 1200px;
  margin: 0 auto;
}

.statsTitle {
  color: white;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.statCard {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.statCard:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.15);
}

.statNumber {
  font-size: 3rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.statLabel {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.typesSection {
  padding: 4rem 2rem;
  background: var(--background-color);
}

.typesContainer {
  max-width: 1200px;
  margin: 0 auto;
}

.typesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.typeCard {
  padding: 1.5rem 1rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  position: relative;
  overflow: hidden;
}

.typeCard::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.typeCard:hover::before {
  left: 100%;
}

.typeCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.typeCard.normal {
  background: var(--type-normal);
}
.typeCard.fire {
  background: var(--type-fire);
}
.typeCard.water {
  background: var(--type-water);
}
.typeCard.electric {
  background: var(--type-electric);
}
.typeCard.grass {
  background: var(--type-grass);
}
.typeCard.ice {
  background: var(--type-ice);
}
.typeCard.fighting {
  background: var(--type-fighting);
}
.typeCard.poison {
  background: var(--type-poison);
}
.typeCard.ground {
  background: var(--type-ground);
}
.typeCard.flying {
  background: var(--type-flying);
}
.typeCard.psychic {
  background: var(--type-psychic);
}
.typeCard.bug {
  background: var(--type-bug);
}
.typeCard.rock {
  background: var(--type-rock);
}
.typeCard.ghost {
  background: var(--type-ghost);
}
.typeCard.dragon {
  background: var(--type-dragon);
}
.typeCard.dark {
  background: var(--type-dark);
}
.typeCard.steel {
  background: var(--type-steel);
}
.typeCard.fairy {
  background: var(--type-fairy);
}

.typeName {
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
}

.ctaSection {
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    var(--secondary-color),
    var(--primary-color)
  );
  color: white;
}

.ctaContainer {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.ctaTitle {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.ctaDescription {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.ctaButton {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3rem;
  background: var(--accent-color);
  color: var(--dark-color);
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.ctaButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  background: #ffed4a;
}

.ctaButtonIcon {
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .heroContent {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .heroTitle {
    font-size: 2rem;
  }

  .heroVisual {
    order: -1;
  }

  .pokemonSilhouettes {
    width: 200px;
    height: 200px;
  }

  .pikachu {
    width: 60px;
    height: 60px;
  }

  .charizard {
    width: 70px;
    height: 70px;
  }

  .pokeball {
    width: 80px;
    height: 80px;
  }

  .heroButtons {
    justify-content: center;
  }

  .primaryButton,
  .secondaryButton {
    min-width: 160px;
    padding: 0.8rem 1.5rem;
  }

  .featuresGrid {
    grid-template-columns: 1fr;
  }

  .sectionTitle {
    font-size: 2rem;
  }

  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .typesGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .ctaTitle {
    font-size: 1.8rem;
  }

  .ctaButton {
    padding: 1.2rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .heroSection {
    padding: 2rem 1rem;
  }

  .featuresSection,
  .statsSection,
  .typesSection,
  .ctaSection {
    padding: 2rem 1rem;
  }

  .statsGrid {
    grid-template-columns: 1fr;
  }

  .typesGrid {
    grid-template-columns: 1fr;
  }
}
</style>

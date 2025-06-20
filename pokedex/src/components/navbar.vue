<script>
export default {
  name: "Navbar",
  data() {
    return {
      isSpinning: false,
      isMobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
  },
};
</script>

<template>
  <nav class="navbarContainer">
    <div class="navbarContent">
      <a href="/" class="logoSection">
        <img src="../assets/logo.png" alt="LOGO" class="pokeballLogo" />
        <h1 class="logoText">POKÉDEX</h1>
      </a>

      <div class="navigationLinks">
        <router-link to="/" class="navLink" active-class="activeLink">
          <font-awesome-icon icon="fa-solid fa-home" class="navIcon" />
          <span class="navText">INICIO</span>
        </router-link>
        <router-link to="/pokedex" class="navLink" active-class="activeLink">
          <font-awesome-icon icon="fa-solid fa-search" class="navIcon" />
          <span class="navText">BUSCAR</span>
        </router-link>
        <router-link to="/favoritos" class="navLink" active-class="activeLink">
          <font-awesome-icon icon="fa-solid fa-star" class="navIcon" />
          <span class="navText">FAVORITOS</span>
        </router-link>
      </div>

      <button
        class="mobileMenuButton"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span class="menuLine"></span>
        <span class="menuLine"></span>
        <span class="menuLine"></span>
      </button>
    </div>

    <div class="mobileMenu" :class="{ open: isMobileMenuOpen }">
      <router-link to="/" class="mobileNavLink" @click="closeMobileMenu">
        <font-awesome-icon icon="fa-solid fa-home" class="navIcon" />
        <span class="navText">INICIO</span>
      </router-link>
      <router-link to="/pokedex" class="mobileNavLink" @click="closeMobileMenu">
        <font-awesome-icon icon="fa-solid fa-search" class="navIcon" />
        <span class="navText">BUSCAR</span>
      </router-link>
      <router-link
        to="/favoritos"
        class="mobileNavLink"
        @click="closeMobileMenu"
      >
        <font-awesome-icon icon="fa-solid fa-star" class="navIcon" />
        <span class="navText">FAVORITOS</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbarContainer {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid var(--accent-color);
}

.navbarContent {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logoSection {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  text-decoration: none;
}

.pokeballLogo {
  width: 40px;
  height: 40px;
  position: relative;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logoText {
  color: white;
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.navigationLinks {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navLink {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: bold;
  border: 2px solid transparent;
}

.navLink:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.activeLink {
  background: var(--accent-color);
  color: var(--dark-color);
  border-color: var(--accent-color);
}

.navIcon {
  width: 18px;
  height: 18px;
}

.navText {
  font-size: 1rem;
}

.mobileMenuButton {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
}

.menuLine {
  width: 25px;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobileMenuButton.active .menuLine:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobileMenuButton.active .menuLine:nth-child(2) {
  opacity: 0;
}

.mobileMenuButton.active .menuLine:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobileMenu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  padding: 1rem 2rem;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobileMenu.open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobileNavLink {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.mobileNavLink:hover {
  color: var(--accent-color);
  padding-left: 1rem;
}

.mobileNavLink:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .navbarContent {
    padding: 1rem;
  }

  .navigationLinks {
    display: none;
  }

  .mobileMenuButton {
    display: flex;
  }

  .logoText {
    font-size: 1rem;
  }

  .pokeballLogo {
    width: 35px;
    height: 35px;
  }

  .pokeballTop,
  .pokeballBottom {
    width: 35px;
    height: 17.5px;
  }

  .pokeballMiddle {
    width: 39px;
  }
}

@media (max-width: 480px) {
  .logoText {
    font-size: 0.8rem;
  }

  .logoSection {
    gap: 0.5rem;
  }
}
</style>

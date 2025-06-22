import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/home.vue";
import Pokedex from "../screens/pokedex.vue";
import Favorites from "../screens/favorites.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokedex",
    name: "Pokedex",
    component: Pokedex,
  },
  {
    path: "/favoritos",
    name: "Favorites",
    component: Favorites,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/home.vue";
import Pokedex from "../screens/pokedex.vue";
import Favorites from "../screens/favorites.vue";
import Details from "../screens/details.vue";

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
  {
    path: "/detalles/:id",
    name: "Details",
    component: Details,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

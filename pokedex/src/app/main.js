import { createApp } from "vue";
import "./App.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faSearch,
  faStar,
  faBolt,
  faHeart,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { router } from "../constants/router";

library.add(faHome, faSearch, faStar, faBolt, faHeart, faChartBar);

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

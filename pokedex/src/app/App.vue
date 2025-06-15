<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";
</script>

<template>
  <Navbar />

  <main>
    <RouterView />
  </main>

  <Footer />
</template>

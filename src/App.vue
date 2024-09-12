<template>
  <div :class="{ 'dark': darkMode }" id="app">
    <sidebar-menu />
    <div class="content">
      <header class="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Explora los Paises!!</h1>
        
        <!-- Botón de modo oscuro solo en la ruta '/'. -->
        <div v-if="isCountryListRoute" class="flex items-center">
          <button @click="toggleDarkMode" class="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300">
            <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './components/SidebarMenu.vue';

export default {
  components: {
    SidebarMenu,
  },
  data() {
    return {
      darkMode: false,
    };
  },
  computed: {
    // Computed property to check if the current route is '/';
    isCountryListRoute() {
      return this.$route.path === '/';
    }
  },
  watch: {
    // Watch for route changes and reset darkMode
    '$route.path': function(newPath) {
      if (newPath !== '/') {
        this.darkMode = false; // or true if you want to set a specific mode
      }
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  transition: background-color 0.3s, color 0.3s;
}

.content {
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 20px;
}

header {
  text-align: center;
  padding: 10px;
  background-color: #f4f4f4;
}

.dark header {
  background-color: #2d3748;
  color: #e2e8f0;
}

.dark #app {
  background-color: #1a202c;
  color: #e2e8f0;
}
</style>

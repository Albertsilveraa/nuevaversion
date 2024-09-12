<template>
  <div>
    <div :class="{ 'dark': darkMode }" class="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
      <div class="p-4 max-w-7xl mx-auto">
        <!-- Botón de alternar modo oscuro/claro -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Disfruta</h2>
          <div class="w-8"></div> 
        </div>

        <!-- Search bar -->
        <div class="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Busqueda de paises..." 
              @focus="showDropdown = true"
              @blur="hideDropdown"
              class="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <!-- Continents dropdown -->
            <div 
            v-if="showDropdown" 
          class="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl z-10 w-full sm:w-[500px] p-5 grid grid-cols-1 gap-6"
          @mousedown.prevent
            >
              <!-- Title -->
              <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-700 dark:text-gray-300">Filtrado por continentes</h3>
            <button 
              @click="clearFilters" 
              class="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Limpiar
            </button>
          </div>

              <!-- Grid of continents -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div 
                  v-for="continent in continents" 
                  :key="continent" 
                  class="cursor-pointer text-center transition-transform transform hover:scale-105"
                  @click="selectContinent(continent)"
                >
                  <img 
                    :src="continentImages[continent]" 
                    :alt="continent" 
                    class="w-full h-24 object-cover rounded-lg mb-2"
                  >
                  <div class="text-base font-medium text-white-700">{{ continent }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Countries grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="country in filteredCountries" 
            :key="country.code" 
            class="bg-white border border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
            @click="selectCountry(country)"
          >
            <img :src="country.imageUrl" :alt="country.name" class="w-full h-48 object-cover">
            <div class="p-4">
              <div class="flex items-center">
                <img :src="country.flagUrl" :alt="country.name + ' flag'" class="w-6 h-4 mr-2">
                <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ country.name }}</div>
              </div>
              <div class="mt-2 text-sm text-gray-800 dark:text-gray-300">
                <div>{{ country.continentName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div 
  v-if="selectedCountry" 
  class="fixed inset-0 flex items-center justify-end z-50"
  @click.self="selectedCountry = null"
>
  <!-- Transición del modal -->
  <transition name="fade-slide" mode="out-in">
    <div 
      class="bg-white dark:bg-gray-900 rounded-l-lg shadow-xl max-w-sm w-full h-auto max-h-[90vh] overflow-y-auto transition-transform transform duration-300"
      key="modal"
    >
      <div class="relative">
        <img :src="selectedCountry.imageUrl" :alt="selectedCountry.name" class="w-full h-48 object-cover rounded-t-lg">
        <button 
          @click="selectedCountry = null"
          class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-4">
        <h3 class="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 flex items-center">
          <img :src="selectedCountry.flagUrl" :alt="selectedCountry.name + ' flag'" class="w-8 h-6 mr-2">
          {{ selectedCountry.name }}
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Code:</strong> {{ selectedCountry.code }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Capital:</strong> {{ selectedCountry.capital }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Language:</strong> {{ selectedCountry.languages[0].name }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Currency:</strong> {{ selectedCountry.currency }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Continent:</strong> {{ selectedCountry.continent.name }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Region:</strong> {{ selectedCountry.awsRegion }}</p>
      </div>
    </div>
  </transition>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from '@apollo/client/core';
import { createApi } from 'unsplash-js';
import axios from 'axios';

const unsplash = createApi({
  accessKey: '5iwtLE_9yP0Oo2P62Ie5-RK29huYgHeqGhBOhRvK78M',
});

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      currency
      languages {
        name
      }
      continent {
        name
      }
     awsRegion
      states {
        name
      }
    }
  }
`;

export default {
  data() {
    return {
      countries: [],
      searchQuery: '',
      selectedContinent: '',
      selectedCountry: null,
      continents: [],
      showDropdown: false,
      imageCache: {},
      rateLimitExceeded: false,
      continentImages: {
        Africa: require('@/assets/images/africa.jpg'),
        America: require('@/assets/images/america.jpg'),
        Asia: require('@/assets/images/asia.jpg'),
        Europe: require('@/assets/images/europa.jpg'),
        Oceania: require('@/assets/images/oceania.jpg'),
        Antarctica: require('@/assets/images/antartica.jpg')
      },
      darkMode: false
    };
  },
  computed: {
    filteredCountries() {
      const query = this.searchQuery.toLowerCase();
      const continentFilter = this.selectedContinent;

      return this.countries.filter(country => {
        const matchesQuery = country.name.toLowerCase().includes(query);
        const matchesContinent = continentFilter ? country.continentName === continentFilter : true;
        return matchesQuery && matchesContinent;
      });
    }
  },
  methods: {
    selectCountry(country) {
      this.selectedCountry = country;
    },
    selectContinent(continent) {
      this.selectedContinent = continent;
      this.showDropdown = false;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    clearFilters() {
      this.searchQuery = '';
      this.selectedContinent = null;
    },
    async fetchCountryImage(countryName, capitalName) {
      const queries = [
        `${countryName} landscape`,
        `${capitalName} landscape`,
        `${countryName} city`,
        `${capitalName} city`
      ];

      for (const query of queries) {
        if (this.imageCache[query]) return this.imageCache[query];

        try {
          const result = await unsplash.search.getPhotos({
            query,
            perPage: 1,
            orientation: 'landscape',
          });
          if (result.response.results.length > 0) {
            const imageUrl = result.response.results[0].urls.regular;
            this.imageCache[query] = imageUrl;
            return imageUrl;
          }
        } catch (error) {
          if (error.status === 403) {
            this.rateLimitExceeded = true;
            console.error('Rate limit exceeded');
            await this.delay(3600000);
            return 'path/to/default/image.jpg';
          }
          console.error(`Error fetching image for ${query}:`, error);
        }
      }

      return 'path/to/default/image.jpg';
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async fetchCountryFlags() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data.reduce((acc, country) => {
          acc[country.cca2] = country.flags.svg;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching flags:', error);
        return {};
      }
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
  async mounted() {
    try {
      const [countriesResult, flags] = await Promise.all([
        this.$apollo.query({ query: GET_COUNTRIES }),
        this.fetchCountryFlags()
      ]);

      this.countries = await Promise.all(countriesResult.data.countries.map(async country => {
        try {
          const imageUrl = await this.fetchCountryImage(country.name, country.capital);
          return {
            ...country,
            continentName: ['North America', 'South America'].includes(country.continent.name) ? 'America' : country.continent.name,
            imageUrl,
            flagUrl: flags[country.code] || 'path/to/default/flag.jpg'
          };
        } catch (error) {
          console.error(`Error fetching image for ${country.name}:`, error);
          return {
            ...country,
            continentName: ['North America', 'South America'].includes(country.continent.name) ? 'America' : country.continent.name,
            imageUrl: 'path/to/default/image.jpg',
            flagUrl: flags[country.code] || 'path/to/default/flag.jpg'
          };
        }
      }));

      this.continents = [...new Set(this.countries.map(country => country.continentName))];
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }
};
</script>

<style>
.dark {
  background-color: #1a202c; 
  color: #e2e8f0; 
}
.light {
  background-color: #ffffff; 
  color: #2d3748; 
}
.dark .bg-white {
  background-color: #2d3748;
}
.dark .text-gray-900 {
  color: #e2e8f0;
}
.dark .bg-gray-300 {
  background-color: #4a5568;
}
.dark .border-gray-300 {
  border-color: #4a5568;
}
</style>

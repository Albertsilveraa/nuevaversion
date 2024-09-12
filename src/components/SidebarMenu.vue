<template>
  <div class="sidebar bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6 fixed top-0 left-0 h-full w-64 md:w-72 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <h3 class="text-lg font-semibold mb-6">Menu</h3>
    <ul class="space-y-4">
      <li>
        <router-link
          to="/"
          class="block text-base rounded-md p-2 transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
          to="/about"
          class="block text-base rounded-md p-2 transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-500 dark:hover:text-blue-300"
        >
          About
        </router-link>
      </li>
      <li>
        <router-link
          to="/contact"
          class="block text-base rounded-md p-2 transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Contact
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu'
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  transition: background-color 0.3s, color 0.3s;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

a:hover {
  color: #007bff;
}

.dark .sidebar {
  background-color: #2d3748; 
}

.dark a {
  color: #e2e8f0; 
}
</style>

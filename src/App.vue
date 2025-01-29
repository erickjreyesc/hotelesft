<template>
  <div class="container">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
          <a class="navbar-brand me-2" href="#">HOTELES DECAMERON DE COLOMBIA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="justify-content-end collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link active" aria-current="page">
                  <i class="fa-solid fa-house text-white"></i>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/hoteles" class="nav-link">Hoteles</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/resumen-general" class="nav-link">Resumen</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div v-if="isLoading" class="global-loader"></div>
    <RouterView v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useLoaderStore } from '../store/LoaderStore';

export default defineComponent({
  setup() {
    const loaderStore = useLoaderStore();

    onMounted(() => {
      loaderStore.setLoading(true);
      setTimeout(() => {
        loaderStore.setLoading(false);
      }, 2000); // Simulación de carga
    });

    return {
      isLoading: loaderStore.$state.isLoading,
    };
  },
});
</script>

<style scoped>
.global-loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
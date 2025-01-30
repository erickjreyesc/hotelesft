<template>
    <div class="row mt-3">
        <div class="col-sm-6">
            <h1 class="my-3 h4 text-success fw-bold">Resumen</h1>
        </div>
        <div class="col-sm-6 text-end">
            <RouterLink :to="{ name: 'hotel' }" class="btn btn-info rounded text-white">
                <i class="fa-solid fa-rotate-left me-1"></i>Volver
            </RouterLink>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <h1 class="h5 fw-bold text-success my-3">Datos del Hotel</h1>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                    <th>NOMBRE</th>
                    <td>{{ hotel.nombre }}</td>
                    <th>DIRECCIÓN</th>
                    <td>{{ hotel.direccion }}</td>
                </tr>
                <tr>
                    <th>CIUDAD</th>
                    <td>{{ hotel.ciudad?.data.nombre }}</td>
                    <th>NIT</th>
                    <td>{{ hotel.nit }}</td>
                </tr>
                <tr>
                    <th>Nro. Habitaciones</th>
                    <td colspan="3">
                        {{ hotel.totalhab }}
                    </td>
                </tr>
                </tbody>
            </table>
            <h2 class="h5 fw-bold text-success my-3">Cantidad de habitaciones</h2>
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>CANTIDAD</th>
                        <th>TIPO HABITACIÓN</th>
                        <th>ACOMODACIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="habitacion in hotel.habitaciones" :key="habitacion.id">
                        <td>{{ habitacion.canthab }}</td>
                        <td>{{ habitacion.habitacion.data.nombre }}</td>
                        <td>{{ habitacion.acomodacion.data.nombre }}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script setup>
import apiRoutes from '@/router/ApiRoutes';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const hotel = ref({});

const fetchHotelData = async (element_id) => {
    try {
        const response = await fetch(apiRoutes.getHoteles.url + "/" + element_id);
        const data = await response.json();
        hotel.value = data.data;
    } catch (error) {
        console.error('Error al cargar los datos del hotel:', error);
    }
};

onMounted(() => {
    const elementId = route.params.elementId; // Obtener el parámetro de la URL
    if (elementId) {
        fetchHotelData(elementId);
    }
});
</script>
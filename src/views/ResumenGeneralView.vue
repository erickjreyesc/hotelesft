<template>
    <div class="row mt-3">
        <div class="col-sm-6">
            <h1 class="my-3 h4 text-success fw-bold">Resumen General</h1>
        </div>
        <div class="col-sm-6 text-end">
            <RouterLink :to="{ name: 'hotel' }" class="btn btn-info rounded text-white">
                <i class="fa-solid fa-rotate-left me-1"></i>Volver
            </RouterLink>
        </div>
    </div>
    <div class="row">
        <div class="col-12" v-for="hotel in hoteles" :key="hotel.id">

            <h1 class="h5 fw-bold text-success my-3">Datos del Hotel Id: {{ hotel.id }}</h1>
            <table class="table table-bordered">
                <tr>
                    <th>NOMBRE</th>
                    <td>{{ hotel.nombre }}</td>
                    <th>DIRECCIÓN</th>
                    <td>{{ hotel.direccion }}</td>
                </tr>
                <tr>
                    <th>CIUDAD</th>
                    <td>{{ hotel.ciudad.data.nombre }}</td>
                    <th>NIT</th>
                    <td>{{ hotel.nit }}</td>
                </tr>
                <tr>
                    <th>Nro. Habitaciones</th>
                    <td colspan="3">
                        {{ hotel.totalhab }}
                    </td>
                </tr>
            </table>
            <table class="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>CANTIDAD</th>
                        <th>TIPO HABITACIÓN</th>
                        <th>ACOMODACIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hab in hotel.habitaciones.data" :key="hab.id">
                        <td>{{ hab.canthab }}</td>
                        <td>{{ hab.habitacion.data.nombre }}</td>
                        <td>{{ hab.acomodacion.data.nombre }}</td>
                    </tr>
                </tbody>
            </table>
            <hr v-if="hotel.length > 0">
        </div>
    </div>

</template>

<script setup>
import apiRoutes from '@/router/ApiRoutes';
import { onMounted, ref } from 'vue';
const hoteles = ref({});

const fetchHotelData = async () => {
    try {
        const response = await fetch(apiRoutes.getHoteles.url);

        const data = await response.json();
        console.log(data);

        hoteles.value = data.data;
    } catch (error) {
        console.error('Error al cargar los datos del hotel:', error);
    }
};

onMounted(() => {
    fetchHotelData();
});
</script>
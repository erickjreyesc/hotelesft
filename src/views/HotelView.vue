<template>
    <div class="row mt-3">
        <div class="col-sm-6">
            <h1 class="h5">Hoteles</h1>
        </div>
        <div class="col-sm-6 text-end">
            <RouterLink :to="{ name: 'hotel-form' }" class="btn btn-success rounded">
                <i class="fa-solid fa-plus me-1"></i>Agregar
            </RouterLink>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <ClipLoader v-if="loading" />
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.id">
                        <td>
                            <b>{{ item.nombre }}</b> <br>
                            <small>{{ item.nit }}</small>
                        </td>
                        <td>{{ item.direccion }} <br>
                            <small>{{ item.ciudad.data.nombre }}</small>
                        </td>
                        <td>
                            <span v-if="item.estado">
                                <i class="fa-solid fa-circle-check text-success"></i>
                            </span>
                            <span v-else>
                                <i class="fa-solid fa-circle-xmark text-danger"></i>
                            </span>
                        </td>
                        <td>{{ item.totalhab }}</td>
                        <td>
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class="fa-solid fa-bars text-white"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <RouterLink :to="{ name: 'hotel-form', params: { elementId: item.id } }"
                                            class="dropdown-item text-primary" type="button">
                                            <i class="fa-solid fa-pencil me-1"></i> Editar
                                        </RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink :to="{ name: 'resumen', params: { elementId: item.id } }"
                                            class="dropdown-item text-info" type="button">
                                            <i class="fa-solid fa-table me-1"></i> Resumen
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import apiRoutes from '@/router/ApiRoutes';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useLoaderStore } from '../../store/LoaderStore';

export default {
    setup() {
        const data = ref([]);
        const loaderStore = useLoaderStore();
        const fetchData = async () => {
            loaderStore.setLoading(true);
            try {
                const response = await fetch(apiRoutes.getHoteles.url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                data.value = result.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                loaderStore.setLoading(false);
            }
        };
        onMounted(fetchData);
        return {
            data
        };
    },
};
</script>
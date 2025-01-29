<template>
    <div>
        <div class="row mt-3">
            <div class="col-sm-6">
                <h1 class="my-3 h4 text-success fw-bold">{{ form.element_id ? 'Editar' : 'Crear' }} Elemento</h1>
            </div>
            <div class="col-sm-6 text-end">
                <RouterLink :to="{ name: 'hotel' }" class="btn btn-info rounded text-white">
                    <i class="fa-solid fa-rotate-left me-1"></i>Volver
                </RouterLink>
            </div>
        </div>
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="departamento_id">Departamento:</label>
                    <select v-model="form.departamento_id" @change="fetchCiudades" class="form-control"
                        id="departamento_id">
                        <option value="">Selecciona un departamento</option>
                        <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">
                            {{ departamento.nombre }}
                        </option>
                    </select>
                    <span v-if="errors.departamento_id">{{ errors.departamento_id.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="ciudad_id">Ciudad:</label>
                    <select v-model="form.ciudad_id" class="form-control" id="ciudad_id"
                        :class="{ error: errors.ciudad_id }">
                        <option value="">Selecciona una ciudad</option>
                        <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">
                            {{ ciudad.nombre }}
                        </option>
                    </select>
                    <span v-if="errors.ciudad_id">{{ errors.ciudad_id.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="nombre">Nombre:</label>
                    <input type="text" v-model="form.nombre" :class="['form-control', { error: errors.nombre }]"
                        id="nombre" />
                    <span v-if="errors.nombre">{{ errors.nombre.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="nit">NIT:</label>
                    <input type="text" v-model="form.nit" :class="['form-control', { error: errors.nit }]" id="nit" />
                    <span v-if="errors.nit">{{ errors.nit.join(', ') }}</span>
                </div>
                <div class="col-lg-8 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="direccion">Dirección:</label>
                    <input type="text" v-model="form.direccion" :class="['form-control', { error: errors.direccion }]"
                        id="direccion" />
                    <span v-if="errors.direccion">{{ errors.direccion.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="telefono">Teléfono:</label>
                    <input type="text" v-model="form.telefono" :class="['form-control', { error: errors.telefono }]"
                        id="telefono" />
                    <span v-if="errors.telefono">{{ errors.telefono.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="correo">Correo:</label>
                    <input type="email" v-model="form.correo" :class="['form-control', { error: errors.correo }]"
                        id="correo" />
                    <span v-if="errors.correo">{{ errors.correo.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="cantidad">Cantidad de habitaciones:</label>
                    <input type="number" v-model="form.totalhab" class="form-control" id="totalhab" :min="1" :max="1000"
                        :class="{ error: errors.totalhab }" />
                    <span v-if="errors.totalhab">{{ errors.totalhab.join(', ') }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
                    <label class="mb-2" for="estado">Estado:</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" role="switch" v-model="form.estado" :class="['form-check-input']"
                            id="estado">
                        <label class="form-check-label text-primary" for="estado">
                            <span v-if="form.estado">Activo</span>
                            <span v-else>Inactivo</span>
                        </label>
                    </div>
                    <span v-if="errors.estado">{{ errors.estado.join(', ') }}</span>
                </div>
                <div class="col-12 d-flex justify-content-end py-2">
                    <button type="submit" class="btn btn-primary">
                        <i class="fa-solid fa-floppy-disk me-2"></i>Guardar
                    </button>
                </div>
            </div>
        </form>
        <div class="row">
            <div v-if="form.element_id">
                <h3>Edición y carga de habitaciones</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Habitación</th>
                            <th>Acomodación</th>
                            <th>Número de Habitaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(habitacion, index) in habitaciones" :key="index">
                            <td>{{ form.element_id }}</td>
                            <td><input type="text" v-model="habitacion.habitacion_id" /></td>
                            <td><input type="text" v-model="habitacion.acomodacion_id" /></td>
                            <td><input type="number" v-model="habitacion.nro_habitaciones" /></td>
                        </tr>
                    </tbody>
                </table>
                <button @click="addHabitacion">Agregar Habitación</button>
                <button @click="submitHabitaciones">Guardar Habitaciones</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import apiRoutes from '@/router/ApiRoutes';
import { showAlert } from '@/scripts/alerts';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const form = ref({
    departamento_id: '',
    ciudad_id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    estado: false,
    nit: '',
    totalhab: 0,
    element_id: ''
});

const habitaciones = ref({
    regId: '',
    habitacion_id: '',
    acomodacion_id: '',
    canthab: 0,
});

const departamentos = ref([]);
const ciudades = ref([]);
const errors = ref({});

const fetchDepartamentos = async () => {
    try {
        const response = await fetch(apiRoutes.getDepartamento.url);
        const resultDep = await response.json();
        departamentos.value = await resultDep.data;
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
    }
};

const fetchCiudades = async () => {
    if (form.value.departamento_id) {
        try {
            const response = await fetch(apiRoutes.getCiudadDepartamento.url + form.value.departamento_id);
            const resultCdd = await response.json();
            ciudades.value = await resultCdd.data;
        } catch (error) {
            console.error('Error al obtener las ciudades:', error);
        }
    } else {
        ciudades.value = [];
    }
};

const fetchNombre = async () => {
    if (form.value.ciudad_id) {
        try {
            const response = await fetch(apiRoutes.getNombreCiudad.url + form.value.ciudad_id);
            const resultCdd = await response.json();
            form.value.nombre = 'DECAMERON ' + resultCdd.data; // Actualiza el campo nombre con el valor obtenido
        } catch (error) {
            console.error('Error al obtener el nombre:', error);
        }
    } else {
        form.value.nombre = '';
    }
};

watch(() => form.value.departamento_id, fetchCiudades);
watch(() => form.value.ciudad_id, fetchNombre);

const submitForm = async () => {
  try {
    errors.value = {};
    const url = form.value.element_id ? `${apiRoutes.getHoteles.url}${form.value.element_id}` : apiRoutes.getHoteles.url;
    const method = form.value.element_id ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });
    const data = await response.json();

    if (!response.ok) {
      errors.value = data.errors || {};
    } else {
      showAlert('success', 'Enviado', data.data);
      errors.value = {};
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};


const addHabitacion = () => {
    habitaciones.value.push({
        habitacion_id: '',
        acomodacion_id: '',
        nro_habitaciones: null
    });
};

const submitHabitaciones = async () => {
    try {
        const response = await fetch(apiRoutes.getHoteles.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hotel_id: form.value.element_id,
                habitaciones: habitaciones.value
            })
        });
        const data = await response.json();

        if (!response.ok) {
            showAlert('error', 'Error', 'Hubo un problema al guardar las habitaciones. Por favor, revisa los errores.');
        } else {
            showAlert('success', 'Enviado', 'Habitaciones guardadas con éxito.');
        }
    } catch (error) {
        showAlert('error', 'Error', 'Hubo un problema al guardar las habitaciones.');
    }
};

const loadHotelData = async () => {
    if (form.value.element_id) {
        try {
            const response = await fetch(apiRoutes.getHoteles.url + form.value.element_id);
            const resultload = await response.json();

            if (response.ok) {
                const hotelData = await resultload.data;
                console.log(hotelData);
                
                form.value = {
                    ...form.value,
                    nombre: hotelData.nombre,
                    direccion: hotelData.direccion,
                    telefono: hotelData.telefono,
                    correo: hotelData.correo,
                    estado: hotelData.estado,
                    nit: hotelData.nit,
                    totalhab: hotelData.totalhab,
                    ciudad_id: hotelData.ciudad.data.id,
                    departamento_id: hotelData.ciudad.data.departamento.data.id
                };
            } else {
                showAlert('error', 'Error', 'Hubo un problema al cargar los datos del hotel.');
            }
        } catch (error) {
            console.error('Error al cargar los datos del hotel:', error);
            showAlert('error', 'Error', 'Hubo un problema al cargar los datos del hotel.');
        }
    }
};

onMounted(() => {
    const elementId = route.params.elementId;
    if (elementId) {
        form.value.element_id = elementId;
        loadHotelData();
    }
});

onMounted(fetchDepartamentos);
</script>

<style scoped>
.error {
    border-color: red;
}

span {
    color: red;
}
</style>
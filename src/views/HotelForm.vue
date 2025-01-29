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
        <div class="row" v-if="hotelId">
            <hr class="mt-2">
            <div class="col-12">
                <h1 class="my-3 h4 text-success fw-bold">Habitaciones</h1>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="mb-2" for="habitacion_id">Habitación:</label>
                <select v-model="habdata.habitacion_id" @change="fetchAcomodaciones" class="form-control"
                    id="habitacion_id">
                    <option value="">Selecciona una habitación</option>
                    <option v-for="habitacion in habitaciones" :key="habitacion.id" :value="habitacion.id">
                        {{ habitacion.nombre }}
                    </option>
                </select>
                <span v-if="errors.habitacion_id">{{ errors.habitacion_id.join(', ') }}</span>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="mb-2" for="acomodacion_id">Acomodación:</label>
                <select v-model="habdata.acomodacion_id" class="form-control" id="acomodacion_id"
                    :class="{ error: errors.acomodacion_id }">
                    <option value="">Selecciona una acomodación</option>
                    <option v-for="aconomodacion in acomodaciones" :key="aconomodacion.id" :value="aconomodacion.id">
                        {{ aconomodacion.nombre }}
                    </option>
                </select>
                <span v-if="errors.acomodacion_id">{{ errors.acomodacion_id.join(', ') }}</span>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="mb-2" for="canthab">Cantidad:</label>
                <input type="number" v-model="habdata.canthab" class="form-control" id="canthab" :min="1" :max="1000"
                    :class="{ error: errors.canthab }" />
                <span v-if="errors.canthab">{{ errors.canthab.join(', ') }}</span>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-end align-items-end">
                <button type="submit" class="btn btn-success" @click="guardarHabitacionHotel">
                    <i class="fa-solid fa-floppy-disk me-2"></i>Guardar
                </button>
            </div>
            <div class="col-12 mt-3">
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
                        <tr v-for="(habhotel, index) in habitacionHotel" :key="index">
                            <td>{{ habhotel.id }}</td>
                            <td>{{ habhotel.habitacion.data.nombre }}</td>
                            <td>{{ habhotel.acomodacion.data.nombre }}</td>
                            <td>{{ habhotel.canthab }}</td>
                            <td>
                                <!-- Aquí puedes agregar botones para editar o eliminar -->
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-bars text-white"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button type="button" v-on:click="editHotelHabitacion(habhotel)"
                                                class="dropdown-item text-primary">
                                                <i class="fa-solid fa-pencil me-1"></i> Editar
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" v-on:click="alertaBorrar(habhotel)"
                                                class="dropdown-item text-danger">
                                                <i class="fa-solid fa-trash me-1"></i> Eliminar
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script setup>
import apiRoutes from '@/router/ApiRoutes';
import { deleteAlert, showAlert } from '@/scripts/alerts';
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

const habdata = ref({
    hotel_id: '',
    habitacion_id: '',
    acomodacion_id: '',
    canthab: 0,
});

const departamentos = ref([]);
const ciudades = ref([]);
const habitaciones = ref([]);
const acomodaciones = ref([]);
const habitacionHotel = ref([]);
const errors = ref({});
const isEditModeHab = ref(false);
const hotelId = ref(null);
const maxHabitaciones = ref(0);
const HabitacionId = ref(null);

const fetchDepartamentos = async () => {
    try {
        const response = await fetch(apiRoutes.getDepartamento.url);
        const resultDep = await response.json();
        departamentos.value = await resultDep.data;
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
    }
};

const fetchHabitacionHotel = async () => {
    try {
        const response = await fetch(apiRoutes.getHabitacionHotelList.url + hotelId.value);
        const resulthht = await response.json();
        habitacionHotel.value = await resulthht.data;
    } catch (error) {
        console.error('Error al obtener los Hoteles:', error);
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

const fetchHabitaciones = async () => {
    try {
        const response = await fetch(apiRoutes.getHabitacion.url);
        const resultHab = await response.json();
        habitaciones.value = await resultHab.data;
    } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
    }
};

const fetchAcomodaciones = async () => {
    const url = habdata.value.habitacion_id ? apiRoutes.getAcomodacionHab.url + habdata.value.habitacion_id : apiRoutes.getAcomodacion.url;
    try {
        const response = await fetch(url);
        const resultAcom = await response.json();
        acomodaciones.value = resultAcom.data;
    } catch (error) {
        console.error('Error al obtener las acomodaciones:', error);
    }
};

const editHotelHabitacion = async (element) => {
    habdata.value = {
        ...habdata.value,
        hotel_id: hotelId.value,
        habitacion_id: element.habitacion.data.id,
        acomodacion_id: element.acomodacion.data.id,
        canthab: element.canthab,
    };
    isEditModeHab.value = true;
    HabitacionId.value = element.id;
    if (habdata.value.habitacion_id) {
        await fetchAcomodaciones(habdata.value.habitacion_id);
    } else {
        await fetchAcomodaciones();
    }
};

const fetchTotalHabitaciones = async () => {
    try {
        const response = await fetch(apiRoutes.getContarHabitacion.url + hotelId.value);
        const resultth = await response.json();
        const totalHabitaciones = resultth.data;
        let habitacionesActuales = 0;
        if (HabitacionId.value) {
            // Busca la cantidad de habitaciones del elemento actual
            const habitacionResponse = await fetch(`${apiRoutes.getContarHabitacionLog.url}/${HabitacionId.value}`);
            const habitacionResult = await habitacionResponse.json();
            habitacionesActuales = habitacionResult.data;
        }
        return {
            totalHabitaciones,
            habitacionesActuales
        };
    } catch (error) {
        console.error('Error al obtener el total de habitaciones:', error);
        return 0; // Retornar 0 en caso de error para evitar bloquear el proceso
    }
};

const guardarHabitacionHotel = async () => {
    const apiUrl = isEditModeHab.value ? `${apiRoutes.getHabitacionHotel.url}/${HabitacionId.value}` : apiRoutes.getHabitacionHotel.url;
    const method = isEditModeHab.value ? 'PUT' : 'POST';

    const { totalHabitaciones, habitacionesActuales } = await fetchTotalHabitaciones(hotelId.value, habdata.value.id);

    // Validar la cantidad de habitaciones ingresadas
    const nuevasHabitaciones = habdata.value.canthab;
    const habitacionesTotalesActualizadas = totalHabitaciones - habitacionesActuales + nuevasHabitaciones;

    if (habitacionesTotalesActualizadas > maxHabitaciones.value) {
        showAlert('error', 'Error', `La cantidad de habitaciones ingresadas (${habdata.value.canthab}) excede la cantidad máxima permitida (${maxHabitaciones.value})`);
        return; // Detener el guardado si la validación falla
    }
    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(habdata.value)
        });

        if (response.ok) {
            const result = await response.json();
            showAlert('success', 'Completado', habdata.value.id ? 'Elemento actualizado exitosamente' : 'Elemento creado exitosamente');
            isEditModeHab.value = false;
            habdata.value = {
                ...habdata.value,
                habitacion_id: '',
                acomodacion_id: '',
                canthab: 0,
            };
            fetchHabitacionHotel(); // Actualiza la tabla después de guardar
        } else {
            const errorResult = await response.json();
            showAlert('error', 'Error', errorResult.errors || 'Error al guardar el elemento');
        }
    } catch (error) {
        console.error('Error al guardar el elemento:', error);
        showAlert('error', 'Error', error.errors);
    }
};

const alertaBorrar = async (element) => {
    deleteAlert("¿Estás seguro de que deseas borrar este elemento nro. " + element.id + "?", apiRoutes.getHabitacionHotel.url + "/" + element.id, fetchHabitacionHotel);
};

watch(() => form.value.departamento_id, fetchCiudades);
watch(() => form.value.ciudad_id, fetchNombre);
watch(() => habdata.value.habitacion_id, fetchAcomodaciones());

const submitForm = async () => {
    try {
        errors.value = {};
        const url = form.value.element_id ? `${apiRoutes.getHoteles.url}/${form.value.element_id}` : apiRoutes.getHoteles.url;
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
            hotelId.value = data.element_id;
            habdata.value.hotel_id = hotelId.value;
            maxHabitaciones.value = form.value.totalhab;
            showAlert('success', 'Enviado', data.data);
            errors.value = {};
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};

const loadHotelData = async () => {
    if (form.value.element_id) {
        try {
            const response = await fetch(apiRoutes.getHoteles.url + '/' + form.value.element_id);
            const resultload = await response.json();
            if (response.ok) {
                const hotelData = await resultload.data;
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
                habdata.value.hotel_id = hotelId.value;
                maxHabitaciones.value = form.value.totalhab;
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
    hotelId.value = elementId;
    if (elementId) {
        form.value.element_id = elementId;
        loadHotelData();
    }
    fetchDepartamentos();
    fetchHabitaciones();
    fetchHabitacionHotel();
});
</script>

<style scoped>
.error {
    border-color: red;
}

span {
    color: red;
}
</style>
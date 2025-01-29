const domain = 'http://localhost:8000';
// apiRoutes.js
const apiRoutes = {
    getHoteles: {
        url: domain + '/api/hoteles',
    },
    getHabitacion: {
        url: domain + '/api/habitaciones/',
    },
    getAcomodacion: {
        url: domain + '/api/acomodaciones/',
    },
    getCiudadDepartamento: {
        url: domain + '/api/ciudad/departamento/',
    },
    getAcomodacionHab: {
        url: domain + '/api/habitacion/acomodaciones/',
    },
    getHabitacionHotelList: {
        url: domain + '/api/hotel/habitaciones/listar/',
    },
    getHabitacionHotel: {
        url: domain + '/api/hotel/habitaciones',
    },
    getNombreCiudad: {
        url: domain + '/api/ciudad/nombre/',
    },
    getDepartamento: {
        url: domain + '/api/departamentos',
    },
    getContarHabitacion: {
        url: domain + '/api/hotel/habitaciones/contador/'
    },
    getContarHabitacionLog: {
        url: domain + '/api/hotel/habitacion/contador'
    }
};

export default apiRoutes;

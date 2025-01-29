const domain = 'http://localhost:8000';
// apiRoutes.js
const apiRoutes = {
    getHoteles: {
        url: domain + '/api/hoteles/',
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
    getNombreCiudad:{
        url: domain + '/api/ciudad/nombre/',
    },
    getDepartamento: {
        url: domain + '/api/departamentos',
    }
};

export default apiRoutes;

// alerts.js
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export function showAlert(icon: any, title: string, text: string) {
    Toast.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

export function deleteAlert(text: string, apiroute: string, callback: Function) {
    Swal.fire({
        title: "Advertencia",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(apiroute, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    showAlert('success', 'Completado', "Elemento borrado exitosamente");
                    callback();
                } else {
                    showAlert('error', 'Error', "Error al borrar el elemento");
                }
            } catch (error) {
                console.error('Error al borrar el elemento:', error);
            }
        }
    });
}


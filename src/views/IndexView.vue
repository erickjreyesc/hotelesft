<template>
    <div class="row mt-5">
        <div class="col-12">
            <h1 class="h5">Seleccione una opción</h1>
        </div>
        <div class="col-lg-6 col-md-12 g-3">
            <RouterLink to="/hoteles" class="text-decoration-none">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="/public/hoteles.jpg" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title fw-bold text-success">Hoteles</h5>
                                <p class="card-text">Gestione los hoteles vinculados a la cadena hotelera</p>
                            </div>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
        <div class="col-lg-6 col-md-12 g-3">
            <RouterLink to="/resumen-general" class="text-decoration-none">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="/public/informe.jpg" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title fw-bold text-success">Resumen general</h5>
                                <p class="card-text">Liste todos los hoteles con su información.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
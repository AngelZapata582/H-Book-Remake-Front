<template>
    <div class="container">
        <div class="row row-cols-12 row-cols-sm-12 row-cols-md-4 justify-content-center">
            <div class="col align-self-center">
                <router-link :to="{ name: 'menuCategory' }" class="text-decoration-none">
                    <div class="card text-light p-2 my-2"
                        style="background-color: #020202;border-radius: 1rem;border: #2B5CBA solid .3rem;min-height: 24rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor"
                            class="bi bi-tags-fill mx-auto" viewBox="0 0 16 16">
                            <path
                                d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path
                                d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                        </svg>
                        <div class="card-body text-center">
                            <h5 class="card-title">Administrar categorias</h5>
                            <p class="card-text">Adminstra las categorias. Agrega, elimina o edita las categorias existentes.</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col align-self-center">
                <router-link :to="{ name: 'menuBook' }" class="text-decoration-none">
                    <div class="card text-light p-2 my-2"
                        style="background-color: #020202;border-radius: 1rem;border: #2B5CBA solid .3rem;min-height: 24rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor"
                            class="bi bi-book-half mx-auto" viewBox="0 0 16 16">
                            <path
                                d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                        </svg>
                        <div class="card-body text-center">
                            <h5 class="card-title">Administrar libros</h5>
                            <p class="card-text">Adminstra los libros. Agrega, elimina o edita los libros existentes.</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col align-self-center">
                <router-link :to="{ name: 'menuCita' }" class="text-decoration-none">
                    <div class="card text-light p-2 my-2"
                        style="background-color: #020202;border-radius: 1rem;border: #2B5CBA solid .3rem;min-height: 24rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor"
                            class="bi bi-journal-richtext mx-auto" viewBox="0 0 16 16">
                            <path
                                d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                            <path
                                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                            <path
                                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                        <div class="card-body text-center">
                            <h5 class="card-title">Administrar citas</h5>
                            <p class="card-text">Adminstra las citas. Agrega, elimina o edita las citas existentes.</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <!-- <div class="col align-self-center">
                <div class="card text-light p-2 my-2"
                    style="background-color: #020202;border-radius: 1rem;border: #2B5CBA solid .3rem;min-height: 24rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor"
                        class="bi bi-person-square mx-auto" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <div class="card-body text-center">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
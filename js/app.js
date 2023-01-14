// Funcion para ocultar ventanas modales
function ocultarModal(id){
    let myModal = document.getElementById(id);
    let modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
}

// Funcion para desautenticar
function cerrarSesion(){
    window.location.replace('index.html');
}

function userLogged(){
    const user = localStorage.getItem('user');
    const user_logged = document.getElementById('user-logged');
    user_logged.innerHTML = user;
}
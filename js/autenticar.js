const formulario= document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
});

var user=$('#user');
var pass=$('#pass');

function autenticar(){
    if(user[0].value=='admin' && pass[0].value=='admin'){
        window.location.href="http://127.0.0.1:5500/home.html";
    }else{
        alert("Datos incorrectos");
    }
}
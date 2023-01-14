const formulario = document.getElementById('formulario');
const host = "http://192.168.137.1:8000";
const authUrl = host + "/api/auth/login/";

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = $('#user')[0].value;
    const password = $('#pass')[0].value;
    $.ajax({
        type:"POST",
        url:authUrl,
        data:{
            email,
            password
        },
        success:function(data){
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', data.user.username);
            const rol = data.user.rol;
            if(rol==='secretario'){
                document.location.href="gestionar-modulos.html";                
            }else if(rol==='planificador'){
                document.location.href="gestionar-libros.html";                
            }else if(rol==='administrador'){                
                document.location.href="home.html";
            }
        },
        dataType:"json",
        error:function(xhr,ajaxOption,Error){
            if(xhr.status==400){
                alert("Usuario y contraseña incorrectos");
            }else{
                alert("Server caido");
            }
        }
    });
});




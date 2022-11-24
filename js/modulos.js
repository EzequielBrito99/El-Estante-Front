const host = "http://192.168.137.1:8000";
const tbody = document.getElementById('tabla-tbody');
let id_ref = null;

// Funcion para vaciar tabla
function vaciarTabla(){
    document.getElementById('tabla-tbody').innerHTML="";
};

// Funcion para Listar Usuarios
function listarModulos(){
    const listarModuloUrl = host + '/api/auth/users/';
    $.ajax({
        type:"GET",
        url: listarModuloUrl,
        success:function(data){
            vaciarTabla();
            data.map((e)=>{
                const user = e.username;
                const nombre = e.first_name;
                const apellido = e.last_name;
                const rol = e.rol;
                const icono = "<i class='fa fa-close icono-delete'></i>"
                const id = e.id;

                const td_user = document.createElement('td');
                const td_nombre = document.createElement('td');
                const td_apellido = document.createElement('td');
                const td_rol = document.createElement('td');
                const td_delete = document.createElement('td');
                const td_id = document.createElement('td');

                td_user.innerHTML= user;
                td_nombre.innerHTML= nombre;
                td_apellido.innerHTML= apellido;
                td_rol.innerHTML= rol;
                td_delete.innerHTML= icono; 
                td_id.innerHTML= id; 

                td_id.setAttribute('class', 'd-none');
                td_delete.setAttribute( 'data-bs-toggle','modal');
                td_delete.setAttribute( 'data-bs-target','#modal-eliminar-usuario');
                td_delete.addEventListener('click',()=>{
                    id_ref = id;
                });

                const tr = document.createElement('tr');
                tr.className+='c-pointer';
                tr.setAttribute( 'data-bs-toggle','modal');
                tr.setAttribute( 'data-bs-target','#modal-modificar-usuario');
                tr.addEventListener('click',()=>{
                    id_ref=id;
                });

                tr.appendChild(td_user);
                tr.appendChild(td_nombre);
                tr.appendChild(td_apellido);
                tr.appendChild(td_rol);
                tr.appendChild(td_delete);
                tr.appendChild(td_id);

                document.getElementById('tabla-tbody').appendChild(tr);
                
            });
        },
        dataType:"json",
        error:function(xhr,ajaxOption,Error){
            if(xhr.status=="404"){
                alert('Server Caido');
            }
        }
    });
};
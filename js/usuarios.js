// Seccion de Gestionar usuarios
const host = "http://192.168.137.1:8000";
const tbody = document.getElementById('tabla-tbody');
let id_ref = null;


// Funcion para vaciar tabla
function vaciarTabla(){
    document.getElementById('tabla-tbody').innerHTML="";
};

// Funcion para Listar Usuarios
function listarUsuarios(){
    const listarUser = host + '/api/auth/users/';
    $.ajax({
        type:"GET",
        url: listarUser,
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



// Seccion para Insertar Usuarios
function insertarUsuarios(){
    const password = $('#pass')[0].value;
    const passwd_conf = $('#confirm-pass')[0].value;
    const first_name = $('#nombre')[0].value;
    const last_name = $('#apellidos')[0].value;
    const email = $('#email')[0].value;
    const username = $('#user')[0].value;
    const rol = $('#rol')[0].value;
    const insertarUser = host + '/api/auth/signup/';

    
    if(!validar('input-IU')){
        $.ajax({
            type:"POST",
            url: insertarUser,
            success:function(){
                vaciarTabla();
                listarUsuarios();
            },
            data: {
                password,
                passwd_conf,
                first_name,
                last_name,
                email,
                username,
                rol
            },
            error:function(xhr,ajaxOption,Error){
                if(xhr.status=="404"){
                    alert('Server Caido');
                }
            }
        });
    }

};
 

// Funcion para eliminar Usuarios
function eliminarUsuarios(id){
    const eliminarUser = host + '/api/auth/users/'+id+'/';
    $.ajax({
        type:"DELETE",
        url: eliminarUser,
        success:function(){
            vaciarTabla();
            listarUsuarios();
        },
        error:function(xhr,ajaxOption,Error){
            if(xhr.status=="404"){
                alert('Server Caido');
            }
        }
    });
}

const btn_delete = document.getElementById('btn-delete');
btn_delete.addEventListener('click', ()=>{
    eliminarUsuarios(id_ref);
});


// Funcion para modificar Usuario
function modificarUsuarios(id){
    const username = $('#user-MoU')[0].value;
    const first_name = $('#nombre-MoU')[0].value;
    const last_name = $('#apellidos-MoU')[0].value;
    const email = $('#email-MoU')[0].value;
    const rol = $('#rol-MoU')[0].value;
    const modifUser = host + '/api/auth/users/'+id+'/';

    $.ajax({
        type:"PATCH",
        url: modifUser,
        success:function(){
            vaciarTabla();
            listarUsuarios();
        },
        data:{
            username,
            first_name,
            last_name,
            email,
            rol
        },
        error:function(xhr,ajaxOption,Error){
            if(xhr.status=="404"){
                alert('Server Caido');
            }
        }
    });
};

const btn_update = document.getElementById('btn-update');
btn_update.addEventListener('click', ()=>{
    modificarUsuarios(id_ref);
});


listarUsuarios();


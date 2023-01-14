// Seccion de Gestionar libros
const host = "http://192.168.137.1:8000";
const tbody = document.getElementById('tabla-tbody');
let id_ref = null;
const token = localStorage.getItem('token');


// Funcion para vaciar tabla
function vaciarTabla(){
    document.getElementById('tabla-tbody').innerHTML="";
};

// Funcion para Listar Usuarios
function listarLibros(){
    const buscar_libros = document.getElementById('buscar-libros').value;
    const listarLibrosUrl = host + `/api/libros/?asignatura__icontains=${buscar_libros}`;
    
    $.ajax({
        headers: {
            'Authorization': `Token ${token}`
        },
        type:"GET",
        url: listarLibrosUrl,
        success:function(data){
            vaciarTabla();
            data.map((e)=>{
                const asignatura = e.asignatura;
                const unidades = e.cantidad_unidades;
                const icono_asignar = "<i class='fa fa-level-down icono-asignar'></i>";
                const icono_delete = "<i class='fa fa-close icono-delete'></i>";
                const id = e.id;

                const td_asignatura = document.createElement('td');
                const td_unidades = document.createElement('td');
                const td_asignar = document.createElement('td');
                const td_delete = document.createElement('td');
                const td_id = document.createElement('td');

                td_asignatura.innerHTML= asignatura;
                td_unidades.innerHTML= unidades;
                td_asignar.innerHTML= icono_asignar;
                td_delete.innerHTML= icono_delete; 
                td_id.innerHTML= id; 

                td_id.setAttribute('class', 'd-none');
                td_delete.setAttribute( 'data-bs-toggle','modal');
                td_delete.setAttribute( 'data-bs-target','#modal-eliminar-libro');
                td_delete.addEventListener('click',()=>{
                    id_ref = id;
                });
                td_asignar.setAttribute( 'data-bs-toggle','modal');
                td_asignar.setAttribute( 'data-bs-target','#modal-solicitar-libro');
                td_asignar.addEventListener('click',()=>{
                    id_ref = id;
                });

                const tr = document.createElement('tr');
                tr.className+='c-pointer';
                tr.setAttribute( 'data-bs-toggle','modal');
                tr.setAttribute( 'data-bs-target','#modal-modificar-libro');
                tr.addEventListener('click',()=>{
                    id_ref=id;
                });

                tr.appendChild(td_asignatura);
                tr.appendChild(td_unidades);
                tr.appendChild(td_asignar);
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


// Seccion para Insertar Libros
function insertarLibros(){
    const asignatura = $('#asignatura')[0].value;
    const cantidad_unidades = $('#cantUnid')[0].value;
    const anno_escolar = $('#anno')[0].value;
    const insertarLibrosUrl = host + '/api/libros/';
    
    if(!validar('input-IL')){
        $.ajax({
            headers: {
                'Authorization': `Token ${token}`
            },
            type:"POST",
            url: insertarLibrosUrl,
            success:function(){
                vaciarTabla();
                listarLibros();
                ocultarModal('modal-insertar-libro');
            },
            data: {
                asignatura,
                cantidad_unidades,
                anno_escolar
            },
            error:function(xhr,ajaxOption,Error){
                if(xhr.status=="404"){
                    alert('Server Caido');
                }
                console.log(xhr)
            }
        });
    }

};

// Funcion para eliminar Libros
function eliminarLibros(id){
    const eliminarLibrosUrl = host + '/api/libros/'+id+'/';
    $.ajax({
        headers: {
            'Authorization': `Token ${token}`
        },
        type:"DELETE",
        url: eliminarLibrosUrl,
        success:function(){
            vaciarTabla();
            listarLibros();
            ocultarModal('modal-eliminar-libro');
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
    eliminarLibros(id_ref);
});



// Funcion para modificar Libro
function modificarLibros(id){
    const asignatura = $('#asignatura-MoL')[0].value;
    const cantidad_unidades = $('#cantUnid-MoL')[0].value;
    const anno_escolar = $('#anno-MoL')[0].value;
    const modifLibrosUrl = host + '/api/libros/'+id+'/';

    console.log([asignatura, cantidad_unidades, anno_escolar])

    if(!validar('input-MoL')){
        $.ajax({
            headers: {
            'Authorization': `Token ${token}`
        },
            type:"PATCH",
            url: modifLibrosUrl,
            success:function(){
                vaciarTabla();
                listarLibros();
                ocultarModal('modal-modificar-libro');
            },
            data:{
                asignatura,
                cantidad_unidades,
                anno_escolar
            },
            error:function(xhr,ajaxOption,Error){
                if(xhr.status=="404"){
                    alert('Server Caido');
                }
                console.log(xhr)
            }
        });
    }

};

// Funcion para asignar Libro
function asignarLibro(id){
    const username = $('#input-user-AL')[0].value;
    const modifLibrosUrl = host + '/api/libros/'+id+'/asignar/';

    if(!validar('input-AL')){
        $.ajax({
            headers: {
            'Authorization': `Token ${token}`
        },
            type:"POST",
            url: modifLibrosUrl,
            success:function(){
                ocultarModal('modal-solicitar-libro');
                alert('Asignacion satisfactoria.');
            },
            data:{
                username
            },
            error:function(xhr,ajaxOption,Error){
                if(xhr.status=="404"){
                    alert('Server Caido');
                }
                console.log(xhr)
            }
        });
    }

};

const btn_asignar = document.getElementById('btn-asignar');
btn_asignar.addEventListener('click', ()=>{
    asignarLibro(id_ref);
});

const btn_update = document.getElementById('btn-update');
btn_update.addEventListener('click', ()=>{
    modificarLibros(id_ref);
});


function generarSelectUsuarios(){
    const listarUser = host + '/api/auth/users/';
    const datalist = document.getElementById('user-AL');

    $.ajax({
        headers: {
            'Authorization': `Token ${token}`
        },
        type:"GET",
        url: listarUser,
        success:function(data){
            data.map((e)=>{
                const option_user = document.createElement('option');

                option_user.setAttribute('value',e.username);
                
                datalist.appendChild(option_user);
            });
        },
        dataType:"json",
        error:function(xhr,ajaxOption,Error){
            if(xhr.status=="404"){
                alert('Server Caido');
            }
        }
    });
}

listarLibros();
generarSelectUsuarios();
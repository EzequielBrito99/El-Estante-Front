const host = "http://192.168.137.1:8000";
const tbody = document.getElementById('tabla-tbody');
let id_ref = null;
const token = localStorage.getItem('token');


// Funcion para vaciar tabla
function vaciarTabla(){
    document.getElementById('tabla-tbody').innerHTML="";
};

// Funcion para Listar Usuarios
function listarModulos(){
    const buscar_modulos = document.getElementById('buscar-modulos').value;
    const listarModuloUrl = host + `/api/modulos/?categoria__icontains=${buscar_modulos}`;
    $.ajax({
        headers: {
            'Authorization': `Token ${token}`
        },
        type:"GET",
        url: listarModuloUrl,
        success:function(data){
            vaciarTabla();
            data.map((e)=>{
                const categoria = e.categoria;
                let material = "";
                e.materiales.map((e)=>{
                    material = material + e.cantidad_unidades + " " + e.nombre + '<br>'; 
                });
                let estudiante = "";
                e.usuarios.map((e)=>{
                    estudiante = estudiante + e.username + '<br>'; 
                });
                const materiales = material;
                const icono = "<i class='fa fa-close icono-delete'></i>";
                const icono_asignar = "<i class='fa fa-level-down icono-asignar'></i>";
                const id = e.id;

                const td_categoria = document.createElement('td');
                const td_materiales = document.createElement('td');
                const td_estudiantes = document.createElement('td');
                const td_asignar = document.createElement('td');
                const td_delete = document.createElement('td');
                const td_id = document.createElement('td');

                td_categoria.innerHTML= categoria;
                td_materiales.innerHTML= materiales;
                td_estudiantes.innerHTML= estudiante;
                td_asignar.innerHTML= icono_asignar;
                td_delete.innerHTML= icono; 
                td_id.innerHTML= id; 

                td_id.setAttribute('class', 'd-none');
                td_delete.setAttribute( 'data-bs-toggle','modal');
                td_delete.setAttribute( 'data-bs-target','#modal-eliminar-modulo');
                td_delete.addEventListener('click',()=>{
                    id_ref = id;
                });
                td_asignar.setAttribute( 'data-bs-toggle','modal');
                td_asignar.setAttribute( 'data-bs-target','#modal-solicitar-modulo');
                td_asignar.addEventListener('click',()=>{
                    id_ref = id;
                });

                const tr = document.createElement('tr');
                tr.className+='c-pointer';
                tr.setAttribute( 'data-bs-toggle','modal');
                tr.setAttribute( 'data-bs-target','#modal-modificar-modulo');
                tr.addEventListener('click',()=>{
                    id_ref=id;
                });

                tr.appendChild(td_categoria);
                tr.appendChild(td_materiales);
                tr.appendChild(td_estudiantes);
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


// Funcion para insertar mosulos
function insertarModulos(){
    const categoria = $('.categoria-IM').val();
    const NombreMaterial = document.getElementsByClassName('material-IM');
    const cantidad_unidades = document.getElementsByClassName('unidad-IM');
    let materiales = [];
    for (let i = 0; i < NombreMaterial.length; i++) {
        materiales.push({
            "cantidad_unidades":cantidad_unidades[i].value,
            "nombre":NombreMaterial[i].value
        });
    }
    const insertarModuloUrl = host + '/api/modulos/';

    if(!validar('input-IM')){
        $.ajax({
            headers: {
            'Authorization': `Token ${token}`
            },
            type:"POST",
            url: insertarModuloUrl,
            success:function(){
                vaciarTabla();
                listarModulos();
                ocultarModal('modal-insertar-modulo');
            },
            data: {
                "materiales": materiales,
                "categoria": categoria
            },
            dataType: "JSON",
            error:function(xhr,ajaxOption,Error){
                console.log(materiales)
                if(xhr.status=="404"){
                    alert('Server Caido');
                }
            }
        });
    }
};

// Funcion para eliminar Modulo
function eliminarModulos(id){
    const eliminarModulosUrl = host + '/api/modulos/'+id+'/';
    $.ajax({
        headers: {
            'Authorization': `Token ${token}`
        },
        type:"DELETE",
        url: eliminarModulosUrl,
        success:function(){
            vaciarTabla();
            listarModulos();
            ocultarModal('modal-eliminar-modulo');
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
    eliminarModulos(id_ref);
});

// Funcion para asignar Modulo
function asignarModulo(id){
    const username = $('#input-user-AM')[0].value;
    const modifModulosUrl = host + '/api/modulos/'+id+'/asignar/';

    if(!validar('input-AM')){
        $.ajax({
            headers: {
            'Authorization': `Token ${token}`
        },
            type:"POST",
            url: modifModulosUrl,
            success:function(){
                ocultarModal('modal-solicitar-modulo');
                vaciarTabla();
                listarModulos();
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
    asignarModulo(id_ref);
});


// Funcion para modificar Libro
function modificarModulos(id){
    const asignatura = $('#asignatura-MoL')[0].value;
    const cantidad_unidades = $('#cantUnid-MoL')[0].value;
    const anno_escolar = $('#anno-MoL')[0].value;
    const modifLibrosUrl = host + '/api/libros/'+id+'/';

    console.log([asignatura, cantidad_unidades[0], anno_escolar])

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



let idCounter = 0;

function addCampoMaterial(id){
    idCounter+=1;

    const div = document.createElement('div');
    div.setAttribute('id', idCounter);
    div.setAttribute('class', 'input-group input-group-sm pb-3');

    const span1 = document.createElement('span');
    span1.innerHTML = 'Material';
    span1.setAttribute('class','input-group-text');
    span1.setAttribute('id','input-group-sm-example');

    const input1 = document.createElement('input');
    input1.setAttribute('name','material-'+id);
    input1.setAttribute('type','text');
    input1.setAttribute('class','form-control input-'+id+' material material-'+id);
    input1.setAttribute('aria-label','Small input group');
    input1.setAttribute('aria-describedby','input-group-sm');
    
    const span2 = document.createElement('span');
    span2.innerHTML = 'Unidades';
    span2.setAttribute('class','input-group-text');
    span2.setAttribute('id','input-group-sm-example');
    
    const input2 = document.createElement('input');
    input2.setAttribute('name','cantUnid');
    input2.setAttribute('type','number');
    input2.setAttribute('class','form-control input-IM unidad unidad-'+id);
    input2.setAttribute('aria-label','Small input group');
    input2.setAttribute('aria-describedby','input-group-sm');
    
    const span3 = document.createElement('span');
    span3.innerHTML = '<i class="fa fa-close icono-delete c-pointer"><i/>';
    span3.setAttribute('class','input-group-text');
    span3.setAttribute('id','input-group-sm-example');
    span3.setAttribute('onClick', 'deleteCampoMaterial("'+idCounter+' '+id+'")');

    div.appendChild(span1);
    div.appendChild(input1);
    div.appendChild(span2);
    div.appendChild(input2);
    div.appendChild(span3);

    const form = document.getElementById('form-'+id);
    form.appendChild(div);
    form.addEventListener('click',(e)=>{
        e.preventDefault();
    });

    
}

function deleteCampoMaterial(id){
    const Id = id.split(' ');
    const form = document.getElementById('form-'+Id[1]);
    const div = document.getElementById(Id[0]);
    form.removeChild(div);
}

function generarSelectUsuarios(){
    const listarUser = host + '/api/auth/users/';
    const datalist = document.getElementById('user-AM');

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
};

listarModulos();
generarSelectUsuarios();
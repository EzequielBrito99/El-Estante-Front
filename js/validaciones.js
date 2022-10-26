

function validar(selector){
    var inputs=document.getElementsByClassName(selector);
    var mensaje="";
    var refM=false;

    for(i=0;i<inputs.length;i++){
        if(inputs[i].value==""&&!refM){
            mensaje="Rellene los campos vacios"+"\n"+mensaje;
            refM=true;
        }else{
            if(inputs[i].name=="usuario"){
                let referencia=validarUsuario(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"El usuario solo puede contener letras.\n";
                }
            }else if(inputs[i].name=="nombre"){
                let referencia=validarUsuario(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"El nombre solo puede contener letras.\n";
                }
            }else if(inputs[i].name=="apellidos"){
                let referencia=validarApellidos(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"Los apellidos solo pueden contener letras y espacios.\n";
                }
            }else if(inputs[i].name=="rol"){
                let referencia=validarUsuario(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"El rol solo puede contener letras.\n";
                }
            }else if(inputs[i].name=="pass"){
                let referencia=validarPass(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"La contraseña debe tener de 4 a 12 caracteres.\n";
                }
            }else if(inputs[i].name=="tipo"){
                let referencia=validarUsuario(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"El tipo solo puede contener letras.\n";
                }
            }else if(inputs[i].name=="año"){
                let referencia=validarAño(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"El año debe ser un numero entre 1 y 5.\n";
                }
            }else if(inputs[i].name=="cantUnid"){
                let referencia=validarCantUnid(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"La cantidad de unidades debe ser un numero.\n";
                }
            }else if(inputs[i].name=="nombre-libro"){
                let referencia=validarApellidos(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"Los libros solo pueden contener letras y espacios.\n";
                }
            }else if(inputs[i].name=="asignatura"){
                let referencia=validarApellidos(inputs[i].value);
                if(!referencia){
                    mensaje=mensaje+"Las asignaturas solo pueden contener letras y espacios.\n";
                }
            }
        }

        
    }

alert(mensaje);
}

function validarUsuario(e){
    let exReg=/^[a-zA-ZÀ-ÿ]+$/; // Letras y permite acentos
    return exReg.test(e);
} 
function validarApellidos(e){
    let exReg=/^[a-zA-ZÀ-ÿ\s]+$/; // Letras y espacios, pueden llevar acentos.
    return exReg.test(e);
}
function validarPass(e){
    let exReg=/^.{6,12}$/; // 4 a 12 digitos.
    return exReg.test(e);
}
function validarAño(e){
    let exReg=/^\d{1,5}$/; // Digito entre 1 y 5
    return exReg.test(e);
}
function validarCantUnid(e){
    let exReg=/^\d{1,10000}$/; // Digito entre 1 y mil
    return exReg.test(e);
}
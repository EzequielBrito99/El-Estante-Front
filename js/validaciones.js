function validar(selector){
    var inputs=document.getElementsByClassName(selector);
    var pass_actual=null;
    var ref=false;

    for(i=0;i<inputs.length;i++){
        if(inputs[i].name=="usuario"){
            let referencia=validarSL(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo puede contener letras.');
            }
        }else if(inputs[i].name=="nombre"){
            let referencia=validarSL(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo puede contener letras.');                   
            }
        }else if(inputs[i].name=="apellidos"){
            let referencia=validarLyE(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo pueden contener letras y espacios.');
            }
        }else if(inputs[i].name=="rol"){
            let referencia=validarSL(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo puede contener letras.');
            }
        }else if(inputs[i].name=="pass"){
            let referencia=validar4_50C(inputs[i].value);
            pass_actual=inputs[i].value;
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Debe tener de 4 a 50 caracteres.');
            }
        }else if(inputs[i].name=="tipo"){
            let referencia=validarSL(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo puede contener letras.');
            }
        }else if(inputs[i].name=="año"){
            let referencia=validar1_5D(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Debe ser un numero entre 1 y 5.');
            }
        }else if(inputs[i].name=="cantUnid"){
            let referencia=validarSN(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Debe ser un numero.');
            }
        }else if(inputs[i].name=="nombre-libro"){
            let referencia=validarLyE(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo pueden contener letras y espacios.');
            }
        }else if(inputs[i].name=="asignatura"){
            let referencia=validarLyE(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Solo pueden contener letras y espacios.');
            }
        }else if(inputs[i].name=="email"){
            let referencia=validarCorreo(inputs[i].value);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','Usar formato usuario@uci.cu.');
            }
        }else if(inputs[i].name=="confirm-pass"){
            let referencia=validarConfirm_Pass(inputs[i].value, pass_actual);
            if(!referencia){
                inputs[i].value='';
                inputs[i].setAttribute('placeholder','No coincide con la contraseña.');
            }
        }
    }
    return ref;
}

function validarSL(e){
    let exReg=/^[a-zA-ZÀ-ÿ]+$/; // Letras y permite acentos
    return exReg.test(e);
} 
function validarLyE(e){
    let exReg=/^[a-zA-ZÀ-ÿ\s]+$/; // Letras y espacios, pueden llevar acentos.
    return exReg.test(e);
}
function validar4_50C(e){
    let exReg=/^.{6,50}$/; // 4 a 12 digitos.
    return exReg.test(e);
}
function validar1_5D(e){
    let exReg=/^\d{1,5}$/; // Digito entre 1 y 5
    return exReg.test(e);
}
function validarSN(e){
    let exReg=/^\d{1,10000}$/; // Digito entre 1 y mil
    return exReg.test(e);
}
function validarCorreo(e){ //Formato de correo usuario@uci.cu
    let arr = e.split('@');
    if(typeof(arr[0])=='string' && arr[1]=='uci.cu'){
        return true;
    }else{
        return false;
    }
}
function validarConfirm_Pass(e,pa){ //Confirmacion de pass
    if(e==pa){
        return true;
    }else{
        return false;
    }
}
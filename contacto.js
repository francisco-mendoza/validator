$(document).ready(function(){
   
    $("#enviarContacto").click(function(){
        //console.log("click");
        var nombre = $("#nombre").val();
        var email = $("#email").val();
        var mensaje = $("#mensaje").val();
        $('#error_nombre').remove();
        $('#error_email').remove();
        $('#error_mensaje').remove();
        $('#nombre').css('border-color','');
        $('#email').css('border-color','');
        $('#mensaje').css('border-color','');

        insertarContacto(nombre, email, mensaje);
    });

    $("#nombre").keyup(function(){
        $(this).css('border-color','');
        $('#error_nombre').remove();
    });
    $("#email").keyup(function(){
        $(this).css('border-color','');
        $('#error_email').remove();
    });
    $("#mensaje").keyup(function(){
        $(this).css('border-color','');
        $('#error_mensaje').remove();
    });

    
});

function insertarContacto(nombre, email, mensaje)
{
    
    if(validarFormulario(nombre, email, mensaje)){
        $.ajax({
            url: "/controlador/contacto.php",
            type: 'POST',
            
            data:{
                email: email,
                nombre: nombre,
                mensaje: mensaje
            },
            success:function(data){
                swal({
                  title: 'Mensaje Enviado!',
                  text: 'Pronto nos pondremos en contacto contigo!',
                  type: 'success',
                  confirmButtonText: 'Aceptar!',
                });
                $(".swal2-confirm").click(function(){
                    $("#nombre").val("");
                    $("#email").val("");
                    $("#mensaje").val("");
                    $("html, body").animate({ scrollTop: 0 });
                });

            }


        });
    }
}

function validarFormulario(nombre, email, mensaje) {
    
    var notificacion_mensaje = "Ingrese ";
    var falta_campo = false;
    var respuesta = true;
    var emailNoVacio = true;

    if(nombre == ""){

        notificacion_mensaje += "Nombre"
        falta_campo = true;
        $('#nombre').css('border-color','red');
        $('#nombre').focus();
        $('.form-control-name').append('<p id="error_nombre" style="color:red;">Inserte Nombre</p>');
        
    }
    if (email == ""){
        notificacion_mensaje += " Email";
        falta_campo = true;
        $('#email').css('border-color','red');
        $('#email').focus();
        $('.form-control-email').append('<p id="error_email" style="color:red;">Inserte Email</p>');
        emailNoVacio = false;
    }
    if(emailNoVacio == true && validarEmail(email) == false){
        notificacion_mensaje += " Email";
        falta_campo = true;
        $('#email').css('border-color','red');
        $('#email').focus();
        $('.form-control-email').append('<p id="error_email" style="color:red;">Inserte un Email correcto</p>');
    }
    if (mensaje == ""){
        notificacion_mensaje += " Mensaje";
        falta_campo = true;
        $('#mensaje').css('border-color','red');
        $('#mensaje').focus();
        $('.form-control-mensaje').append('<p id="error_mensaje" style="color:red;">Inserte Mensaje</p>');
    }
    if(falta_campo){
       //notificacion(notificacion_mensaje,"danger"); 
       respuesta = false;
    }
    return respuesta;
    
}

function notificacion(mensaje,tipo){
    var contenedor_errores = $("#contenedor_errores");
    contenedor_errores.empty();
    var html  = '<div class="alert alert-'+tipo+'" role="alert">';
    //html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    //html += '<span aria-hidden="true">&times;</span></button>'+mensaje+'</div>';
    html += mensaje+'</div>'
    contenedor_errores.show();
    contenedor_errores.append(html);
    //$("html, body").animate({ scrollTop: 0 });
}
function validarEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        return false;
}

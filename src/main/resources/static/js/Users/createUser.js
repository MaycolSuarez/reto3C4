/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de registrar
 */
$(document).ready(function() {
        estadoInicial();


    })
    // var email = document.getElementById(emailUser);
    /**
     * Intenta autenticar al usuario en la aplicaciòn
     */
function registrar() {
    //capturar los datos que ingreso el usuario en la pagina
    let id = $("#id_user").val()
    let identification = $("#identificationUser").val()
    let name = $("#nameUser").val()
    let address = $("#addressUser").val()
    let cellPhone = $("#cellphoneUser").val()
    let email = $("#emailUser").val()
    let password = $("#passwordUser").val()
    let zone = $("#zoneUser").val()
    let type = $("#typeUser").val()


    let datos = {
        id: $("#id_user").val(),
        identification: $("#identificationUser").val(),
        name: $("#nameUser").val(),
        address: $("#addressUser").val(),
        cellPhone: $("#cellphoneUser").val(),
        email: $("#emailUser").val(),
        password: $("#passwordUser").val(),
        zone: $("#zoneUser").val(),
        type: $("#typeUser").val()
    }

    let datosPeticion = JSON.stringify(datos)
    console.log(datosPeticion);
    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        //Local localhost:8080
        url: "http://155.248.209.168:8080/api/user/new",

        //envio datos capturados por el usuario a la peticion
        data: datosPeticion,

        //tipo de peticion
        type: 'POST',

        contentType: "application/JSON",

        //tipo de contenido
        dataType: 'json',

        //success: funcion con acciones si todo sale ok
        success: function(respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            resultado(respuesta)
        },

        //error: funcion con acciones si hay error
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function(xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("algo fallo");
        },
        //complete: funcion con al final de la petición
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
            console.log("Todo super bien" + status);
        }
    });
}

/**
 * valida si en el id viene un dato nulo, o viene el codigo del usuario
 * 
 * Configura mensaje de bienvenida o de error según el caso
 */
function resultado(respuesta) {
    let id = respuesta.id
    let email = respuesta.email
    let nombre = respuesta.name

    if (id == null) {
        alert("Usuario no registrado : " + nombre)

    } else {
        alert("Usuario registrado: " + id + " " + nombre)
        $(window).attr('location', '/UserRegisters.html')
    }


}

function estadoInicial() {
    $("#id_user").focus()
}
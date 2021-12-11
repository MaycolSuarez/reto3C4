(function() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de login
 */
$(document).ready(function() {
    estadoInicial()
});

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
function login() {
    //capturar los datos que ingreso el usuario en la pagina
    let email = $("#emailUser").val()
    let password = $("#passwordUser").val()
    console.log(email);
    console.log(password);

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        //Local localhost:8080
        //prod 155.248.209.168:8080
        url: "http://155.248.209.168:8080/api/user/" + email + "/" + password,
        //tipo de peticion
        type: 'GET',

        //tipo de contenido
        dataType: 'json',

        //envio datos capturados por el usuario a la peticion

        //success: funcion con acciones si todo sale ok
        success: function(respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            resultado(respuesta);
        },

        //error: funcion con acciones si hay error
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function(xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("algo fallo");
            alert("algo fallo");
            estadoInicial();
        },
        //complete: funcion con al final de la petición
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
            console.log("Todo super bien" + status);
            alert("Que pasó");
        }
    });
}

/**
 * valida si en el id viene un dato nulo, o viene el codigo del usuario
 * 
 * Configura mensaje de bienvenida o de error según el caso
 */
function resultado(respuesta) {
    let email = $("#emailUser").val()
    let id = respuesta.id
    let nombre = respuesta.name
    console.log(respuesta);
    alert("estasmos en la respuesta");
    if (id == null) {
        alert("Usuario no registrado : " + email)
        estadoInicial();
    } else {
        alert("Bienvenido : " + id + " " + nombre)
        $(window).attr('location', '/UserRegisters.html')
    }



}

function estadoInicial() {
    $("#emailUser").focus()
}
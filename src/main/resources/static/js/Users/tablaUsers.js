$(document).ready(function() {
    getUsers();
})

function getUsers() {
    $.ajax({
        // local localhost:8080 
        url: "http://155.248.209.168:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            console.log(response);
            printListUser(response);
        }
    });
}

function printListUser(response) {
    let myTable = "<table class='table'>"
    myTable += "<tr>";
    myTable += "<th>Identificación</th>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Direccion</th>";
    myTable += "<th>Telefono</th>";
    myTable += "<th>Correo</th>";
    myTable += "<th>Contraseña</th>";
    myTable += "<th>Zona</th>";
    myTable += "<th>Tipo</th>";
    myTable += "<th colspan='2' class='text-center'>Acciones</th>";
    myTable += "</tr>";
    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].identification + "</td>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].address + "</td>";
        myTable += "<td>" + response[i].cellPhone + "</td>";
        myTable += "<td>" + response[i].email + "</td>";
        myTable += "<td>" + response[i].password + "</td>";
        myTable += "<td>" + response[i].zone + "</td>";
        myTable += "<td>" + response[i].type + "</td>";
        myTable += '<td><button class="btn btn-primary" onclick="borrar(' + response[i].id + ')">Borrar</button></td>';
        myTable += '<td><button class="btn btn-primary" onclick="getUserById(' + response[i].id + ')">Editar</button></td>';
        // myTable += '<td><button class = "" onclick="actualizar(' + response[i].id + ')">Actualizar User!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#myListUser").html(myTable);
}

function borrar(idUser) {
    var element = {
            id: idUser
        }
        /* Stringyfy convertir html a un objeto json */
    var dataToSend = JSON.stringify(element);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://155.248.209.168:8080/api/user/" + idUser,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function(response) {
            console.log(response);
            $("#myListUser").empty();

            alert("se ha Eliminado Correctamente!")
            location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

function listarUpdate(item) {
    var myUpdate = `<table class="table">
                <tr>
                    <th>Identificación</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Contraseña</th>
                    <th>Zona</th>
                    <th>Tipo</th>
                    <th>Actualizar</th>
                </tr>
                <tr>
                    <td><input type="number" class="form-control" id="identificationUser" required></td>
                    <td><input type="text" class="form-control" id="nameUser" required></td>
                    <td><input type="text" class="form-control" id="addressUser" required></td>
                    <td><input type="number" class="form-control" id="cellphoneUser" required></td>
                    <td><input type="text" class="form-control" id="emailUser" required></td>
                    <td><input type="text" class="form-control" id="passwordUser" required></td>
                    <td><input type="text" class="form-control" id="zoneUser" required></td>
                    <td><input type="text" class="form-control" id="typeUser" required></td>
                    <td> <button class="btn btn-primary" onclick="actualizar(${item.id})">Actualizar</button></td>
                </tr>
            </table>`

    $("#editUser").html(myUpdate)

    $("#identificationUser").val(item.identification);
    $("#nameUser").val(item.name);
    $("#addressUser").val(item.address);
    $("#cellphoneUser").val(item.cellPhone);
    $("#emailUser").val(item.email);
    $("#passwordUser").val(item.password);
    $("#zoneUser").val(item.zone);
    $("#typeUser").val(item.type);
}

function getUserById(idUser) {
    $("#editUser").show();
    $("#myListUser").hide();
    $("#btnListar").hide();

    $.ajax({
        dataType: 'json',
        url: "http://155.248.209.168:8080/api/user/" + idUser,
        type: 'GET',

        success: function(response) {
            console.log(response);
            var item = response;
            listarUpdate(item);
            // $("#identificationUser").val(item.identification);
            // $("#nameUser").val(item.name);
            // $("#addressUser").val(item.address);
            // $("#cellphoneUser").val(item.cellPhone);
            // $("#emailUser").val(item.email);
            // $("#passwordUser").val(item.password);
            // $("#zoneUser").val(item.zone);
            // $("#typeUser").val(item.type);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function actualizar(idUser) {

    if ($("#identificationUser").val().length == 0 || $("#nameUser").val().length == 0 || $("#addressUser").val().length == 0 ||
        $("#cellphoneUser").val().length == 0 || $("#emailUser").val().length == 0 || $("#passwordUser").val().length == 0 ||
        $("#zoneUser").val().length == 0 || $("#typeUser").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let element = {
            id: idUser,
            identification: $("#identificationUser").val(),
            name: $("#nameUser").val(),
            address: $("#addressUser").val(),
            cellPhone: $("#cellphoneUser").val(),
            email: $("#emailUser").val(),
            password: $("#passwordUser").val(),
            zone: $("#zoneUser").val(),
            type: $("#typeUser").val()
        }

        console.log(element);
        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://155.248.209.168:8080/api/user/update",
            type: "PUT",

            success: function(response) {
                console.log(response);
                //$("#myListUser").empty();
                getUsers();
                alert("se ha Actualizado Correctamente!")
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
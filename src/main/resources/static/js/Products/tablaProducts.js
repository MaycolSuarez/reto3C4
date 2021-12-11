$(document).ready(function() {
    getProducts();
});

function getProducts() {
    $.ajax({
        // local localhost:8080 
        url: "http://155.248.209.168:8080/api/chocolate/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            console.log(response);
            printListProducts(response);
        }
    });
}

function printListProducts(respuesta) {
    console.log(respuesta);
    let myTable = "<table class='table'>";
    myTable += "<tr>";
    myTable += "<th>reference</th>";
    myTable += "<th>category</th>";
    myTable += "<th>price</th>";
    myTable += "<th>quantity</th>";
    myTable += "<th>description</th>";
    myTable += "<th>availability</th>";
    myTable += "<th>photography</th>";
    myTable += "<th colspan='2' class='text-center'>Acciones</th>";
    myTable += "</tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + JSON.stringify(respuesta[i].reference) + "</td>";
        myTable += "<td>" + respuesta[i].category + "</td>";
        myTable += "<td>" + respuesta[i].price + "</td>";
        myTable += "<td>" + respuesta[i].quantity + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].availability + "</td>";
        myTable += "<td>" + respuesta[i].photography + "</td>";
        myTable += "<td>" + "<button class='btn btn-primary' onclick='borrar(" + JSON.stringify(respuesta[i].reference) + ")'>Borrar</button>" + "</td>";
        myTable += "<td>" + "<button class='btn btn-primary' onclick='getProductById(" + JSON.stringify(respuesta[i].reference) + ")'>Editar</button>" + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#myListProducts").html(myTable);
}

function borrar(reference) {
    var element = {
            reference: reference
        }
        /* Stringyfy convertir html a un objeto json */
    var dataToSend = JSON.stringify(element);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        // loca  localhost:8080
        url: "http://155.248.209.168:8080/api/chocolate/" + reference,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function(response) {
            console.log(response);
            alert("se ha Eliminado Correctamente!")
            location.reload();
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

function getProductById(reference) {
    $("#btnListarProducts").hide();
    $("#myListProducts").hide();
    $.ajax({
        dataType: 'json',
        //local  localhost:8080
        url: "http://155.248.209.168:8080/api/chocolate/" + reference,
        type: 'GET',

        success: function(response) {
            console.log(response);
            listarUpdate(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function listarUpdate(item) {
    let myTable = "<table class='table'>";
    myTable += "<tr>";
    myTable += "<th>category</th>";
    myTable += "<th>price</th>";
    myTable += "<th>quantity</th>";
    myTable += "<th>description</th>";
    myTable += "<th>availability</th>";
    myTable += "<th>photography</th>";
    myTable += "<th>Actualizar</th>";
    myTable += "</tr>";
    myTable += "<tr>";
    myTable += "<td><input type='text' class='form-control' id='categoryProduct' required></td>";
    myTable += "<td>" + "<input type='number' class='form-control' id='priceProduct' required>" + "</td>";
    myTable += "<td>" + "<input type='text' class='form-control' id='quantityProduct' required>" + "</td>";
    myTable += "<td>" + "<input type='text' class='form-control' id='descriptionProduct' required>" + "</td>";
    myTable += "<td>" + "<input type='text' class='form-control' id='availabilityProduct' required>" + "</td>";
    myTable += "<td>" + "<input type='text' class='form-control' id='photographyProduct' required>" + "</td>";
    myTable += "<td><button class='btn btn-primary' onclick='actualizarProduct(" + JSON.stringify(item.reference) + ")'>Actualizar</button></td>";
    myTable += "</tr>";
    myTable += "</table>";

    $("#editProducts").html(myTable)

    $("#referenceProduct").val(item.reference);
    $("#categoryProduct").val(item.category);
    $("#priceProduct").val(item.price);
    $("#quantityProduct").val(item.quantity);
    $("#descriptionProduct").val(item.description);
    $("#availabilityProduct").val(item.availability);
    $("#photographyProduct").val(item.photography);
}



function actualizarProduct(reference) {
    console.log(reference);
    if ($("#categoryProduct").val().length == 0 ||
        $("#priceProduct").val().length == 0 || $("#quantityProduct").val().length == 0 || $("#descriptionProduct").val().length == 0 ||
        $("#availabilityProduct").val().length == 0 || $("#photographyProduct").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let element = {
            reference: reference,
            category: $("#categoryProduct").val(),
            price: $("#priceProduct").val(),
            quantity: $("#quantityProduct").val(),
            description: $("#descriptionProduct").val(),
            availability: $("#availabilityProduct").val(),
            photography: $("#photographyProduct").val()
        }

        console.log(element);
        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            //local  localhost:8080
            url: "http://155.248.209.168:8080/api/chocolate/update",
            type: "PUT",

            success: function(response) {
                console.log(response);
                //$("#myListUser").empty();
                getProducts();
                alert("se ha Actualizado Correctamente!");
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
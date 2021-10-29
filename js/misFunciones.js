function traerInformacion(){
	$.ajax({    
    url : 'http://140.238.182.7/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
	//-------------------------------------------------------
    success : function(respuesta) {
		console.log(respuesta);
		/* pintarRespuestaBikes(respuesta); */
		$("#resultado").empty();
        let miTabla = '<div class="container"><div  class= "row">';
		for (i=0; i<respuesta.length; i++){

			miTabla += `
			            	<div class="card m-2" >
								<div class="card-body" >
							 
								   <h5 class ="card-title">   - ${respuesta[i].name}</h5> 		
								   <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].brand} </h6> 		
								   <p class= "card-text"> ${respuesta[i].year} <br> 		
														  ${respuesta[i].description}</p>
								   <button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].id} )" >Editar</button>
								   <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].id} )">Borrar</button>
								   
								</div>
							</div>
                       `
	
		}
        miTabla += '</div></div>';
	    $("#resultado").append(miTabla);    
        pintarSelect();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function guardarInformacion(){
	let selected = $("#cat").children(":selected").attr("value");
	if (selected.length > 0) {
	let misDatos = {
		name: $("#name").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description").val(),
		category: {id: selected}
       
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Motorbike/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			
			$("#name").val("");
			$("#brand").val("");
			$("#year").val("");
			$("#description").val("");
		
        	traerInformacion();	
			}
		}
	});
}
else
{
	alert('Debe escoger categoria');
}
}
//====================================================================================0
function pintarRespuestaBikes(respuesta){
	$("#resultado").empty();
    let myTable="<table>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);

}


//=====================Actualizar=======================
function actualizarInformacion(){
    let selected = $("#cat").children(":selected").attr("value");
	let misDatos = {
		name: $("#name").val(),
	brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description").val(),
      
        category : {id: selected}
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://140.238.182.7/api/Motorbike/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#name").val("");
			$("#brand").val("");
			$("#year").val("");
			$("#description").val("");
			
			
		
			$("#id").attr("readonly", false);
        	        traerInformacion();	
			}
		}
	});
}

function pintarSelect(id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cat").empty();
		miSelect='<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
                  if (respuesta[i].id == id){
                      miSelect += '<option selected value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>';
                  }   
                  else {
                        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
                    }
		}
	    $("#cat").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en la carga del select:'+ status);
    }
});
	
}	
	
function eliminarRegistro(id){
	$.ajax({    
        url : 'http://140.238.182.7/api/Motorbike/'+id,
        type : 'DELETE',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Eliminado el registro No:"+id);
        	        traerInformacion();	
			}
		}
	});
    
}


function editarRegistro (id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Motorbike/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://140.238.182.7/api/Motorbike/"+id);
        let miTabla = '<table>';
			$("#name").val(respuesta.name);
			$("#brand").val(respuesta.brand);
			
			$("#year").val(respuesta.year);
			$("#description").val(respuesta.description);

			$("#category").val(respuesta.category.id);
            $("#id").attr("readonly", true);
			pintarSelect(respuesta.category.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

	
	
	
	
	

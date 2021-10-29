function traerInformacion(){
	$.ajax({    
    url : 'http://140.238.182.7/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
	
		$("#resultado").empty();
        let miTabla = '<div class="container"><div  class= "row">';
		for (i=0; i<respuesta.length; i++){
			miTabla += `
			            	<div class="card m-2" >
								<div class="card-body" >
							 
								   <h5 class ="card-title"> ${respuesta[i].name}</h5> 		
								   <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].description} </h6> 		

								   <button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].id} )" >Editar</button>
								   <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].id} )">Borrar</button>
								   
								</div>
							</div>
                       `

		}
        miTabla += '</div></div>';
	    $("#resultado").append(miTabla);    
      
       
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
		
    }
});
}

function guardarInformacion(){


	let misDatos = {
		
	    name: $("#name").val(),
		description: $("#description").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Category/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			
			$("#name").val("");
			$("#description").val("");
		
        	traerInformacion();	
			}
		}
	});
}


function editarRegistro (id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Category/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta + "url" + "http://140.238.182.7/api/Category/"+id);
        let miTabla = '<table>';

			$("#name").val(respuesta.name);
			$("#description").val(respuesta.description);
			$("#id").val(respuesta.id);
        	$("#id").attr("readonly", true); 
		
	},
    error : function(xhr, status) {
        alert('Ha sucedido un problema:'+ status + json);
    }
});
}

function actualizarInformacion(){
	let misDatos = {
	id: $("#id").val(),
	   name: $("#name").val(),
	   description: $("#description").val()
    	
	};

	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Category/update ',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Actualizado.");  

			$("#name").val("");
			$("#description").val("");
			$("#id").val("");
            $("#id").attr("readonly", false); 
        	traerInformacion();	 
			
			}
		}
	});
}

function eliminarRegistro (id){


	$.ajax({    
		url : 'http://140.238.182.7/api/Category/'+id,	
		type : 'DELETE',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Borrado."+ id);
        		traerInformacion();	
			}
		}
	});
}
	
	
	
function traerInformacion(){
	$.ajax({    
    url : 'http://140.238.182.7/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
	//-------------------------------------------------------
    success : function(respuesta) {
		console.log(respuesta);
		
		$("#resultado").empty();
        let miTabla = '<div class="container"><div  class= "row">';
		for (i=0; i<respuesta.length; i++){
			miTabla += `
			            	<div class="card m-2" >
								<div class="card-body" >
							 
								   <h5 class ="card-title">   - ${respuesta[i].email}</h5> 		
								   <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].password} </h6> 		
								   <p class= "card-text"> ${respuesta[i].name} <br> 		
														  ${respuesta[i].age}</p>
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
		email: $("#email").val(),
		name: $("#name").val(),
        password: $("#password").val(),
        age: $("#age").val() 
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Client/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			$("#email").val("");
			$("#password").val("");
			$("#name").val("");
			$("#age").val("");

        	traerInformacion();	
			}
		}
	});
}

//=====================Actualizar=======================
function actualizarInformacion(){
    
	let misDatos = {
		email: $("#email").val(),
		password: $("#password").val(),
		name: $("#name").val(),
		 age: $("#age").val()
       
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://140.238.182.7/api/Client/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");

			$("#email").val("");
			$("#password").val("");
			$("#name").val("");
			$("#age").val("");
			
			$("#id").attr("readonly", false);
        	        traerInformacion();	
			}
		}
	});
}
	
function eliminarRegistro(id){
	$.ajax({    
        url : 'http://140.238.182.7/api/Client/'+id,
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
    url : 'http://140.238.182.7/api/Client/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://140.238.182.7/api/Client/"+id);
        let miTabla = '<table>';
		
			$("#email").val(respuesta.email);
			$("#password").val(respuesta.password);
			$("#name").val(respuesta.name);			
			$("#age").val(respuesta.age);
			
            $("#id").attr("readonly", true);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}


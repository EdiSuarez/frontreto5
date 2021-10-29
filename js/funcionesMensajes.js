function traerInformacion(){
	$.ajax({    
    url : 'http://140.238.182.7/api/Message/all',
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
							 
								   <h5 class ="card-title">    ${respuesta[i].messageText}</h5> 		
								  		
								  	
														  
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
        messageText: $("#messageText").val(),
		category: {id: selected}
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Message/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			$("#messageText").val("");
        	traerInformacion();	
			}
		}
	});
}
else
{
	alert('Debe escoger motocicleta');
}
}

function editarRegistro (id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Message/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://140.238.182.7/api/Message/"+id);
		
        let miTabla = '<table>';
			$("#messageText").val(respuesta.messageText);				
            $("#id").attr("readonly", true); 
			pintarSelect(respuesta.category.id);
		
	},
    error : function(xhr, status) {
        alert('Ha sucedido un problema:'+ status + json);
    }
});
}

//======================
function pintarRespuesta(respuesta){
	$("#resultado").empty();
	let miTabla="<table>";
    for(i=0;i<respuesta.length;i++){
        miTabla+="<tr>";
        miTabla+="<td>"+respuesta[i].messageText+"</td>";
        miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';			
        miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';
        miTabla+="</tr>";
    }
    miTabla+="</table>";
    $("#resultado").html(miTabla);
	pintarSelect();
}

//======================0
	
function actualizarInformacion(){
	let selected = $("#cat").children(":selected").attr("value");
	let misDatos = { 
        messageText: $("#messageText").val(),
        category : {id: selected}
             
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
		'http://140.238.182.7/api/Message/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Actualizado.");
		
            $("#messageText").val("");
			$("#id").attr("readonly", false); 
        	traerInformacion();	
			}
		}
	});
}

function eliminarRegistro(id){
	$.ajax({    
        url : 'http://140.238.182.7/api/Message/'+id,
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

function pintarSelect(id){
	$.ajax({    
    url : 'http://140.238.182.7/api/Motorbike/all',
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

function pintarTodosSelect(){
	pintarSelect();
	pintarSelect2();
}
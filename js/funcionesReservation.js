function traerInformacion(){ 
	$.ajax({    
    url : 'http://140.238.182.7/api/Reservation/all',
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
			 
				   <h5 class ="card-title">  ${respuesta[i].startDate} - ${respuesta[i].devolutionDate}</h5> 		
				   		

				   <button class="btn btn-primary" onclick="editarRegistro(${respuesta[i].id} )" >Editar</button>
				   <button  class="btn btn-danger" onclick="eliminarRegistro(${respuesta[i].id} )">Borrar</button>
				   
				</div>
			</div>
	   `

			
		
	
		}
        miTabla += '</div></div>';
	    $("#resultado").append(miTabla);    
      pintarTodosSelect();
		
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
		
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
		category: {id: selected}
        
        
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
	'http://140.238.182.7/api/Reservation/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado.");
			
			$("#startDate").val("");
			$("#devolutionDate").val("");
			
		
        	traerInformacion();	
			}
		}
	});
}
else
{
	alert('Debe escoger cliente');
}
}


//======================
function pintarRespuesta(respuesta){
	 $("#resultado").empty(); 
    let myTable="<table>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
 

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
	

}

	

	//=========================
	function pintarSelect(){
		$.ajax({    
		url : 'http://140.238.182.7/api/Client/all',
		
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			console.log(respuesta);
			 $("#cat").empty(); 
			 miSelect='<option id="" ></option>'; 
			for (i=0; i<respuesta.length; i++){
				miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
			}
			$("#cat").append(miSelect);    
	
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status);
		}
	});
		
	}	
	//========================================================
	function pintarSelect2(){
		$.ajax({    
		url : 'http://140.238.182.7/api/Motorbike/all',
		
		type : 'GET',
		dataType : 'json',
		contentType: "application/json; charset=utf-8",
	  
		success : function(respuesta) {
			console.log(respuesta);
			 $("#cli").empty(); 
			 miSelect2='<option id="" ></option>'; 
			for (i=0; i<respuesta.length; i++){
				miSelect2 += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
			}
			$("#cli").append(miSelect2);    
	
		},
		error : function(xhr, status) {
			alert('ha sucedido un problema:'+ status);
		}
	});
		
	}	

	//=======================================================
	
	
function pintarTodosSelect(){
	pintarSelect();
	pintarSelect2();
}
//=============================

function actualizarInformacion(){
    let selected = $("#cat").children(":selected").attr("value");
	let misDatos = {
		startDate: $("#startDate").val(),
	    devolutionDate: $("#devolutionDate").val(),
       
      
        category : {id: selected}
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://140.238.182.7/api/Reservation/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#startDate").val("");
			$("#devolutionDate").val("");
					
			$("#id").attr("readonly", false);
        	        traerInformacion();	
			}
		}
	});
}	

function eliminarRegistro(id){
	$.ajax({    
        url : 'http://140.238.182.7/api/Reservation/'+id,
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
    url : 'http://140.238.182.7/api/Reservation/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta+ "url" + "http://140.238.182.7/api/Reservation/"+id);
        let miTabla = '<table>';
			$("#startDate").val(respuesta.startDate);
			$("#devolutionDate").val(respuesta.devolutionDate);

			$("#category").val(respuesta.category.id);
            $("#id").attr("readonly", true);
			pintarSelect(respuesta.category.id);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}


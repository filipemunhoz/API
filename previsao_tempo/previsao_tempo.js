//http://openweathermap.org/api
//http://openweathermap.org/forecast5
//API key a34fc68a89f70d121d8b5524eda79e82
//Forecast - 5 dias
//api.openweathermap.org/data/2.5/forecast/city?id=3461786&APPID=a34fc68a89f70d121d8b5524eda79e82 - Guarulhos
// Tempo Atual
//api.openweathermap.org/data/2.5/weather?id=3461786&APPID=a34fc68a89f70d121d8b5524eda79e82
// ISO 3166 country codes - Brazil -> BR

$(function(){
	var servico 		= "http://api.openweathermap.org/data/2.5/weather?";
	var appId		= "a34fc68a89f70d121d8b5524eda79e82";
	var units		= "metric"; //Celsius 
	//var units		= "imperial"; //Fahrenheit

	var temperaturaAtual	= $(".temperaturaAtual");
	var cidade		= $("#cidade");
	var cidadeId		= $("#cidadeId");
	var vento		= $(".vento");
	var mensagem		= $(".mensagem");
	var $listaCidades 	= [];
	
	$("#cidade").keydown(function(event){
		onCidadeKeyDown(event);		
	});
	
	$("#clear").click(function(event){
		clear();
		cidade.val('');
	});

	cidade.autocomplete({
		source: $listaCidades,
		minLength: 3,
		select: function(event, ui){
			cidadeId.val(ui.item.id),
			//cidadeId.val(ui.item.label);	
			buscaTempo();
		}
	});

	function addCidades(_id, _nome){
		$listaCidades.push({id: _id, value: _nome});
		 
	}
 

	function carregaListaCidades(){		
		$.getJSON("cidades_br.json")
			.done(onCarregaListaCidadesDone)
			.fail(onCarregaListaCidadesFail);
	}

	function onCarregaListaCidadesDone(data){
		for(var i=0; i < data.length; i++){
			addCidades(data[i]._id, data[i].name);			
		}
	}
	
	function onCarregaListaCidadesFail(error){
		console.log("Erro: " + error.statusText);
		mensagem.css("color", "red");
		mensagem.text(error.statusText);
	}

	
	function clear(){
		mensagem.empty();
		vento.empty();	
		cidade.focus();			
	}	
				
	function onCidadeKeyDown(event){
		if(event.which === 13 && valida()){			
			clear();
			buscaTempo();
		}		
	}
	
	function valida(){
		mensagem.css("color", "black");
		
		if(cidade.val().length === 0){		
			clear();
			cep.css("border-color", "red"); 
			mensagem.text("Informe uma cidade");		
			
			return false;
		}	
		return true;	
	}
				
	function onTempoDone(data){
		temperaturaAtual.text("Temperatura: " + data.main.temp )		
		vento.text("Velocidade: " + data.wind.speed + " knots /" + data.wind.deg + " graus")
	}
	
	function onTempoError(error){
		console.log("Erro: " + error.statusText);
		mensagem.css("color", "red");
		mensagem.text(error.statusText);
	}
	
	function buscaTempo(){						
		console.log(servico + "id=" + cidadeId.val() + "&units=" + units + "&APPID=" + appId);
		$.getJSON(servico + "id=" + cidadeId.val() + "&units=" + units + "&APPID=" + appId)
			.done(onTempoDone)
			.fail(onTempoError);
	}

	carregaListaCidades();
});

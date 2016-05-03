$(function(){
	var servico 	= "http://api.postmon.com.br/v1/cep/";	
	var cep		= $("#cep");		
	var logradouro 	= $(".logradouro");
	var cidade 	= $(".cidade");
	var bairro	= $(".bairro");
	var mensagem	= $(".mensagem");
	
	$("#cep").keydown(function(event){
		onCepKeyDown(event);		
	});
	
	$("#clear").click(function(event){
		clear();
		cep.val('');
	});	
	
	function clear(){
		mensagem.empty();
		logradouro.empty();
		cidade.empty();
		bairro.empty();	
		cep.focus();			
	}	
				
	function onCepKeyDown(event){
		if(event.which === 13 && valida()){			
			clear();
			buscaCEP();
		}		
	}
	
	function valida(){
		mensagem.css("color", "black");
		
		if(cep.val().length === 0){		
			clear();
			cep.css("border-color", "red"); 
			mensagem.text("Informe o CEP");		
			
			return false;
		}	
		return true;	
	}
				
	function onCepDone(data){
		logradouro.text(data.logradouro);
		cidade.text(data.cidade);
		bairro.text(data.bairro);
	}
	
	function onCepError(error){
		console.log("Erro: " + error.statusText);
		mensagem.css("color", "red");
		mensagem.text(error.statusText);
	}
	
	function buscaCEP(){						
		$.getJSON(servico + cep.val())
			.done(onCepDone)
			.fail(onCepError);
	}
});

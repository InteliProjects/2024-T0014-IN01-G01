   // função pra ler querystring
   function queryString(parameter) {
    var loc = location.search.substring(1, location.search.length);
    var param_value = false;
    var params = loc.split("&");
    for (i = 0; i < params.length; i++) {
      param_name = params[i].substring(0, params[i].indexOf('='));
      if (param_name == parameter) {
        param_value = params[i].substring(params[i].indexOf('=') + 1);
      }
    }
    if (param_value) {
      return param_value;
    } else {
      return undefined;
    }
  }

  function aprovaForn(aprovaForn) {
    if(aprovaForn && aprovado){
        //mostra dialogo
    }
    else if(!aprovaForn && aprovado){
        //mostra dialogo
    }
    else{
        //mostra dialogo
    }
  }

  var logo = queryString("logo");
  var nome = queryString("nome");
  var descricao = queryString("descricao");
  var aprovado = queryString("aprovado");
  document.getElementById("descricao").innerHTML = descricao;
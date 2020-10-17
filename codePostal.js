jQuery(function ($) {
    $('.vicopo-wrapper').each(function () {
        var _wrapper = this;
        var _code = $('.code', _wrapper), _city = $('.city', _wrapper), _out = $('.output', _wrapper);
	var _cache = {};
  // Utilisation du HTTPS ou non selon le protocole de la page actuelle
	var _host = ~(location.protocol + '').indexOf('s')
		? 'https://www.selfbuild.fr/vicopo'
		: 'http://vicopo.selfbuild.fr';
  // Si le code postal ne commence pas par un chiffre, c'est une ville, on passe dans le champ ville avec la valeur courante
	_code.keyup(function () {
		var _val = $(this).val();
		if(/^[^0-9]/.test(_val)) {
			_code.val('');
			_city.val(_val).focus().trigger('keyup');
		}
	});
  // Si la ville commence par un chiffre, c'est un code postal, on passe dans le champ code postal avec la valeur courante
	_city.keyup(function () {
		var _val = $(this).val();
		if(/^[0-9]/.test(_val)) {
			_city.val('');
			_code.val(_val).focus().trigger('keyup');
		}
	});
  // Fonction à exécuter à la réception d'une réponse pour afficher les liens dans #output
	function _done(_cities) {
		_out.html(_cities.map(function (_data) {
			return '<a href="#">' + _data.code + ' &nbsp; ' + _data.city + '</a>';
		}).join(''));
	}
  // Appel de Vicopo lors de l'appui sur une touche dans #code ou #city
  $.each(['code', 'city'], function (i, _name) {
    var _input = $('.' + _name, _wrapper).on('keyup', function () {
			var _val = _input.val();
			if(_val.length > 1) {
				_cache[_name] = _cache[_name] || {};
				if(_cache[_name][_val]) {
					_done(_cache[_name][_val]);
				}
				var _data = {};
				_data[_name] = _val;
				$.getJSON(_host, _data, function (_answear) {
					_cache[_name][_answear.input] = _answear.cities;
					if(_input.val() == _answear.input) {
						_done(_answear.cities);
					}
				});
			}
		});
	});
  // Au clic sur un lien, on remplace la valeur des champs code postal et ville
  $(_wrapper).on('click', '.output a', function (e) {
		var _contents = $(this).text();
		var _space = _contents.indexOf(' ');
    // Le premier espace sépare le code postal de la ville dans le texte du lien
    // Si vous souhaitez personnaliser le texte des liens, nous vous conseillons d'utiliser :
    // <a href="#" data-code="' + _data.code + '" data-city="' + _data.city + '">
    // dans le lien, puis :
    // _code.val($(this).data('code'));
    // _city.val($(this).data('city'));
		if(~_space) {
			_code.val(_contents.substr(0, _space));
			_city.val(_contents.substr(_space).trim());
			_out.empty();
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
});
});
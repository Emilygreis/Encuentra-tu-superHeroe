jQuery.fn.datosSuperHero = function(superHeroId) {
	const element = this;
	element.fadeOut();
	$.ajax({
		type: "GET",
		url: `https://www.superheroapi.com/api.php/4905856019427443/${superHeroId}`,
		dataType: "json",
		success: function (superhero) {
			if (superhero.response === 'error') {
				alert('SupverHero no encontrado');
			} else {
				console.log(superhero);
				limpiarLista();
				element.find('#super-hero-imagen').attr('src', superhero.image.url);
				element.find('#super-hero-nombre').text(`Nombre: ${superhero.name}`);
				element.find('#super-hero-conexiones').text(`Conexiones: ${superhero.connections["group-affiliation"]}`);
				agregarItemACard(`Publicado por: ${superhero.biography.publisher}`);
				agregarItemACard(`Ocupación: ${superhero.work.occupation}`);
				agregarItemACard(`Primera Aparición: ${superhero.biography['first-appearance']}`);
				agregarItemACard(`Altura: ${superhero.appearance.height.join(' - ')}`);
				agregarItemACard(`Peso: ${superhero.appearance.weight.join(' - ')}`);
				agregarItemACard(`Alianzas: ${superhero.connections.relatives}`);
				generarGrafico(superhero);
				element.fadeIn();
			}
		}
	});

	function limpiarLista() {
		element.find('#super-hero-list').empty();
	}

	function agregarItemACard(texto) {
		const li = $('<li class="list-group-item">').text(texto);
		element.find('#super-hero-list').append(li);
	}

	function generarGrafico(superhero) {
		var options = {
			title: {
				text: `Estadisticas de Poder para ${superhero.name}`
			},
			animationEnabled: true,
			data: [{
				type: "pie",
				startAngle: 40,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: superhero.powerstats.combat, label: "combat" },
					{ y: superhero.powerstats.durability, label: "durability" },
					{ y: superhero.powerstats.intelligence, label: "intelligence" },
					{ y: superhero.powerstats.power, label: "power" },
					{ y: superhero.powerstats.speed, label: "speed" },
					{ y: superhero.powerstats.strength, label: "strength" },
				]
			}]
		};
		element.find("#canvas-chart").CanvasJSChart(options);
	}
}

$(document).ready(function () {
	$('#btn-buscar').click(function (event) { 
		event.preventDefault();
		let inputSuperHero = $('#input-superhero').val();
		if (validar(inputSuperHero)) {
			$('#super-hero').datosSuperHero(inputSuperHero);
		} else {
			alert('No es un número');
		}
	});

	function validar(input) {
		let regex = /^\d+$/;
		return regex.test(input);
	}
});
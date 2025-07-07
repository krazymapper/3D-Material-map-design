// Exemples utilisés :
// pour les infobulles : http://bl.ocks.org/lhoworko/7753a11efc189a936371
// pour le zoom/pan : https://bl.ocks.org/mbostock/eec4a6cda2f573574a11

// code javascript de la carte
$(function () {
	init();
});

function init() {

	// STRUCTURES

	// titre
	var titre = "<p>Superposition des lieux et diversité des échelles par source</p>";
	document.getElementById("titre").innerHTML = titre;
	// liste
	var listeSource2 = '<select id="listeSource2" name="listeSource2"/>';
	document.getElementById("liste").innerHTML = listeSource2;
	// pied de page
	var footer = "<p>TERESMA - carte 2</p>";
	document.getElementById("footer").innerHTML = footer;

	// DONNEES
	// liste sources : id, libellé
	var listeSource = new Array();
	listeSource[0] = [0, 'Cadet de Gassicourt'];
	listeSource[1] = [1, 'Leclerc'];
	listeSource[2] = [2, 'AAPRA'];

	// liste fichiers : id, nom
	var listeJSON = new Array();
	listeJSON[0] = [0, 'json/lieux_centroides_Cadet.geojson'];
	listeJSON[1] = [1, 'json/lieux_centroides_Leclerc.geojson'];
	listeJSON[2] = [2, 'json/lieux_centroides_AAPRA.geojson'];


	// VARIABLES
	var width = 700,
		height = 700,
		scale0 = 9000;

	var zoom = d3.behavior.zoom()
		.translate([500, 0])
		.scale(scale0)
		.on("zoom", zoomed);

	var svg = d3.select("#carte")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var tooltip = d3.select('body').append('div')
		.attr('class', 'hidden tooltip');

	var projection = d3.geo.conicConformal() // Lambert-93
		.center([2.454071, 47.279229]) // On centre la carte
		.scale(6000)
		.translate([350, 0]);

	var path = d3.geo.path()
		.projection(projection);

	// échelle de couleur pour les lieux
	var color = d3.scale.linear()
		.domain([1, 10])
		.range(["#f7fcf5", "#00441b"]);

	var g = svg.append("g");

	svg
		.call(zoom)
		.call(zoom.event);

	queue()
		.defer(d3.json, 'json/fond.geojson')
		.defer(d3.json, 'json/lieux_aplat.geojson')
		.defer(d3.json, 'json/lieux.geojson')
		.defer(d3.json, 'json/lieux_centroides.geojson')
		.defer(d3.json, 'json/lieux_centroides_Cadet.geojson')
		.defer(d3.json, 'json/lieux_centroides_Leclerc.geojson')
		.defer(d3.json, 'json/lieux_centroides_AAPRA.geojson')
		.await(afficheCarte);

	// listes
	var listeSource2 = document.getElementById('listeSource2');

	// GESTIONNAIRES
	listeSource2.addEventListener('change', afficheLieux);

	// Make variables accessible to other functions
	window.svg = svg;
	window.path = path;
	window.projection = projection;
	window.color = color;
	window.tooltip = tooltip;
	window.listeSource = listeSource;
	window.listeJSON = listeJSON;
	window.listeSource2 = listeSource2;

	// LANCEMENT
	remplissageListe();

}

function zoomed() {
	window.projection
		.translate(d3.event.translate)
		.scale(d3.event.scale);

	window.svg.selectAll(".fond")
		.attr("d", window.path);
	window.svg.selectAll(".lieux_aplat")
		.attr("d", window.path);
	window.svg.selectAll(".lieux")
		.attr("d", window.path);
	window.svg.selectAll('.lieux_centroides')
		.attr("transform", function (d) {
			return "translate(" +
				window.projection([d.properties.XCOORD, d.properties.YCOORD])[0] +
				", " +
				window.projection([d.properties.XCOORD, d.properties.YCOORD])[1] +
				")";
		});

}

function remplissageListe() {
	var html = '<select id="listeSource2" name="listeSource2">';
	html += '<option value="rien">toutes</option>';
	for (var i = 0; i < window.listeSource.length; i++) {
		html += '<option value="' + window.listeSource[i][1] + '">' + window.listeSource[i][1] + '</option>';
	}
	html += '</select>';
	window.listeSource2.innerHTML = html;
}

function afficheCarte(error, fond, lieux_aplat, lieux, lieux_centroides) {

	console.log('affiche carte')

	if (error) { console.log(error); }

	svg.selectAll('path')
		.data(fond.features)
		.enter()
		.append('path')
		.attr("d", path)
		.attr("class", "fond");

	svg.selectAll('.lieux_aplat')
		.data(lieux_aplat.features)
		.enter()
		.append('path')
		.attr("d", path)
		.attr("class", "lieux_aplat")
		.style("fill", function (d) {
			var value = d.properties.nb_lieux
			if (value) {
				return color(value)
			} else {
				return "#ccc"
			}
		});

	svg.selectAll('.lieux')
		.data(lieux.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("class", "lieux");

	// affiche les centroïdes à l'aide de la fonction dédiée
	afficheCentroides(lieux_centroides);

}

function afficheLieux() {
	console.log('affiche lieux')
	// récupère la valeur de la liste
	indexListe = listeSource2.selectedIndex - 1;
	console.log(indexListe);
	// récupère le nom du fichier json correspondant
	if (indexListe >= 0) {
		fichier = listeJSON[indexListe][1];
	} else {
		fichier = "json/lieux_centroides.geojson";
	}

	d3.json(fichier, function (centroides) {
		// efface les centroïdes existants
		svg.selectAll('.lieux_centroides')
			.remove()
		// ajoute les centroïdes du fichier source sélectionné dans la liste
		afficheCentroides(centroides);
	})
}

function afficheCentroides(centroides) {
	svg.selectAll('.lieux_centroides')
		.data(centroides.features)
		.enter()
		.append("path")
		.attr("d", "path")
		.attr("transform", function (d) { return "translate(" + projection([d.properties.XCOORD, d.properties.YCOORD])[0] + ", " + projection([d.properties.XCOORD, d.properties.YCOORD])[1] + ")"; })
		.attr("d", d3.svg.symbol()
			.type(function (d) { return d.properties.symbole })
			.size(50))
		.attr("class", "lieux_centroides")
		.on('mousemove', function (d) {
			var current_lieu = d.properties.id_lieu
			d3.selectAll(".lieux").filter(function (d, i) {
				return d.properties.id_lieu == current_lieu;
			})
				.classed("lieux_highlighted", true);
			var mouse = d3.mouse(svg.node()).map(function (d) {
				return parseInt(d);
			});
			tooltip.classed('hidden', false)
				.attr('style', 'left:' + (mouse[0] + 20) + 'px; top:' + (mouse[1] + 20) + 'px')
				.html(d.properties.lieu);
		})
		.on('mouseout', function () {
			d3.selectAll(".lieux")
				.classed("lieux_highlighted", false)
			tooltip.classed('hidden', true);
		});
}

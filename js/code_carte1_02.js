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
	var titre = "<p>Superposition des lieux</p>";
	document.getElementById("titre").innerHTML = titre;
	// pied de page
	var footer = "<p>TERESMA - carte 1</p>";
	document.getElementById("footer").innerHTML = footer;

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
		.center([2.454071, 47.279229]); // On centre la carte

	var path = d3.geo.path()
		.projection(projection);

	// échelle de couleur pour les lieux
	var color = d3.scale.linear()
		.domain([1, 10])
		.range(["#f7fcf5", "#00441b"]);

	svg
		.call(zoom)
		.call(zoom.event);

	queue()
		.defer(d3.json, 'json/fond.geojson')
		.defer(d3.json, 'json/lieux_aplat.geojson')
		.await(afficheCarte);

	// Make variables accessible to other functions
	window.svg = svg;
	window.path = path;
	window.projection = projection;
	window.color = color;
	window.tooltip = tooltip;
}

function zoomed() {
	window.projection
		.translate(d3.event.translate)
		.scale(d3.event.scale);

	window.svg.selectAll("path")
		.attr("d", window.path);
}


function afficheCarte(error, fond, lieux_aplat) {
	if (error) {
		console.error("Error loading data:", error);
		return;
	}

	// Check if data is loaded properly
	if (!fond || !lieux_aplat) {
		console.error("Data not loaded properly");
		return;
	}

	window.svg.selectAll('path')
		.data(fond.features)
		.enter()
		.append('path')
		.attr("d", window.path)
		.attr("class", "fond");

	window.svg.selectAll('.lieux_aplat')
		.data(lieux_aplat.features)
		.enter()
		.append('path')
		.attr("d", window.path)
		.attr("class", "lieux_aplat")
		.style("fill", function (d) {
			var value = d.properties.nb_lieux;
			if (value) {
				return window.color(value);
			} else {
				return "#ccc";
			}
		})
		.on('mousemove', function (d) {
			var mouse = d3.mouse(window.svg.node()).map(function (d) {
				return parseInt(d);
			});
			window.tooltip.classed('hidden', false)
				.attr('style', 'left:' + (mouse[0] + 20) + 'px; top:' + (mouse[1] + 20) + 'px')
				.html(d.properties.nb_lieux + ' lieu(x)');
		})
		.on('mouseout', function () {
			window.tooltip.classed('hidden', true);
		});
}

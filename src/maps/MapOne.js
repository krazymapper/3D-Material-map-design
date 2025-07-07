import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { geoPath, geoConicConformal } from 'd3-geo';
import './MapStyles.css';

function MapOne() {
    const mapRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Clear any existing SVG
        d3.select(mapRef.current).selectAll("*").remove();

        // Set up dimensions
        const width = 700;
        const height = 700;
        const scale0 = 9000;

        // Create SVG
        const svg = d3.select(mapRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create tooltip
        const tooltip = d3.select(tooltipRef.current);

        // Set up projection (Lambert-93)
        const projection = geoConicConformal()
            .center([2.454071, 47.279229]);

        // Set up path generator
        const path = geoPath().projection(projection);

        // Set up color scale
        const color = d3.scaleLinear()
            .domain([1, 10])
            .range(["#f7fcf5", "#00441b"]);

        // Set up zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                svg.selectAll("path")
                    .attr("transform", event.transform);
            });

        // Apply zoom to SVG
        svg.call(zoom);

        // Load data
        Promise.all([
            d3.json(process.env.PUBLIC_URL + '/json/fond.geojson'),
            d3.json(process.env.PUBLIC_URL + '/json/lieux_aplat.geojson')
        ]).then(([fond, lieux_aplat]) => {
            // Draw base map
            svg.selectAll('path')
                .data(fond.features)
                .enter()
                .append('path')
                .attr("d", path)
                .attr("class", "fond");

            // Draw locations with color fills
            svg.selectAll('.lieux_aplat')
                .data(lieux_aplat.features)
                .enter()
                .append('path')
                .attr("d", path)
                .attr("class", "lieux_aplat")
                .style("fill", function (d) {
                    const value = d.properties.nb_lieux;
                    if (value) {
                        return color(value);
                    } else {
                        return "#ccc";
                    }
                })
                .on('mousemove', function (event, d) {
                    const [x, y] = d3.pointer(event);
                    tooltip.classed('hidden', false)
                        .style('left', (x + 20) + 'px')
                        .style('top', (y + 20) + 'px')
                        .html(d.properties.nb_lieux + ' lieu(x)');
                })
                .on('mouseout', function () {
                    tooltip.classed('hidden', true);
                });
        }).catch(error => {
            console.error("Error loading data:", error);
        });

        // Cleanup function
        return () => {
            d3.select(mapRef.current).selectAll("*").remove();
        };
    }, []);

    return (
        <div className="map-page">
            <div className="map-title">
                <h2>Superposition des lieux</h2>
            </div>
            <div className="map-container" ref={mapRef}></div>
            <div className="tooltip hidden" ref={tooltipRef}></div>
            <div className="map-footer">
                <p>TERESMA - carte 1</p>
            </div>
        </div>
    );
}

export default MapOne;
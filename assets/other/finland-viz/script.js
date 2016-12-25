var w = 600;
var h = 800;

var color = d3.scale.quantize()
    .range(["rgb(237,248,233)", "rgb(186,228,179)",
        "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"])
    .domain([0, 100]);

var svg = d3.select("#viz")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var projection = d3.geo.transverseMercator()
    .rotate([-27,-65,0])
    .translate([w/2, h/2])
    .scale([4000]);

var path = d3.geo.path()
    .projection(projection);

d3.json("/assets/other/finland-viz/finland.geojson", function(json) {
    d3.csv("/assets/other/finland-viz/kuntavakiluku.csv", function(data) {
        color.domain([
            d3.min(data, function(d) { return d.Vakiluku; }),
            d3.max(data, function(d) { return d.Vakiluku; })
            ]);

        for (var i = 0; i < data.length; i++) {
            var dataState = data[i].Kunta;
            var dataValue = parseInt(data[i].Vakiluku);

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.text;
                if (dataState == jsonState ) {
                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    //Stop looking through the JSON
                    break;
                }
            }
        }

        svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("d", path)
           .style("fill", setNormalColor)
           .style("stroke", "rgb(0,109,44)")
           .on("mouseover", function(d) {
                d3.select(this)
                        .style("fill", "orange");

                var coordinates = [0, 0];
                coordinates = d3.mouse(this);

                var target = d3.select("#tooltip")
                    .style("left", coordinates[0] + "px")
                    .style("top", coordinates[1]+100 + "px");
                target.select("#kunta")
                    .text(d.properties.text);
                target.select("#vakiluku")
                    .text("Väestö: " + d.properties.value);

       		    d3.select("#tooltip").classed("hidden", false);

           })
           .on("mouseout", function(d) {
                d3.select(this)
                        .style("fill", setNormalColor(d));
                d3.select("#tooltip").classed("hidden", true);	//piilota

           });
    });
});

var setNormalColor = function(d) {
    //Get data value
    var value = d.properties.value;

    if (value) {
        return color(value);
    } else {
        return "red";
    }
};
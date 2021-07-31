//  -------------------------------------------------------------
//  author        Giga
//  project       qeeqbox/qb-worldmap
//  email         gigaqeeq@gmail.com
//  description   qb-worldmap script
//  licensee      AGPL-3.0
//  -------------------------------------------------------------
//  contributors list qeeqbox/qb-worldmap/graphs/contributors
//  -------------------------------------------------------------

document.write('<script type="text/javascript" src="https://d3js.org/d3.v4.min.js"><\/script>');
document.write('<script type="text/javascript" src="https://d3js.org/topojson.v0.min.js"><\/script>');

function qb_worldmap(svg_id, world_type, selected_countries, height, width, css_style, orginal_country_color, clicked_country_color, selected_country_color, location, verbose = false) {
  verbose && console.log("Init qb_worldmap")

  var qb_worldmap_style = `<style>
        .qb-worldmap-country {
          fill: #cccccc;
          stroke: #010000;
          stroke-width: .5px;
          stroke-linejoin: round;
        }

        .qb-worldmap-graticule {
          fill: none;
          stroke: #777;
          stroke-width: .5px;
          stroke-opacity: .5;
        }</style>`

  document.head.insertAdjacentHTML("beforeend", css_style || qb_worldmap_style)
  var verbose = verbose
  var current_subject = null
  var countries = null
  var sensitivity = 75
  var orginal_country_color = orginal_country_color
  var clicked_country_color = clicked_country_color
  var location = (location === null) ? "https://cdn.jsdelivr.net/npm/world-atlas@1/world/110m.json" : location;
  var projection = d3.geoOrthographic().translate([width / 2, height / 2]);
  var org_scale = projection.scale()
  var path = d3.geoPath(projection)
  var svg = d3.select(svg_id).append("svg")
    .attr("height",height)
    .attr("width",width)
  var graticule_lines = svg.append("path")
    .datum(d3.geoGraticule())
    .attr("class", "qb-worldmap-graticule")
    .attr("d", path);

  svg.call(d3.drag().on('drag', () => {
      var rotate = projection.rotate()
      var k = sensitivity / projection.scale()
      projection.rotate([
        rotate[0] + d3.event.dx * k,
        rotate[1] - d3.event.dy * k
      ])
      svg.selectAll("path").attr("d", path)
    }))
    .call(d3.zoom().on('zoom', () => {
      projection.scale(org_scale * d3.event.transform.k)
      svg.selectAll("path").attr("d", path)
    }))

  d3.select(window)
    .on("resize", size_changed);

  d3.json(location, function(error, world) {

    if (error) {
      verbose && console.log("Failed to fetch countries")
      verbose && console.error(error)
      return
    }

    if (svg != null) {
      verbose && console.log("Init qb_worldmap countries")
      countries = topojson.object(world, world.objects.countries).geometries
      svg.selectAll(".qb-worldmap-country")
        .data(countries)
        .enter().insert("path", ".qb-worldmap-graticule")
        .attr("class", "qb-worldmap-country")
        .attr("d", path)
        .style("fill", function(d) {
          return selected_countries.includes(d.id) ? selected_country_color : orginal_country_color;
        })
        .on("click", function(d) {
          go_to_country(d.id)
        })
    }
  });

  function go_to_country(country_code_3) {
    verbose && console.log("Go to country {country_code_3}".replace("{country_code_3}", country_code_3))
    if (countries != null) {
      var target_country = countries.find(obj => {
        return obj.id === country_code_3
      })
      if (typeof target_country !== 'undefined' && target_country) {
        var country = svg.selectAll(".qb-worldmap-country")
        country.transition()
          .style("fill", function(x, y) {
            if (x.id === target_country.id) {
              current_subject = x.id
              return clicked_country_color
            } else if (selected_countries.includes(x.id)) {
              return selected_country_color
            }
            return orginal_country_color;
          });
        d3.transition()
          .delay(180)
          .duration(1500)
          .tween("rotate", function() {
            var point = d3.geoCentroid(target_country)
            var rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
            return function(x) {
              projection.rotate(rotate(x));
              country.attr("d", path);
              graticule_lines.attr("d", path);
            };
          })
          .transition()
      }
    }
  }

  function size_changed() {
    //width only
    var _width = document.getElementById(svg_id.substring(1)).clientWidth
    if (svg != null){
      svg.attr("width",_width)
      projection.translate([_width / 2, height / 2]);
      svg.selectAll("path").attr("d", path)
    }
  }

  function get_current_subject() {
    return current_subject
  }

  qb_worldmap.go_to_country = go_to_country
  qb_worldmap.get_current_subject = get_current_subject
}

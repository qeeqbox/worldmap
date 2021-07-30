An interactive world-map that has been used in live Cyber Threat interfaces. This version is very responsive (drag, click, zoom, rotate, and scale). Also, you can move to any country by the ISO ALPHA 3 code.

If you are using the old qb-worldmap, please switch to the new version!

## Live
[https://qeeqbox.github.io/worldmap/](https://qeeqbox.github.io/worldmap/)

## Invoke and Run
```html
<script src="scripts/qbworldmap.js"></script>
<div id="qb-worldmap-svg"></div>
```

### qb_worldmap()
```js
// svg                     element ID
// world_type              map type (still working on transitioning it)
// selected_countries,     list of countries to highlight
// height                  map height
// width                   map width
// css_style               custom style
// orginal_country_color   countries colors
// clicked_country_color   current country or a chosen one
// selected_country_color  countries that are highlighted, verbose
// location                world-atlas JSON location (CDN)
// verbose                 output verbose msgs

qb_worldmap("#qb-worldmap-svg", null, ["156", "840"], window.innerHeight, window.innerWidth, null, "#cccccc", "#FFFF99", "#ff726f", null, true)
```

### qb_worldmap.go_to_country()
```js
// country_code_3          ISO ALPHA 3 code

qb_worldmap.go_to_country("840")
```

## Resources
d3js.org

## Other Licenses
By using this framework, you are accepting the license terms of each package listed below:
D3, fontawesome, jquery, javascript, topojson, world-atlas

## Other Projects
[![](https://github.com/qeeqbox/.github/blob/main/data/social-analyzer.png)](https://github.com/qeeqbox/social-analyzer) [![](https://github.com/qeeqbox/.github/blob/main/data/analyzer.png)](https://github.com/qeeqbox/analyzer) [![](https://github.com/qeeqbox/.github/blob/main/data/chameleon.png)](https://github.com/qeeqbox/chameleon) [![](https://github.com/qeeqbox/.github/blob/main/data/honeypots.png)](https://github.com/qeeqbox/honeypots) [![](https://github.com/qeeqbox/.github/blob/main/data/url-sandbox.png)](https://github.com/qeeqbox/url-sandbox) [![](https://github.com/qeeqbox/.github/blob/main/data/woodpecker.png)](https://github.com/qeeqbox/woodpecker) [![](https://github.com/qeeqbox/.github/blob/main/data/docker-images.png)](https://github.com/qeeqbox/docker-images) [![](https://github.com/qeeqbox/.github/blob/main/data/seahorse.png)](https://github.com/qeeqbox/seahorse) [![](https://github.com/qeeqbox/.github/blob/main/data/rhino.png)](https://github.com/qeeqbox/rhino)

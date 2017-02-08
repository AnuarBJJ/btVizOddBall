var height = 300
var width = 500

var svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height)

var canvas = svg.append('rect')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('fill', 'blue')

var balls = [{0: false},{1: false},{2: false},{3: false},
				{4: false}, {5: false}, {6: false}, {7: false},
				{8: false}]

var odd = parseInt(Math.random()*9)

balls[odd][odd] = true

var svgBalls = svg
			.selectAll('circle')
			.data(balls)
			.enter()
			.append('circle')
			.attr('r', 10)
			.attr('fill', 'orange')
			.attr("cx", function(d, i){
				return Math.random()*200 + 50
			})

svgBalls
			.transition()
				.duration(1000)
				// .ease(d3.easeBounceOut)
				// .attr("cy", height-50)

svgBalls
		    .call(d3.drag()
		        .on("start", dragstarted)
		        .on("drag", dragged)
		        .on("end", dragended));

repelForce = d3.forceManyBody().distanceMin(1);

var simulation = d3.forceSimulation(balls)
			// .force('repel', repelForce)
			.force("collide", d3.forceCollide().radius(10))
			.force('y', d3.forceY(250).strength(0.3))

var ticked = function() {
     svgBalls
     	.attr("cx", function(d){ return d.x + 100;})
        .attr("cy", function(d){ return d.y;})
}

simulation
	.on("tick", ticked);



function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d3.select(this)
		.raise()
		.classed("active", true);
}

function dragged(d) {
  d3.select(this)
  	.attr("cx", d.x = d3.event.x)
  	.attr("cy", d.y = d3.event.y);
}

function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0.5);
	d3.select(this)
		.classed("active", false);
}

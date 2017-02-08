/*
 _____  ____  ____   ___        ______  __ __    ___       ___   ___    ___        ____    ____  _      _
|     |l    j|    \ |   \      |      T|  T  T  /  _]     /   \ |   \  |   \      |    \  /    T| T    | T
|   __j |  T |  _  Y|    \     |      ||  l  | /  [_     Y     Y|    \ |    \     |  o  )Y  o  || |    | |
|  l_   |  | |  |  ||  D  Y    l_j  l_j|  _  |Y    _]    |  O  ||  D  Y|  D  Y    |     T|     || l___ | l___
|   _]  |  | |  |  ||     |      |  |  |  |  ||   [_     |     ||     ||     |    |  O  ||  _  ||     T|     T
|  T    j  l |  |  ||     |      |  |  |  |  ||     T    l     !|     ||     |    |     ||  |  ||     ||     |
l__j   |____jl__j__jl_____j      l__j  l__j__jl_____j     \___/ l_____jl_____j    l_____jl__j__jl_____jl_____j

*/

// ----------------------------------- SVG and BACKGROUND --------------------------------------------
var height = 300
var width = 800

var svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height)

var canvas = svg.append('rect')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('fill', 'blue')
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// -----------------------------------  BALLS --------------------------------------------
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
			// make all colors the same after testing
			.attr('fill', function(d, i){
				return d[i] ? 'yellow' : 'orange'
			})

svgBalls
		    .call(d3.drag()
		        .on("start", dragstarted)
		        .on("drag", dragged)
		        .on("end", dragended));
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// ----------------------------------- SIMULATION --------------------------------------------
var simulation = d3.forceSimulation(balls)
			.force("collide", d3.forceCollide().radius(10))
			.force('y', d3.forceY(250).strength(0.3))

var ticked = function() {
     svgBalls
     	.attr("cx", function(d){ return d.x + 100;})
        .attr("cy", function(d){ return d.y;})
}

simulation
	.on("tick", ticked);

// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// ----------------------------------- DRAGGING --------------------------------------------
function dragstarted(d) {
	simulation.restart();
    simulation.alpha(1.0);
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

	d3.select(this)
		.classed("active", false);
	simulation.alphaTarget(0.1);
}
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// ----------------------------------- USING SCALES --------------------------------------------
function useScales(){
	var inTheRightScale = false;
	var inTheLeftScale = false;

	var numOfBallsOnLeft = 0;
	var numOfBallsOnRight = 0;

	var onLeft = svgBalls
			.filter(function(d, i){
				if(d.x > 100 && d.x < 180){
					numOfBallsOnLeft ++
					if(d[i] === true){
						inTheLeftScale = true
					}
				}
				return d.x > 100 && d.x < 180
			})

	var onRight = svgBalls
			.filter(function(d, i){
				if(d.x > 240 && d.x < 320){
					numOfBallsOnRight ++
					if(d[i] === true){
						inTheRightScale = true
					}
				}
				return d.x > 240 && d.x < 320
			})

	if(inTheLeftScale){
		leftScales
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -90)")

		rightScales
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -110)")

		onLeft
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -90)")

		onRight
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -110)")

	}
	else if(inTheRightScale){
		leftScales
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -110)")

		rightScales
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -90)")

		onLeft
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -110)")

		onRight
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -90)")

	}
	else{
		leftScales
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -100)")

		rightScales
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -100)")

		onLeft
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -100)")

		onRight
			.transition()
				.duration(500)
				.attr("transform", "translate(0, -100)")
	}

	console.log("On the left side: " + numOfBallsOnLeft + ". On the right side: " + numOfBallsOnRight)
}
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

//---------------------------------DRAWING SCALES -----------------------------------------------
var rightScalesCoordinartes = [[{x: 340, y:250}, {x: 420, y:250}, {x:410,y:260}, {x:350,y:260}]];

var d3DataRightScales = rightScalesCoordinartes.map(function(point){
    return point.reduce(function(s, n){return s + ', ' + n.x + ',' + n.y}, '').substr(2)
});

var rightScales = svg.append('g')

rightScales
	.selectAll("polygon")
    .data(d3DataRightScales)
    .enter()
    .append("polygon")
    .style("stroke", "#FFFCD3")
    .style("fill", '"orange')
    .attr("points", (d) =>{ return d});

var leftScalesCoordinartes = [[{x: 190, y:250}, {x: 270, y:250}, {x:260,y:260}, {x:200,y:260}]];

var d3DataLeftScales = leftScalesCoordinartes.map(function(point){
    return point.reduce(function(s, n){return s + ', ' + n.x + ',' + n.y}, '').substr(2)
});

var leftScales = svg.append('g')

leftScales
	.selectAll("polygon")
    .data(d3DataLeftScales)
    .enter()
    .append("polygon")
    .style("stroke", "#FFFCD3")
    .style("fill", '"orange')
    .attr("points", (d) =>{ return d});
//-----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

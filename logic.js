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
var height = 500
var width = 800

var svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height)

var canvas = svg.append('rect')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('fill', '#4e83ab')
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

//---------------------------------IMAGES-----------------------------------------------
// var desk =   svg
//   .append('image')
//   .attr('xlink:href','desk.jpeg')
//   .attr('height', '450')
//   .attr('width', '800')
//   .attr('x', -150)
//   .attr('y', 100)

 var bin =   svg
  .append('image')
  .attr('xlink:href','binBlueBG.jpg')
  .attr('height', '80')
  .attr('width', '80')
  .attr('x', 715)
  .attr('y', 340)
//-----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*


//---------------------------------GRADIENT COLORS-----------------------------------------------

var defs = svg.append("defs")
var steel = defs.append("radialGradient").attr('id', 'metal')
var copper = defs.append("radialGradient").attr('id', 'copper')

steel.append("stop").attr("offset", "0%").style("stop-color", "white");
steel.append("stop").attr("offset", "100%").style("stop-color", "#black");

copper.append("stop").attr("offset", "0%").style("stop-color", "#655a5a");
copper.append("stop").attr("offset", "100%").style("stop-color", "gray");

// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// -----------------------------------  BALLS --------------------------------------------
var balls = [{id: 0, odd:false},{id:1, odd:false},{id:2, odd:false},
    {id:3, odd:false}, {id:4, odd:false}, {id:5, odd:false},
    {id:6, odd:false}, {id:7, odd:false},{id:8, odd:false}];

var odd = parseInt(Math.random()*9)

balls[odd]['odd'] = true

var svgBalls = svg
			.selectAll('circle')
			.data(balls)
			.enter()
			.append('circle')
			.attr('r', 15)
			// make all balls the same colors after testing -----!!!!!!!
			.attr('fill', 'url(#metal)')
			// 	function(d, i){
			// 	return d['odd'] ? 'yellow' :
			// })

svgBalls
		    .call(d3.drag()
		        .on("start", dragstarted)
		        .on("drag", dragged)
		        .on("end", dragended));


// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// ----------------------------------- SIMULATION --------------------------------------------
var simulation = d3.forceSimulation(balls)
			.force("collide", d3.forceCollide().radius(16))
			.force('y', d3.forceY(400).strength(0.555))

var ticked = function() {
     svgBalls
     	.attr("cx", function(d, i){ return d.x + 180;})
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
	// d3.select(this)
	// 	.raise()
	// 	.classed("active", true);
}

function dragged(d, i) {
  d3.select(this)
  	.attr("cx", d.x = d3.event.x)
  	.attr("cy", d.y = d3.event.y);
}

function dragended(d, i) {

	console.log(d)
	// d3.select(this)
	// 	.classed("active", false);
	// console.log("Before remove: :", balls)

	if(d.x > 480){
		balls = balls.filter(d => d.id != i);

		var update = svg.selectAll('circle')
			.data(balls, d => d.id)
			.attr('fill', function(d, i){
				return d['odd'] ? 'yellow' : 'url(#metal)'
			})

		update
			.exit()
			.transition()
			.duration(100)
			.remove()
	}


	simulation.alphaTarget(0.1);
	// console.log("After remove: :", balls)
}
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// ----------------------------------- USING SCALES --------------------------------------------
var numOfBallsOnLeft = 0;
var numOfBallsOnRight = 0;

function useScales(){
	message[1]['text'] = parseInt(message[1]['text'])-1;
	legend.data(message).text(function(d){return d.text;})

	var text = d3.selectAll('text').data(message)
	console.log(parseInt(message[1]['text']))
	var inTheRightScale = false;
	var inTheLeftScale = false;



	var onLeft = svgBalls
			.filter(function(d, i){
				if(d.x > 100 && d.x < 180){
					numOfBallsOnLeft ++
					if(d['odd'] === true){
						inTheLeftScale = true
					}
				}
				return d.x > 100 && d.x < 180
			})

	var onRight = svgBalls
			.filter(function(d, i){
				if(d.x > 240 && d.x < 320){
					numOfBallsOnRight ++
					if(d['odd'] === true){
						inTheRightScale = true
					}
				}
				return d.x > 240 && d.x < 320
			})

	function skewLeft(){
			leftScales
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -40)")

			rightScales
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -60)")

			onLeft
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -40)")

			onRight
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -60)")

	}

	function skewRight(){
			leftScales
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -60)")

			rightScales
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -40)")

			onLeft
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -60)")

			onRight
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -40)")
	}

	function levelUp(){
			leftScales
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -50)")

			rightScales
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -50)")

			onLeft
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -50)")

			onRight
				.transition()
					.duration(1000)
					.attr("transform", "translate(0, -50)")
	}

	if(numOfBallsOnLeft === numOfBallsOnRight){
		if(inTheLeftScale){
			skewLeft()
		}
		else if(inTheRightScale){
			skewRight()
		}
		else{
			levelUp()
		}
	} else if(numOfBallsOnLeft > numOfBallsOnRight){
		skewLeft()
	} else if (numOfBallsOnLeft < numOfBallsOnRight){
		skewRight()
	}
}
// ----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

//---------------------------------DRAWING SCALES -----------------------------------------------
var rightScales = svg.append('g')
var leftScales = svg.append('g')
function drawScales(){
	var rightScalesCoordinartes = [[{x: 550, y:410}, {x: 710, y:410}, {x:690,y:420}, {x:570,y:420}]];

	var d3DataRightScales = rightScalesCoordinartes.map(function(point){
	    return point.reduce(function(s, n){return s + ', ' + n.x + ',' + n.y}, '').substr(2)
	});

	rightScales
		.selectAll("polygon")
	    .data(d3DataRightScales)
	    .enter()
	    .append("polygon")
	    .style("stroke", "#383434")
	    .style("fill", 'url(#copper)')
	    .attr("points", (d) =>{ return d});

	var leftScalesCoordinartes = [[{x: 340, y:410}, {x: 510, y:410}, {x:490,y:420}, {x:360,y:420}]];

	var d3DataLeftScales = leftScalesCoordinartes.map(function(point){
	    return point.reduce(function(s, n){return s + ', ' + n.x + ',' + n.y}, '').substr(2)
	});



	leftScales
		.selectAll("polygon")
	    .data(d3DataLeftScales)
	    .enter()
	    .append("polygon")
	    .style("stroke", "#383434")
	    .style("fill", 'url(#copper)')
	    .attr("points", (d) =>{ return d});
}
drawScales()
//-----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

//---------------------------------INFO BOARD-----------------------------------------------
var message = [{text:"SCALES USAGES LEFT:", x: 50, y: 50, size: 30, fill: "#cc0000"},
				{text: "2", x: 320, y: 50, size: 35, fill: "#cc0000"},
				{text: 'left side', x: 300, y: 90, size: 25, fill: 'black'},
				{text: 'right side', x: 450, y: 90, size: 25, fill: 'black'},
				{text: 'sorted out', x: 600, y: 90, size: 25, fill: 'black'},
				{text: 'first usage stats: ', x: 80, y: 120, size: 25, fill: 'black'},
				{text: 'second usage stats: ', x: 80, y: 170, size: 25, fill: 'black'},
				{text: numOfBallsOnLeft, x: 320, y: 120, size: 25, fill: 'black'},
				{text: numOfBallsOnRight, x: 470, y: 120, size: 25, fill: 'black'},
				{text: 'second usage stats: ', x: 80, y: 170, size: 25, fill: 'black'},
				{text: 'second usage stats: ', x: 80, y: 170, size: 25, fill: 'black'},
				]


var legend = svg.selectAll("text")
		.data(message)
		.enter()
		.append("text")
		.text(function(d){return d.text})
		.attr('x', d => d.x)
		.attr('y', d => d.y)
		.attr('font-size', d => d.size)
		.attr('fill', d => d.fill)

//-----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

//---------------------------------STEP 2-----------------------------------------------
function readyForStepTwo(){
	console.log('almost ready')

	svg.selectAll('circle')
		.filter(d => d.x > 100)
		.attr('cx', function(d){
			d.x = Math.random()*30
		})
		.attr('transform', 'translate(0, 0)')

	leftScales.attr('transform', 'translate(0, 0)')

	rightScales.attr('transform', 'translate(0, 0)')
}
//-----------------------------------------------------------------------------------------------
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*


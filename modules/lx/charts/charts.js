/*global angular, Showdown*/
angular.module('lx.charts', [])
    .factory('lxChartsConfig', function() {
        var cfg = {};

        // data related configuration
        cfg.data = {};
        cfg.data.dataUrl = './data/CPI-';
        cfg.data.dataExt = '.csv';
        cfg.data.initialYear = 2012;
        cfg.data.years = d3.range(1995,2013);
        cfg.data.aggregatedUrl = './data/cpi.csv';

        cfg.arc = {area:{}};
        cfg.arc.area.width = 300;
        cfg.arc.area.height = 300;
        cfg.arc.area.innerRadius = 85;
        cfg.arc.area.outerRadius = 125;
        cfg.arc.area.maxRadius = 150;
        cfg.arc.area.easeTime = 120; //150;
        cfg.arc.area.fontSize = 20;

        cfg.bar = {};
        cfg.bar.barHeight = 20; // height of one bar
        cfg.bar.gridLabelHeight = (cfg.bar.barHeight - 2);//18; // space reserved for gridline labels
        cfg.bar.barLabelWidth = 120; // space reserved for bar labels
        cfg.bar.valueLabelWidth = 120; // space reserved for value labels (right)
        cfg.bar.gridChartOffset = 3; // space between start of grid and first bar
        cfg.bar.barLabelPadding = 20; // padding between bar and bar labels (left)
        cfg.bar.maxBarWidth = 420; // width of the bar with the max value
        cfg.bar.maxBarAreaWidth = 500;

        cfg.graph = {};
        cfg.graph.totalW = 600;
        cfg.graph.totalH = 330;

        return cfg;
    })
    .factory('lxChartsColorUtil', function() {

            var util = {};

            // default colorscale to use
            var colorScale = new chroma.ColorScale({
                colors: ['#000000','#ff0000','#ffff00','#008000'],
                positions: [0,.25,.50,1],
                mode: 'rgb'
            })

            // returns color based on range
            util.getColorFromDefaultScale = function(value) {
                return colorScale.getColor(value);//.hex();
            }

            return util;

     })
    .controller('LxChartsCtrl', ['$scope', '$element', '$attrs','lxChartsColorUtil','lxChartsConfig',
        function (scope, element, attrs, util, cfg) {

            //constant values filled from lxChartConfig
            var w = cfg.arc.area.width;
            var h = cfg.arc.area.height;
            var easeTime = cfg.arc.area.easeTime;
            var innerRadius = cfg.arc.area.innerRadius;
            var outerRadius  = cfg.arc.area.outerRadius;
            var maxRadius = cfg.arc.area.maxRadius;


            var currentArc;
            var oldStart = 0;

            scope.arcdata = [];     //array: with the data which should be displayed
            scope.chartType;
            scope.dim1;             //first dimension of the the data for example: 'name'
            scope.dim2;             //second dimension of the the data for example: '2012'
            scope.sortPieces;       //string: 'descending' or 'ascending' specifies the sort direction
            scope.alignPieces;      //boolean: true if the thickness of the peaces should be the same although the value divers and would result in different thicknesses
            scope.keyValue = true;
            scope.keys = [];
            scope.max = 0;
            scope.name = '';
            scope.score = '';


            //$watch all attributes of the directive for changes and if so call startUpdate()
            scope.$watch('lxD3ChartType',function(value){
                if(!scope.chartType){
                    scope.chartType = value;
                } else {
                    scope.chartType = value;
                    startUpdate();
                }
            });

            scope.$watch('lxD3Dim1',function(value){
                if(!scope.dim1){
                    scope.dim1 = value;
                } else {
                    scope.dim1 = value;
                    startUpdate();
                }
            });

            scope.$watch('lxD3Dim2',function(value){
                if(!scope.dim2){
                    scope.dim2 = value;
                } else {
                    scope.dim2 = value;
                    startUpdate();
                }
            });
//
            scope.$watch('lxD3Sort',function(value){
                if(!scope.sortPieces){
                    scope.sortPieces = value;
                } else {
                    scope.sortPieces = value;
                    startUpdate();
                }
            });

            scope.$watch('lxD3Align',function(value){
                if(scope.alignPieces===undefined){
                    scope.alignPieces = value;
                } else {
                    scope.alignPieces = value;
                    startUpdate();
                }
            });

            scope.$watch('lxD3Data', function (value) {
                if (value && value.length > 0) {
                    scope.arcdata = value;

                    scope.keys = Object.keys(scope.arcdata[0]);
                    var a = scope.keys.indexOf(scope.dim1.toString());
                    var b = scope.keys.indexOf(scope.dim2.toString());
                    if(a>=0 && b>=0){
                        scope.keyValue = true;
                    } else {
                        scope.keyValue = false;
                    }
                    startUpdate();
                }
            });

            function startUpdate(){
                oldStart = 0;
                scope.setData();
                setMax();

                if(scope.chartType==='bars'){
                    updateBars();
                } else if(scope.chartType==='ring'){
                    updateRing();
                } else {
                    console.log("Fehler: Kein Chart-Type definiert! Bitte geben sie einen der folgenden Typen an, 'bars', 'ring'");
                }

            }

            //calculates the sum of the second dimension  0.2+ 0.5 ...  stores value in scope.max
            function setMax(){
                scope.max = 0;
                angular.forEach(scope.arcdata,function(value, index){
                    if(parseFloat(value[scope.dim2])){
                        scope.max += parseFloat(value[scope.dim2]);
                    }
                });
            }

            //calculates the different color depending on the values of each bar or ring-arc
            function getColor(d,i) {

                if(scope.keyValue){
                    return util.getColorFromDefaultScale((parseFloat(d[scope.dim2])/10));
                } else {
                    for (var key in d) {
                        if (d.hasOwnProperty(key)) {
                            return util.getColorFromDefaultScale((parseFloat(d[key])/10));
                        }
                        break;
                    }
                }
            }

            //is called to sort and set the data
            scope.setData = function(){
                if(scope.sortPieces==='descending' || scope.sortPieces==='ascending'){
                    scope.sortData(scope.sortPieces);
                } else {
                    scope.sortData('descending');
                }
            }

            scope.sortData = function(direction){
                if(scope.keyValue){

                    var value = function(d) {
                        if(parseFloat(d[scope.dim2])){
                            return parseFloat(d[scope.dim2]);
                        } else {
                            return d[scope.dim2];
                        }
                    };
                    scope.arcdata = scope.lxD3Data.sort(function(a, b) {
                        return d3[direction](value(a), value(b));
                    });

                } else {
                    for(var item in scope.arcdata){         //for(var t = 0; t < scope.arcdata.length; t++){
                        var temp = scope.arcdata[item];     //var temp = scope.arcdata[t];
                        if(temp[scope.dim1.toString()]===scope.dim2.toString()){
                            scope.arcdata = [];
                            for(var c = 0; c < scope.keys.length; c++){
                                var newKey = scope.keys[c];
                                if(newKey!==scope.dim1.toString() && newKey!=='pos' && newKey!=='arc'){
                                    var newValue = temp[newKey];
                                    var obj = {};
                                    obj[newKey] = newValue;
                                    scope.arcdata.push(obj);
                                }
                            }
                            break;
                        }
                    }
                }
            }

            function updateRing() {

                d3.select(element[0]).select("svg").remove();

                scope.svgElement = ringChart();

                var arcs = scope.svgElement.arcGroup.selectAll("path").data(scope.arcdata)
                    .attr("fill",getColor)
                    .attr("stroke-width",0.3)
                    .attr("stroke","#ffffff")
                    .attr("d",drawArc)
                    .on("mouseover",onMouseOver);

                // if we need to add new elements we create a new element
                arcs.enter()
                    .append("path")
                    .attr("fill",getColor)
                    .attr("stroke-width",0.3)
                    .attr("stroke","#ffffff")
                    .attr("d",drawArc)
                    .on("mouseover",onMouseOver);

                // if we've got arcs left we remove them
                arcs.exit().remove();

                setNameAndScore(scope.name,scope.score);

                //creates the baic svg elements for the ring, container, grey ring etc.
                function ringChart(){

                    var pub = {};

                    pub.rootSvg = d3.select(element[0]).append("svg:svg")
                        .attr("width",cfg.arc.area.width)
                        .attr("height",cfg.arc.area.height);

                    pub.ring = pub.rootSvg.append("svg:g")
                        .append("svg:circle")
                        .attr("cx",150)
                        .attr("cy",150)
                        .attr("r",130)
                        .attr("stroke","#dddddd")
                        .attr("stroke-width",1)
                        .attr("fill","#eeeeee");

                    pub.arcGroupOpacity = pub.rootSvg.append("svg:g")
                        .attr("class","vis-circle")
                        .attr("transform","translate(" + w/2 + "," + h/2 + ")");

                    pub.arcGroup = pub.rootSvg.append("svg:g")
                        .attr("class","vis-circle")
                        .attr("transform","translate(" + w/2 + "," + h/2 + ")");

                    pub.ringWhite = pub.rootSvg.append("svg:g")
                        .append("svg:circle")
                        .attr("cx",150)
                        .attr("cy",150)
                        .attr("r",95)
                        .attr("stroke","#ffffff")
                        .attr("stroke-width",1)
                        .attr("fill","#ffffff")
                        .attr("opacity",0.5);

                    pub.textGroup = pub.rootSvg.append("svg:g");
                    // add the text fields we'll use for output
                    pub.textGroup.selectAll("text").data([0,1]).enter()
                        .append("svg:text")
                        .attr("width",50)
                        .attr("class","output")
                    pub.textGroup
                        .attr("transform","translate(" + w/2 + "," + h/2 + ")");

                    return pub;
                }

                //function is called for drawing an arc
                function drawArc(d,i) {

                    var arc = d3.svg.arc().innerRadius(innerRadius);
                    arc.outerRadius(outerRadius );

                    // if/else make the arc piece same size if align = true or make the size depending on their value
                    if(scope.alignPieces || !scope.keyValue){
                        arc.startAngle(i*(2*Math.PI)/scope.arcdata.length);
                        arc.endAngle((i+1)*(2*Math.PI)/scope.arcdata.length);
                    } else {
                        var current = parseFloat(d[scope.dim2]);
                        if(!current){
                            current=0;
                        }
                        arc.startAngle(oldStart);
                        arc.endAngle((2*Math.PI*current)/scope.max + oldStart);
                        oldStart += (((2*Math.PI*current)/scope.max));
                    }

                    // add the arc and position to the data element
                    d.pos = i;
                    d.arc = arc;
                    return arc()
                }

                //funtion is called on mouseover, calls methods for transitions and text label
                function onMouseOver(d,i) {
                    // ease the current one back
                    if (currentArc) {
                        currentArc.transition()
                            .ease("cubic")
                            .duration(easeTime)
                            .attrTween("d",arcIn);
                    }

                    // next make sure the this one rises
                    d3.select(this).transition()
                        .ease("cubic")
                        .duration(easeTime)
                        .attrTween("d",arcOut);

                    // and set the current selected arc
                    currentArc = d3.select(this);

                    if(scope.keyValue){
                        setNameAndScore(d[scope.dim1],d[scope.dim2]);
                    } else {
                        for (var key in d) {
                            if (d.hasOwnProperty(key)) {
                                setNameAndScore(key,d[key]);
                            }
                            break;
                        }
                    }
                }

                //set the name and value labels inside the ring
                function setNameAndScore(name,score) {

                    var nameText = d3.select(scope.svgElement.textGroup.selectAll("text")[0][0]);
                    nameText.text(name);
                    var nameTextBox = nameText.node().getBBox();
                    nameText.attr("transform","translate(-" + nameTextBox.width/2 + "," + 0 + ")");

                    var scoreText = d3.select(scope.svgElement.textGroup.selectAll("text")[0][1]);
                    scoreText.text(score);
                    var scoreTextBox = scoreText.node().getBBox();
                    scoreText.attr("transform","translate(-" + scoreTextBox.width/2 + "," + scoreTextBox.height/1.1 + ")");

                    scope.name = name;
                    scope.score = score;
                }

                //animates the hover effect on mouseover ->  increase arc size
                function arcIn(d,i,a) {
                    var i = d3.interpolate(d.arc.outerRadius()(), outerRadius );

                    return function(t) {
                        d.arc.outerRadius(i(t));
                        d.currentRadius=(i(t));
                        return d.arc(i(t));
                    };
                }

                //animates the hover effect on mouseover ->  increase arc size
                function arcOut(d,i,a) {
                    var i = d3.interpolate(d.arc.outerRadius()(), maxRadius);

                    return function(t) {
                        // set the arc to the correct radius
                        d.arc.outerRadius(i(t));
                        return d.arc(i(t));
                    };
                }
            }

            function updateBars(){


                var maxDim1Chars = 0;
                var maxDim2Chars = 0;
                for (var key in scope.arcdata) {
                    if (scope.arcdata.hasOwnProperty(key)) {
                        var temp = scope.arcdata[key];

                        if(temp[scope.dim1]){
                            var lenDim1 = temp[scope.dim1].toString().length;
                            if( lenDim1 > maxDim1Chars){
                                maxDim1Chars = lenDim1;
                            }
                        }

                        if(temp[scope.dim1]){
                            var lenDim2 = temp[scope.dim2].toString().length;
                            if( lenDim2 > maxDim2Chars){
                                maxDim2Chars = lenDim2;
                            }
                        }
                    }
                }

                var barHeight = cfg.bar.barHeight; // height of one bar
                var gridLabelHeight = cfg.bar.gridLabelHeight; // space reserved for gridline labels
                var barLabelWidth = (maxDim1Chars*7);//120; // space reserved for bar labels
                var valueLabelWidth = (maxDim2Chars*7);//20; // space reserved for value labels (right)
                var gridChartOffset = cfg.bar.gridChartOffset; // space between start of grid and first bar
                var barLabelPadding = cfg.bar.barLabelPadding; // padding between bar and bar labels (left)
                var maxBarWidth = cfg.bar.maxBarWidth; // width of the bar with the max value
                var maxBarAreaWidth = cfg.bar.maxBarAreaWidth;

                // accessor functions
                var barLabel = function(d) { return d['name']; };
                var barValue = function(d) { return parseFloat(d[scope.dim2]); };

                var yScale = d3.scale.ordinal().domain(d3.range(0, scope.arcdata.length)).rangeBands([0, scope.arcdata.length * barHeight]);
                var y = function(d, i) { return yScale(i); };
                var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };

                var x = d3.scale.linear().domain([0, d3.max(scope.arcdata, barValue)]).range([0, maxBarWidth]);


                d3.select(element[0]).select("svg").remove();

                var chart = d3.select(element[0]).append("svg")
                    .attr('class','barChart')
                    .attr('width', barLabelWidth + valueLabelWidth + (2*barLabelPadding) + maxBarAreaWidth)//maxBarWidth + barLabelWidth + valueLabelWidth+200)
                    .attr('height', gridLabelHeight + gridChartOffset + scope.arcdata.length * barHeight + 90)
                    .append("g")
                    .attr("transform", "translate(40,40)");

                var formatPercent = d3.format("0");

//                var yTest = d3.scale.linear()
//                    .range([510, 0]);
                var yTest = d3.scale.ordinal()
                    //.rangeRoundBands([0, gridLabelHeight + gridChartOffset + data.length * barHeight], .1);
                    .rangeBands([0, scope.arcdata.length * barHeight]);

                yTest.domain(scope.arcdata.map(function(d) { return d['name']; }));

                var yAxis = d3.svg.axis()
                    .scale(yTest)
                    .orient("left");
//                    .tickFormat(formatPercent);


                var localMax = d3.max(scope.arcdata,function(d){
                    return d[scope.dim2];
                });
                var scale = (localMax * maxBarAreaWidth)/maxBarWidth;

                var xTest = d3.scale.linear()
                    //.range([510, 0]);
//                    .domain([0, Math.round(localMax*1.1)])
                    .domain([0, scale])
//                    .range([0, breite]);
                    .range([0, maxBarAreaWidth]);


                var xAxis = d3.svg.axis()
                    .scale(xTest)
                    .orient("top")
                    .tickFormat(formatPercent);

                //xTest.domain(data.map(function(d) { return d[scope.selected.year]; }));


                chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate("+(barLabelPadding*2+valueLabelWidth+barLabelWidth-10)+",-20)")
//                    .attr("transform", "translate(0,-20)")
                    .call(xAxis)
//                    .attr("transform", function(d) {
//                        return "rotate(-65)"
//                    });

                chart.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate("+barLabelWidth+",0)")
                    .call(yAxis)


                //                    .attr("transform", function(d) {
//                        return "rotate(-65)"
//                    });
//                    .selectAll("text")
//                    .style("text-anchor", "end")
//                    .attr("dx", "-.8em")
//                    .attr("dy", ".15em")
//                    .attr("transform", function(d) {
//                        return "rotate(-65)"
//                    })
//                    .append("text")
//                    .attr("transform", "rotate(-90)")
//                    .attr("y", 6)
//                    .attr("dy", ".71em")
//                    .style("text-anchor", "end")
//                    .text("Frequency");

//// grid line labels
                var gridContainer = chart.append('g').attr('transform', 'translate(' + (barLabelWidth+barLabelPadding) + ',' + gridLabelHeight + ')');
//
//                gridContainer.append("rect")
//                    .attr("x", 0)
//                    .attr("y", 0)
//                    .attr("width", (maxBarWidth))
//                    .attr("height", (gridLabelHeight + gridChartOffset + data.length * barHeight ))
//                    .attr("fill","#e9f7ff");
//
//                gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
//                    .attr("x", x)
//                    .attr("dy", -7)
//                    .attr("text-anchor", "middle")
//                    .attr("fill","#555555")
//                    .text(String);
//
                // vertical dashed lines
                gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
                    .attr("class", "dashed-line")
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", 0)
                    .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
                    .attr("transform", "translate(" + (valueLabelWidth+12) + ",-20)")
//                    .style("stroke", "#ff0000")
//                    .attr("stroke-width",0.3)
                    .style("stroke-dasharray", ("3, 3"));
//
//// bar labels
//                var labelsContainer = chart.append('g')
//                    .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')');
//
//                labelsContainer.selectAll('text').data(scope.arcdata).enter().append('text')
//                    .attr('y', yText)
//                    .attr('stroke', 'none')
//                    .attr('fill', '#555')
//                    .attr("dy", ".35em") // vertical-align: middle
//                    .attr('text-anchor', 'end')
//                    .text(barLabel);
//
//
// bars
                var barsContainer = chart.append('g').attr('transform', 'translate(' + (barLabelWidth-10) + ',0)'); //' + (gridLabelHeight + gridChartOffset) + '
                barsContainer.selectAll("rect").data(scope.arcdata).enter().append("rect")
                    .attr("class", "sharp")
                    .attr('y', y)
                    .attr('x',(barLabelPadding*2+valueLabelWidth))
                    .attr('height', yScale.rangeBand())
                    .attr('width', function(d) {
                        if(barValue(d)){
//                            console.log(x(barValue(d)));
                            return x(barValue(d));
                        } else {
                            return x(0);
                        }
                    })
                    .attr('stroke', 'white')
                    .attr('fill', getColor);
//
// bar value labels
                barsContainer.selectAll("text").data(scope.arcdata).enter().append("text")
                    .attr("class", "barValue")
//                    .attr("x", 560)
//                    .attr("x", function(d) { return x(barValue(d))+35; })
                    .attr("x", (barLabelPadding))
                    .attr("y", yText)
                    .attr("dx", 3) // padding-left
                    .attr("dy", ".35em") // vertical-align: middle
                    .attr("text-anchor", "start") // text-align: right
                    .attr("stroke", "none")
                    .text(function(d) {
                        if(barValue(d)){
                            return d3.round(barValue(d), 2);
                        } else {
//                            return d3.round(0, 2);
                        }
                    });
//
//// start line
//                barsContainer.append("line")
//                    .attr("y1", -gridChartOffset)
//                    .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
//                    .style("stroke", "#000");


            }

    }])
    .directive('lxCharts', function () {
        return {
            restrict: 'E',
            transclude: false,
            controller: 'LxChartsCtrl',
            scope: {
                lxD3ChartType: '=',
                lxD3Config: '=',
                lxD3Data: '=',
                lxD3Dim1: '=',
                lxD3Dim2: '=',
                lxD3Sort: '=',
                lxD3SortDim: '=',
                lxD3Align: '='
            }
        }
    });
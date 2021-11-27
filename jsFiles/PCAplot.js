var svg = d3.select("svg"),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

svg
  .append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 200)
  .attr("y", 50)
  .attr("font-size", "24px")
  .text("Principal Components Anaylsis Plot");

d3.csv("./data/PCAplot.csv").then(function (data) {
  var xScale = d3 //scales the x-axis
    .scaleLinear()
    .range([0, width])
    .domain([
      d3.min(
        data,
        (d) =>
          //max is whatever's max in the column attribute
          +d["0"]
      ),
      d3.max(
        data,
        (d) =>
          //max is whatever's max in the column attribute
          +d["0"]
      ),
    ]);

  g.append("g") //group element for x-axis
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + height + ")") //adds x-axis at the bottom of SVG
    .call(d3.axisBottom(xScale)); //insert x-axis

  g.append("g") //group element for x-axis title
    .attr("class", "xaxistitle")
    .attr("transform", "translate(0," + height + ")") //adds x-axis at the bottom of SVG
    .append("text")
    .attr("y", height - 250)
    .attr("x", width - 100)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("stroke", "red")
    .text("PCA 1"); //adds x-axis header

  var yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([d3.min(data, (d) => +d["1"]), d3.max(data, (d) => +d["1"])]);

  g.append("g")
    .attr("class", "yaxis") //group element for y-axis
    .call(d3.axisLeft(yScale));

  g.append("g") //group element for y-axis title
    //insert y-axis at the left of graph
    .attr("class", "yaxistitle")
    .append("text") //appends the y-axis header
    .attr("transform", "rotate(-90)")
    .attr("y", -55) //moves y-axis title   left and right since it was rotated
    .attr("x", 30) //decreasing this moves y-axis title down
    .attr("font-size", "14px")
    .attr("text-anchor", "end")
    .attr("stroke", "red")
    .text("PCA 2"); //y-axis title stays the same for all attributes

  g.selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")

    .attr("r", function (d) {
      return 1.5;
    })
    .attr("cx", function (d) {
      return xScale(+d["0"]);
    })
    .attr("cy", function (d) {
      return yScale(+d["1"]);
    })

    .style("fill", "#A85709");
});

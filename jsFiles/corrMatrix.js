var svg = d3.select("svg"),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin - 150;

var g = svg.append("g").attr("transform", "translate(" + 300 + "," + 50 + ")"); //g is the actual plot within svg

d3.csv("./data/corrMatrix.csv").then((rows) => {
  var data = [];
  var AttribArray = [];

  let axis1 = "";
  let axis2 = "";

  let maxCorr = -1;
  rows.forEach((d) => {
    let row = d[""];
    delete d[""];

    let corrSum = 0;
    let MaxCorrWithThisRowArray = [];

    //console.log(Object.keys(d));  //all the attributes names
    AttribArray = Object.keys(d);

    console.log(
      "IN ORDER, the attributes with greatest correlation to " + row + "\n"
    );

    for (prop in d) {
      //each attribute column in each row attribute
      let column = prop;
      let value = d[prop];
      data.push({
        row: row,
        column: column,
        value: +value,
      });
      corrSum += Math.abs(+value);

      if (Math.abs(+value) > maxCorr && Math.abs(+value) < 1) {
        axis1 = row;
        axis2 = column;
        maxCorr = Math.abs(+value);
      }

      MaxCorrWithThisRowArray.push({ val: Math.abs(+value), col: column });
    }

    MaxCorrWithThisRowArray.sort((a, b) => (a.val < b.val ? 1 : -1));
    console.log(MaxCorrWithThisRowArray);

    console.log(row + " totalcorrsum is:  " + corrSum);
  });

  // console.log(AttribArray); //works
  //console.log(data); //works
  console.log(
    axis1 +
      "  and  " +
      axis2 +
      " has greatest correlation , value is " +
      maxCorr
  );

  var xScale = d3 //scales the x-axis
    .scaleBand()
    .range([0, width - 150]) //makes the x-axis ticks closer
    .domain(AttribArray)
    .padding(0.01);

  g.append("g") //group element for x-axis
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + height + ")") //adds x-axis at the bottom of SVG
    .call(d3.axisBottom(xScale))
    .selectAll("text") //rotates the x-axis ticks' title
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  g.append("g") //group element for x-axis
    .attr("class", "xaxistitle")
    .attr("transform", "translate(0," + height + ")") //adds x-axis at the bottom of SVG
    .append("text")
    .attr("y", height - 250)
    .attr("x", width - 100)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("stroke", "red");
  //.text("Attributes"); //adds x-axis header

  var yScale = d3
    .scaleBand()
    .range([height, -50]) //makde y-axis longer
    .domain(AttribArray)
    .padding(0.01);

  g.append("g")
    .call(d3.axisLeft(yScale)) //group element for y-axis title
    //insert y-axis at the left of graph
    .attr("class", "yaxistitle")
    .append("text") //appends the y-axis header
    .attr("transform", "rotate(-90)")
    .attr("y", -55) //moves y-axis title   left and right since it was rotated
    .attr("x", -95)
    .attr("font-size", "14px")
    .attr("text-anchor", "end")
    .attr("stroke", "red");
  //.text("Attributes"); //y-axis title stays the same for all attributes

  var colors = d3
    .scaleLinear()
    .domain([-1, 0, 1])
    .range(["#1F2BF5", "#fff", "#F51F1F"]);

  g.selectAll("rect")
    .data(data, (d) => d.row + ":" + d.value)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.row))
    .attr("y", (d) => yScale(d.column))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", (d) => colors(d.value));
  //console.log("hello");
});

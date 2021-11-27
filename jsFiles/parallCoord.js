// var svg = d3.select("svg"),
//   margin = 200,
//   width = svg.attr("width") - margin - 100,
//   height = svg.attr("height") - margin - 300;

// svg //appends the title to the svg item in html
//   .append("text")
//   .attr("transform", "translate(100,0)")
//   .attr("x", 300) // increasing this moves title to right
//   .attr("y", 50) //increasing this moves title downward
//   .attr("font-size", "24px")
//   .text("Parallel Coordinates Chart");

// var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 350 + ")"); //g is the actual plot within svg

// var AttribArrayOrderedByAxis = [
//   "medianhouseholdincome($)",
//   "PovertyPercentAllAgesRate(%)",
//   "PercentofAdultsWithLessThanAhighSchoolDiploma(%)",
//   "PercentOfHispanicBeneficiaries(%)",
//   "RateofDeath(%)",
//   "PercentofAdultsWithAHighSchoolDiplomaOnly(%)",
//   "PercentOfAdultsWithAbachelor'sDegreeOrHigher(%)",
//   "PercentofAdultsCompletingSomeCollegeOrAssociate'sDegree(%)",
//   "PM2.5-24hr(ug/m3)",
//   "O3-8hr(ppm)",
//   "PM10-24hr(ug/m3)",
//   "UnemploymentRate(%)",
//   "HospitalReadmissionRateOfBeneficiaries(%)",
//   "ActualPerCapitaCost($)",
//   "PercentOfAfricanAmericanBeneficiaries(%)",
//   "PercentageofBeneficiariesWithAnEDVisit(%)",
//   "SO2-1hr(ppb)",
// ];

// d3.csv("./data/data.csv").then((data) => {
//   var y = {};
//   for (i in AttribArrayOrderedByAxis) {
//     let attrib = AttribArrayOrderedByAxis[i];
//     y[attrib] = d3
//       .scaleLinear()
//       .domain(d3.extent(data, (d) => +d[attrib]))
//       .range([height, 0]);
//   }

//   xScale = d3
//     .scalePoint()
//     .range([0, width]) // makes the axis closer together by decreasing width
//     .padding(1)
//     .domain(AttribArrayOrderedByAxis);

//   function path(d) {
//     return d3.line()(
//       AttribArrayOrderedByAxis.map((p) => {
//         return [xScale(p), y[p](d[p])];
//       })
//     );
//   }

//   g.selectAll("path")
//     .data(data)
//     .enter()
//     .append("path")
//     .attr("d", path)
//     .style("fill", "none")
//     .style("stroke", "#0c93ad")
//     .style("opacity", 0.2);

//   g.selectAll("axis")
//     .data(AttribArrayOrderedByAxis)
//     .enter()
//     .append("g")
//     .attr("transform", (d) => {
//       return "translate(" + xScale(d) + ")";
//     })
//     .each(function (d) {
//       //adds all the axis for each attribute
//       d3.select(this).call(d3.axisLeft().scale(y[d]));
//     })
//     .append("text")
//     .text((d) => {
//       return d;
//     })
//     .style("text-anchor", "start") //adds axis title
//     .style("fill", "black")
//     .attr("transform", "rotate(-60)")
//     .attr("dx", "1em")
//     .attr("dy", "0em");
// });

var svg = d3.select("svg"),
  margin = 200,
  width = svg.attr("width") - margin - 100,
  height = svg.attr("height") - margin - 300;

svg //appends the title to the svg item in html
  .append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 300) // increasing this moves title to right
  .attr("y", 50) //increasing this moves title downward
  .attr("font-size", "24px")
  .text("Parallel Coordinates Chart");

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 350 + ")"); //g is the actual plot within svg

var AttribArrayOrderedByAxis = [
  "medianhouseholdincome($)",
  "PovertyPercentAllAgesRate(%)",
  "PercentofAdultsWithLessThanAhighSchoolDiploma(%)",
  "PercentOfHispanicBeneficiaries(%)",
  "RateofDeath(%)",
  "PercentofAdultsWithAHighSchoolDiplomaOnly(%)",
  "PercentOfAdultsWithAbachelor'sDegreeOrHigher(%)",
  "PercentofAdultsCompletingSomeCollegeOrAssociate'sDegree(%)",
  "PM2.5-24hr(ug/m3)",
  "O3-8hr(ppm)",
  "PM10-24hr(ug/m3)",
  "UnemploymentRate(%)",
  "HospitalReadmissionRateOfBeneficiaries(%)",
  "ActualPerCapitaCost($)",
  "PercentOfAfricanAmericanBeneficiaries(%)",
  "PercentageofBeneficiariesWithAnEDVisit(%)",
  "SO2-1hr(ppb)",
];

d3.csv("./data/data.csv").then((data) => {
  var y = {};
  for (i in AttribArrayOrderedByAxis) {
    let attrib = AttribArrayOrderedByAxis[i];
    y[attrib] = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => +d[attrib]))
      .range([height, 0]);
  }

  xScale = d3
    .scalePoint()
    .range([0, width]) // makes the axis closer together by decreasing width
    .padding(1)
    .domain(AttribArrayOrderedByAxis);

  function path(d) {
    return d3.line()(
      AttribArrayOrderedByAxis.map((p) => {
        return [xScale(p), y[p](d[p])];
      })
    );
  }

  var background = g
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "#ddd");

  var foreground = g
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "#0c93ad");

  var g1 = g
    .selectAll("axis")
    .data(AttribArrayOrderedByAxis)
    .enter()
    .append("g")
    .attr("transform", (d) => {
      return "translate(" + xScale(d) + ")";
    });

  g1.append("g")
    .each(function (d) {
      //adds all the axis for each attribute
      d3.select(this).call(d3.axisLeft().scale(y[d]));
    })
    .append("text")
    .text((d) => {
      return d;
    })
    .style("text-anchor", "start") //adds axis title
    .style("fill", "black")
    .attr("transform", "rotate(-60)")
    .attr("dx", "1em")
    .attr("dy", "0em");

  g1.append("g")
    .attr("class", "brush")
    .each(function (d) {
      d3.select(this).call(
        (y[d].brush = d3
          .brushY()
          .extent([
            [-10, 0], //[[x0,y0], [x1,y1]]
            [10, height],
          ])
          .on("start brush end", brush))
      );
    })
    .selectAll("rect")
    .attr("x", -8)
    .attr("width", 16);

  function brush() {
    var actives = AttribArrayOrderedByAxis.filter(function (p) {
      return y[p].brush.event !== null;
    });
    var extents = actives.map(function (p) {
      return y[p].brush.extent();
    });
    // console.log(actives);
    // console.log("==================");
    // console.log(extents);

    foreground.style("display", function (d) {
      console.log("inside function");
      return actives.every(function (p, i) {
        return extents[i][0] <= d[p] && d[p] <= extents[i][1];
      })
        ? null
        : "none";
    });
  }
});

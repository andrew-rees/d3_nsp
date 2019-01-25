import * as d3 from "d3";

var array = ["ham", "eggs", "beans", "ham", "beans", "potatoes"];
console.log("js file")

/*d3.select(".chart")
  .selectAll("div")
  .data(array)
  .enter()
  .append("div")
  .style("width", function (d) {
    return d + "px";
  })
  .text(function (d) {
    return d;
  });

d3.selectAll("p").style("color", "red")

d3.select(".TERLS").style("width", "50px").enter().append("p").text("testtext.txt")*/

d3.json("testing.json").then(function(data) {
  console.log(data[0]);
});
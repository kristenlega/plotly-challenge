// python -m http.server 

function init() {

    d3.json("samples.json").then(function(data) {
    
    var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
    var otuIDs = data.samples[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id)
    var labels = data.samples[0].otu_labels.slice(0, 10).reverse();
    var trace1 = {
        x: sampleValues,
        y: otuIDs,
        type: "bar",
        orientation: "h",
        text: labels
        }
    
    var layout = {
        margin: {
            l: 100,
            r: 100,
            t: 30,
            b: 20
        }
    };
    console.log(trace1);

    Plotly.newPlot("bar", [trace1], layout);
    })};

init();

// function plot() {}

// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function optionChanged() {

    d3.json("samples.json").then(function(data) {

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  var newValue = dropdownMenu.property("value");
  var newSample = data.samples.filter(sample => sample.id === newValue);
  console.log(newSample);
  var newSampleValues = newSample[0].sample_values.slice(0,10).reverse();
  console.log(newSampleValues);
  var newotuIDs = newSample[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id)

  // Initialize x and y arrays
  // var x = [];
  // var y = [];

  var trace2 = {
    x: [newSampleValues],
    y: [newotuIDs],
    type: "bar",
    orientation: "h"
    }

    console.log(trace2)

    var layout = {
        margin: {
            l: 100,
            r: 100,
            t: 30,
            b: 20
        }
    };

  Plotly.restyle("bar", trace2, layout);
 //  Plotly.restyle("plot", "y", [y]);
})};



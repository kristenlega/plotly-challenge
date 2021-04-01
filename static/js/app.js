// python -m http.server 

// Create the initial function to load default data
function init() {

    // Read in the JSON
    d3.json("samples.json").then(function(data) {

    // Create the selector options
    var selector = d3.select("#selDataset");
    // console.log(data.names)
    
    // Add the options to the select menu
    data.names.forEach(function(name) {
        selector.append("option").text(name);
    });
    
    // Create the variables from the data
    var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
    var otuIDs = data.samples[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id)
    var labels = data.samples[0].otu_labels.slice(0, 10).reverse();

    // Create the bar trace
    var trace = {
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

    // Plot the iniital bar chart rendering
    Plotly.newPlot("bar", [trace], layout);

    // Get the variables for the bubble chart
    var sampleValues1 = data.samples[0].sample_values
    var otuIDs1 = data.samples[0].otu_ids
    var labels1 = data.samples[0].otu_labels

    // Create the bubble trace
    var trace1 = {
        x: otuIDs1,
        y: sampleValues1,
        text: labels1,
        mode: "markers",
        marker: {
            size: sampleValues1,
            color: otuIDs1,
            }
        };

    var layout1 = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1200
        };
    
    // Plot the initial bubble chart rendering
    Plotly.newPlot("bubble", [trace1], layout1 )

    // Call in the metadata
    var sampleMetadata = data.metadata[0]
    var demographic = d3.select("#sample-metadata")

    // Append each key and value to the demographic info
    Object.entries(sampleMetadata).forEach(([key, value]) => {
        demographic.append("p")
        .text(`${key}: ${value}`);
    })

})};

init();



// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function optionChanged() {

    d3.json("samples.json").then(function(data) {

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    var newValue = dropdownMenu.property("value");

    // Pull the new data based on the selecction 
    var newSample = data.samples.filter(sample => sample.id === newValue)[0];
    var newSampleValues = newSample.sample_values.slice(0,10).reverse();
    var newotuIDs = newSample.otu_ids.slice(0,10).reverse().map(id => "OTU " + id)

    // New Bar Trace
    var newtrace = {
        x: [newSampleValues],
        y: [newotuIDs],
        type: "bar",
        orientation: "h"
        }

    var layout = {
        margin: {
            l: 100,
            r: 100,
            t: 30,
            b: 20
        }
    };

    // Restyle the bar chart
    Plotly.restyle("bar", newtrace, layout);

    // Get the new variables for the bubble chart
    var newSampleValues1 = newSample.sample_values
    var newotuIDs1 = newSample.otu_ids
    var newLabels1 = newSample.otu_labels

    // New Bubble Trace
    var newTrace1 = {
        x: [newotuIDs1],
        y: [newSampleValues1],
        text: [newLabels1],
        mode: "markers",
        marker: {
            size: newSampleValues1,
            color: newotuIDs1,
            }
        };

    var layout1 = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1200
        };

    // Restyle the Bubble
    Plotly.restyle("bubble", newTrace1, layout1);

    // Clear metadata box
    d3.select("#sample-metadata").html("");

    // Update the metadata box
    var newSampleMetadata = data.metadata.filter(sample => sample.id.toString() === newValue)[0];
    var newDemographic = d3.select("#sample-metadata");
    console.log(newSampleMetadata)


    // Append each key and value to the demographic info
    Object.entries(newSampleMetadata).forEach(([key, value]) => {
        newDemographic.append("p")
        .text(`${key}: ${value}`);
    })

})};



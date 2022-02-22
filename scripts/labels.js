// labels.js
// Attached to label-sheet.html

$(document).ready(function() {
  //Which label sheet to make
  let labelType = localStorage.getItem("labelType");
  let startingLabel = localStorage.getItem("startingLabel");

  // Is this student or asset labels?
  if (labelType == "student") {
    let labelData = JSON.parse(localStorage.getItem("labelData"));
    // Loop to append all the labels and ID them 1-30
    for (var i = 1; i < 31; i++) {
      var labelId = '<div id="label' + i + '" class="label">'
      $(".addLabels").append(labelId + '<span class="stuName"></span><br><span class="barcode"></span></div>');
    }
    // Check that more labels weren't assigned than available
    if (labelData.length + Number(startingLabel) > 31) {
      alert("You assigned more labels than available!");
    } else {
      // insert the student name and id into the labels
      for (var i = 0; i < labelData.length; i++) {
        labelNumber = Number(startingLabel) + i;
        if (labelData[i][0] != "" && labelData[i][1] != "") {
          let studentName = labelData[i][0];
          let studentId = labelData[i][1];
          $('#label' + labelNumber + ' span.stuName').text(studentName);
          $('#label' + labelNumber + ' span.barcode').text(studentId);

        } else if (labelType == "asset") {
          console.log("asset label");
        }
      }
    }
  } else if (labelType == "asset") {
    let labelData = JSON.parse(localStorage.getItem("labelData"));
    // Loop to append all the labels and ID them 1-30
    for (var i = 1; i < 31; i++) {
      var labelId = '<div id="label' + i + '" class="label">'
      $(".addLabels").append(labelId + '<span class="npsTag"></span><br><span class="assetBarcode"></span><br><span class="dontCover"></span></div>');
    }
    // Check that more labels weren't assigned than available
    if (labelData.length + Number(startingLabel) > 31) {
      alert("You assigned more labels than available!");
    } else {
      for (var i = 0; i < labelData.length; i++) {
        if (labelData != "") {
          labelNumber = Number(startingLabel) + i;
          $('#label' + labelNumber + ' span.assetBarcode').text(labelData[i]);
          $('#label' + labelNumber + ' span.npsTag').text("Nutley Public Schools");
          $('#label' + labelNumber + ' span.dontCover').text("DO NOT COVER OR REMOVE");
        }
      }
    }
  }
});

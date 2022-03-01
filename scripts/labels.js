// labels.js
// Attached to label-sheet.html

$(document).ready(function() {
  //Which label sheet to make
  let labelType = localStorage.getItem("labelType");
  let startingLabel = localStorage.getItem("startingLabel");
  console.log(labelType);

  // Is this student/staff or asset labels?
  if (labelType == "staff" || labelType == "student") {
    let labelData = JSON.parse(localStorage.getItem("labelData"));
    // Loop to append all the labels and ID them 1-30
    for (var i = 1; i < 31; i++) {
      var labelId = '<div id="label' + i + '" class="label">'
      $(".addLabels").append(labelId + '<span class="userName"></span><br><svg class="barcode"></svg></div>');
    }
    // Check that more labels weren't assigned than available
    if (labelData.length + Number(startingLabel) > 31) {
      alert("You assigned more labels than available!");
    } else {
      // insert the student name and id into the labels
      for (var i = 0; i < labelData.length; i++) {
        labelNumber = Number(startingLabel) + i;
        if (labelData[i][0] != "" && labelData[i][1] != "") {
          let userName = labelData[i][0];
          let userId = labelData[i][1];
          if (labelType == "student") {
            $('#label' + labelNumber + ' span.userName').text(userName);
            JsBarcode('#label' + labelNumber + ' svg.barcode', userId, {
              height: 30,
              width: 1.5,
              fontSize: 16,
              marginTop: 3
            });
          } else if (labelType == "staff") { // barcode only -- no text underneath
            $('#label' + labelNumber + ' span.userName').text(userName.toUpperCase());
            JsBarcode('#label' + labelNumber + ' svg.barcode', userId, {
              height: 30,
              width: 1.5,
              fontSize: 16,
              displayValue: false
            });
          }

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
      $(".addLabels").append(labelId + '<span class="npsTag"></span><br><svg class="assetBarcode"></svg><br><span class="dontCover"></span></div>');
    }
    // Check that more labels weren't assigned than available
    if (labelData.length + Number(startingLabel) > 31) {
      alert("You assigned more labels than available!");
    } else {
      for (var i = 0; i < labelData.length; i++) {
        if (labelData != "") {
          labelNumber = Number(startingLabel) + i;
          $('#label' + labelNumber + ' span.npsTag').text("Nutley Public Schools");
          $('#label' + labelNumber + ' span.dontCover').text("DO NOT COVER OR REMOVE");
          JsBarcode('#label' + labelNumber + ' svg.assetBarcode', labelData[i], {
            height: 25,
            width: 1,
            fontSize: 16,
            textPosition: "top",
            marginTop: 1
          });
        }
      }
    }
  }
});

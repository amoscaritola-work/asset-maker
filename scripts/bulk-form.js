// Pad number with leading zeros
function padLeadingZeros(num) {
    var s = num+"";
    while (s.length < 4) s = "0" + s;
    return s;
}

// Get the label data from all the rows
$('.btn-finished').on('click', function() {
  localStorage.clear(); // Clear any local stored data
  let assetData = []; //store the data as list in lists.

  let assetIdVal = $('.assetId').val();

  //Convert the value to string
  let assetId = assetIdVal.toString();

  //Check string length then seperate the last 4 digits.
  if ( assetIdVal.length == 10 ) {
    console.log("good");
    let assetPrefix = assetId.slice(0, 6);
    let assetSuffix = assetId.slice(6, 10);

    //Make last 4 digits a number
    let startVal = parseInt(assetSuffix)

    //Loop through adding 1 to each and push to list
    for (var i = 0; i < 30; i++) {
      let label = assetPrefix + padLeadingZeros(startVal);
      assetData.push(label);
      startVal++;
    }

  }

  localStorage.setItem("labelType", "asset"); // set label form for student
  localStorage.setItem("labelData", JSON.stringify(assetData));
  localStorage.setItem("startingLabel", "1");
});

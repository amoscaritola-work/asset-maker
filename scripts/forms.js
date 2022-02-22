// Set the options for the starting label drop-down (1-30)
for (var i = 1; i < 31; i++) {
  $(".startingLabel").append('<option value="' + i + '">' + i + '</option>');
}

// Function to get the current count of label rows
function updateRowCount() {
  return $(".formTable tr").length - 1;
}

function updateLabelCount(currentRowCount) {
  $(".labelCount").val("Total: " + currentRowCount);
}

// Warn if too many labels for sheet
function labelCountCheck(){
  let currentRowCount = Number(updateRowCount());
  let selectedStartingLabel = Number($('.startingLabel').val());
  if (currentRowCount + selectedStartingLabel > 31) {
    $(".labelCount").removeClass("bg-success").addClass("bg-danger");
  } else {
    $(".labelCount").removeClass("bg-danger").addClass("bg-success");
  }
}

// Update label count when selecting starting label
$('.startingLabel').on('change', function() {
  labelCountCheck();
});

// Click button to delete row
$('.formTable').on('click', '.btnDelete', function() {
  $(this).closest('tr').remove();
  let currentRowCount = updateRowCount();
  updateLabelCount(currentRowCount);
  labelCountCheck();
});

// Do Stuff if we're on the student label form
if ( document.URL.includes("student-form.html") ) {
  $(".add-row").on('click', function() {
    let currentRowCount = updateRowCount();
    let rowToAdd = `<tr>
        <td><input type="text" class="form-control stuName" name="" value="" required></td>
        <td><input type="text" class="form-control stuID" name="" value="" required></td>
        <td>
          <button class="btn btn-md btn-danger btn-block btnDelete" type="button"><i class="bi bi-person-x-fill"></i></button>
        </td>
        </tr>`;
    // Append row.. don't allow more than 30 rows
    if (currentRowCount < 30) {
      $(".userBody").append(rowToAdd);
      updateLabelCount(currentRowCount + 1);
      labelCountCheck();
    }
  });

  // Get the label data from all the rows
  $('.btn-finished').on('click', function() {
    localStorage.clear(); // Clear any local stored data
    let studentData = []; //store the data as list in lists.
    $(".userBody").find('tr').each(function() {
      let stuName = $(this).find('.stuName').val();
      let stuID = $(this).find('.stuID').val();
      studentData.push([stuName, stuID]);
    });
    let startingLabel = $('.startingLabel').find(":selected").val();
    localStorage.setItem("labelType", "student"); // set label form for student
    localStorage.setItem("labelData", JSON.stringify(studentData));
    localStorage.setItem("startingLabel", startingLabel);
  });
}

// Do Stuff if we're on the asset label form
if ( document.URL.includes("asset-form.html") ) {
  $(".add-row").on('click', function() {
    let currentRowCount = updateRowCount();
    let rowToAdd = `<tr>
      <td><input type="text" class="form-control assetId" placeholder="" name="" value="" required></td>
      <td>
        <button class="btn btn-md btn-danger btn-block btnDelete" type="button"><i class="bi bi-person-x-fill"></i></button>
      </td>
    </tr>`;
    // Append row.. don't allow more than 30 rows
    if (currentRowCount < 30) {
      $(".userBody").append(rowToAdd);
      updateLabelCount(currentRowCount + 1);
      labelCountCheck();
    }
  });

  // Get the label data from all the rows
  $('.btn-finished').on('click', function() {
    localStorage.clear(); // Clear any local stored data
    let assetData = []; //store the data as list in lists.
    $(".userBody").find('tr').each(function() {
      let assetId = $(this).find('.assetId').val();
      assetData.push(assetId);
    });
    let startingLabel = $('.startingLabel').find(":selected").val();
    localStorage.setItem("labelType", "asset"); // set label form for student
    localStorage.setItem("labelData", JSON.stringify(assetData));
    localStorage.setItem("startingLabel", startingLabel);
  });
}

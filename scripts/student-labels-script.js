console.log("student-label-script connected!");

var studentName = localStorage.getItem("studentName");
var studentId = localStorage.getItem("studentId");
var labelNumber = localStorage.getItem("labelNumber");

if (labelNumber <= 30) {
  $('#name' + labelNumber).text(studentName);
  $('#id' + labelNumber).text(studentId);
}



console.log(studentName);

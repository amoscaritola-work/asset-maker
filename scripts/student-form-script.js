function getData()
{
    //gettting the values
    var studentName = document.getElementById("studentName").value;
    var studentId = document.getElementById("studentId").value;
    var labelNumber = document.getElementById("labelNumber").value;
    //saving the values in local storage
    localStorage.setItem("studentName", studentName);
    localStorage.setItem("studentId", studentId);
    localStorage.setItem("labelNumber", labelNumber);

}

// Khai báo mảng thông tin
var testScore = { 
    name: "",
    math: 0,
    phys: 0,
    chem: 0
}
// Tạo hàm khi click vào "Nhập"
function enter() {
    // Gán giá trị vào biến
    testScore.name = document.getElementById("name").value;
    testScore.math = document.getElementById("math").value;
    testScore.phys = document.getElementById("phys").value;
    testScore.chem = document.getElementById("chem").value; 
    // Tạo điều kiện nhập dữ liệu
    if(testScore.name==="" || testScore.math==="" || testScore.phys==="" || testScore.chem==="") {
        alert("Bạn đã nhập thiếu thông tin, hãy nhập lại!!!");
    } else if(testScore.math < 0 || testScore.phys < 0 || testScore.chem <0 ) {
        alert("Điểm số phải > 0, hãy nhập lại!!!");
    } else {
        var table = document.getElementById("myTable");
        for (var i = 0, row; row = table.rows[i]; i++) {}
        //Tạo các cột tương ứng
        var row = table.insertRow(table.rows[i]);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        // Gán giá trị đã nhận vào cột
        cell1.innerHTML = i;
        cell2.innerHTML = testScore.name;
        cell3.innerHTML = testScore.math;
        cell4.innerHTML = testScore.phys;
        cell5.innerHTML = testScore.chem;
        cell6.innerHTML = "?";
        cell7.innerHTML = "Chưa xếp loại";
        cell8.innerHTML = "<button onclick='deleteRow()' id='delete'>Xóa</button>";
    }
}
// Khởi tạo hàm tính điểm trung bình
function avg() {
    var table = document.getElementById("myTable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var avg = (parseFloat(row.cells[2].innerHTML) + parseFloat(row.cells[3].innerHTML) + parseFloat(row.cells[4].innerHTML)) / 3;
        avg = avg.toFixed(1);
        row.cells[5].innerHTML = avg;
    }
}
// Khởi tạo hàm kiểm tra học sinh giỏi
function goodStudent() {
    var table = document.getElementById("myTable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var avg = row.cells[5].innerHTML;
        if (avg == "?") {
            alert("Hãy tính điểm trung bình trước khi xác định Học sinh giỏi!");
            break;
        } else if(avg >= 8) {
            for (var j = 0, cell; cell = row.cells[j]; j++) {
                row.cells[j].classList.add("avg8");
            }
        }
    }
}
// Khởi tạo hàm reset dữ liệu nhập
function reset() {
    document.getElementById("name").value = "";
    document.getElementById("math").value = "";
    document.getElementById("phys").value = "";
    document.getElementById("chem").value = "";
}
// Khởi tạo hàm Xếp loại học lực
function rank() {
    var table = document.getElementById("myTable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var avg = row.cells[5].innerHTML;
        var mathmark = parseFloat(row.cells[2].innerHTML);
        var physmark = parseFloat(row.cells[3].innerHTML);
        var chemmark = parseFloat(row.cells[4].innerHTML);
        if (avg == "?") {
            alert("Hãy tính điểm trung bình trước khi xếp loại!");
            break;
        } else if (avg >= 8 && mathmark >=7 && physmark >=7 && chemmark >=7) {
            row.cells[6].innerHTML = "Xuất sắc";
        } else if (avg >= 6.5 && mathmark >=5 && physmark >=5 && chemmark >=5) {
            row.cells[6].innerHTML = "Khá";
        } else if (avg >= 5 && mathmark >=3.5 && physmark >=3.5 && chemmark >=3.5) {
            row.cells[6].innerHTML = "Trung bình";
        } else {
            row.cells[6].innerHTML = "Yếu";
        }
    }
}
//Tạo hàm xóa dữ liệu nhập vào
function deleteRow() {
    var index, table = document.getElementById("myTable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        table.rows[i].cells[7].onclick = function() {
            var c = confirm("Bạn chắc chắn muốn xóa dữ liệu này?");
            if(c === true) {
                index = this.parentElement.rowIndex;
                table.deleteRow(index);
                i--;
                for (var i = 1; row = table.rows[i]; i++) {
                    row.cells[0].innerHTML = i;
                }
            }
        }
    }
}
//Tạo hàm xuất file excel
function exportTableToExcel(myTable, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(myTable);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);       
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

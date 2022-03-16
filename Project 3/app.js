var i = 0;
$(document).ready(function(){
    //Nhập dữ liệu
    $("#enter").click(function (){
        var name = $("#name").val();
        var math = $("#math").val();
        var phys = $("#phys").val();
        var chem = $("#chem").val();
        var vag = "?";
        i++;
        if(name === "" || math === "" || phys === "" || chem === "") {
            alert("Bạn đã nhập thiếu thông tin, hãy nhập lại!!!");
        } else if(math < 0 || phys < 0 || chem <0 ) {
            alert("Điểm số phải > 0, hãy nhập lại!!!");
        } else {
            $("#myTable").append(
                "<tr><td>" + i + "</td>"
                + "<td>" + name + "</td>"
                + "<td>" + math + "</td>"
                + "<td>" + phys + "</td>"
                + "<td>" + chem + "</td>"
                + "<td>" + vag + "</td>"
                + "<td>" + "--" + "</td>"
                + "<td><input type='checkbox' name='record' id='checkbox'></td>"
            );
            $(".delete-row").click(function(){
                $("table tbody").find('input[name="record"]').each(function(){
                    if($(this).is(":checked")){
                        var table = document.getElementById("myTable");
                        $(this).parents("tr").remove();
                        i--;
                        for (var i = 1; row = table.rows[i]; i++) {
                            row.cells[0].innerHTML = i;
                        }
                    }
                });
            });
            $("#info")[0].reset();
        }
    });
    //Tạo hàm tính điểm trung bình
    $("#avgmark").click(function (){
        $("tr:gt(0)").each(function (){
           var math = parseFloat($(this).children().eq(2).text());
           var phys = parseFloat($(this).children().eq(3).text());
           var chem = parseFloat($(this).children().eq(4).text());
           var average = (math +phys + chem)/3;
           avgfix = average.toFixed(1)
           $(this).children().eq(5).text(avgfix);
        });
    });
    //tạo hàm kiểm tra học sinh giỏi
    $("#goodStudent").click(function(){
        $("tr:gt(0)").each(function (){
            var average = $(this).children().eq(5).text();
            if (average >= 8) {
                $(this).children().eq(0).addClass("avg8")
                $(this).children().eq(1).addClass("avg8")
                $(this).children().eq(2).addClass("avg8")
                $(this).children().eq(3).addClass("avg8")
                $(this).children().eq(4).addClass("avg8")
                $(this).children().eq(5).addClass("avg8")
                $(this).children().eq(6).addClass("avg8")
            }
        });
    });
    // Tạo hàm Xếp loại học lực
    $("#studentrank").click(function(){
        $("tr:gt(0)").each(function (){
            var math = parseFloat($(this).children().eq(2).text());
            console.log(math);
            var phys = parseFloat($(this).children().eq(3).text());
            var chem = parseFloat($(this).children().eq(4).text());
            var average = (math +phys + chem)/3;
            if (average == "?") {
                alert("Hãy tính điểm trung bình trước khi xếp loại!");
            } else if (average >= 8 && math >=7 && phys >=7 && chem >=7) {
                $(this).children().eq(6).text("Xuất sắc");
            } else if (average >= 6.5 && math >=5 && phys >=5 && chem >=5) {
                $(this).children().eq(6).text("Khá");
            } else if (average >= 5 && math>=3.5 && phys >=3.5 && chem >=3.5) {
                $(this).children().eq(6).text("Trung Bình");
            } else {
                $(this).children().eq(6).text("Yếu");
            }
        })
    });
});
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

//Pagination start
// $("#paging").pagination({
//     dataSource: "/sp?page=1",
//     locator: "data",
//     totalNumberLocator: function(response) {
//         // you can return totalNumber by analyzing response content
//         return response.total;
//     },
//     pageSize: 5,
//     afterPageOnClick: function(event, pageNumber){
//         loadPage(pageNumber);
//     }
// })

// function loadPage(page){
//     $('#content').html = "";
//     $.ajax({
//         url: "/sp?page="+page
//     })
//     .then((rs) => {
//         console.log(rs.tongSoPage);
//         for (let i = 0; i < rs.data.length; i++) {
//             const element = rs.data[i];
//             var item = $(`<h2>${element.tensp}</h2>`)
//             $('#content').append(item);
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// }

// loadPage(1);
//Pagination end

// Thong bao them san pham start
// $("#form-add").submit(function(event){
//     alert("Add success");
//     window.location.href = "/sp";
// })
// Thong bao them san pham end


//Update product start
// $("#form-update").submit(function(event){
//     event.preventDefault();
//     var unindexed_array = $(this).serializeArray();
//     console.log(unindexed_array);
// })
//Update product end

//Delete Product start
if(window.location.pathname == "/sp"){
    $ondelete = $(".table td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");
        var request = {
            url: `http://localhost:3000/sp/${id}`,
            method: "DELETE"
        };

        if(confirm("Bạn thực sự muốn xóa sản phẩm này")){
            $.ajax(request).done(function(){
                alert("Xóa thành công!");
                location.reload();
            })
        }
    })
}
//Delete Product end

//Delete The loai start
if(window.location.pathname == "/theloai"){
    $ondelete = $(".table td a.delete");
    $ondelete.click(function(event){
        var id = $(this).attr("data-id");
        var request = {
            url: `http://localhost:3000/theloai/${id}`,
            method: "DELETE"
        }

        if(confirm("Bạn thực sự muốn xóa thể loại này?")){
            $.ajax(request).done(function(){
                alert("Xóa thành công!");
                window.location.reload();
            })
        }
    })
}
//Delete The loai end

//Delete User start
if(window.location.pathname == "/users/quanli"){
    $ondelete = $(".table td a#delete");
    $ondelete.click(function(event){
        var id = $(this).attr("data-id");
        var request = {
            url: `http://localhost:3000/users/quanli/${id}`,
            method: "DELETE"
        }

        if(confirm("Bạn thực sự muốn xóa thể loại này?")){
            $.ajax(request).done(function(){
                alert("Xóa thành công!");
                window.location.reload();
            })
        }
    })
}
//Delete User end

//Hien thi anh khi chon start
let uploadBtn = document.getElementById("file");
let chooseImage = document.getElementById("chooseImg");

uploadBtn.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadBtn.files[0]);
    reader.onload = () => {
        chooseImage.setAttribute("src", reader.result);
    }
}
//Hien thi anh khi chon end






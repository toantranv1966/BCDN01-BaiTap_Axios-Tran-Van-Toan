// Biến toàn cục (Global Variable)

var userServices = new UserServices();

var validation = new Validation();

// Mãng danh sách User

var mangND = [];

function getELE(id){
    return document.getElementById(id);
}

// Lấy User từ API

function layDSUSER(){
    userServices.layDS().then(function(response){
    localStorage.setItem("DSUSER",JSON.stringify(response.data));
    hienThiTable(response.data);
    })
    .catch(function(error){
        alert(error);
    });

}

layDSUSER();

function getLocalStorage(){
    if(localStorage.getItem("DSNV") != null){
        mangND = JSON.parse(localStorage.getItem("DSUSER"));
    }
}
getLocalStorage();

// Hiển thị danh sách người dùng lên table

function hienThiTable(mangUser){
    var content = "";

    mangUser.map(function(item,index){
        content+=`
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaUser('${item.id}');">Xóa</button>
                <button class="btn btn-info" onclick="layChitiet('${item.id}');"  data-toggle="modal" data-target="#myModal")>Xem</button>
            </td>
            
        </tr>
        `;
    });

    document.querySelector("#tblDanhSachNguoiDung").innerHTML = content;
}

function themUser(){

    clearThongbao();

    // Lấy thông tin từ form
    var taikhoan = document.querySelector("#TaiKhoan").value;
    var hoten = document.querySelector("#HoTen").value;
    var matkhau = document.querySelector("#MatKhau").value;
    var email = document.querySelector("#Email").value;
    var loaind = document.querySelector("#loaiNguoiDung").value;
    var ngonngu = document.querySelector("#loaiNgonNgu").value;
    var mota = document.querySelector("#MoTa").value;
    var hinhanh = document.querySelector("#HinhAnh").value;

    var user = new User(taikhoan,hoten,matkhau,email,loaind,ngonngu,mota,hinhanh);

    // Validation (Kiểm tra dữ liệu trước khi nhập vào)

    var isValid = true;

    // 1. Kiểm tra tài Khoản (username): không được để trống, không được trùng

    isValid = validation.checkEmpty(taikhoan,"tbTKND","Tài khoản không để trống!") && validation.checkID(taikhoan,"tbTKND","Tài khoản không được trùng!",mangND);

    // 2. Kiểm tra họ tên

    isValid &= validation.checkName(hoten,"tbhoTen","Tên người dùng là ký tự chữ & không để trống");

    // 3. Kiểm tra mật khẩu

    isValid &= validation.checkPass(matkhau,"tbmatKhau","Mật khẩu không đúng yêu cầu");

    // 4. Kiểm tra email

    isValid &= validation.checkEmail(email,"tbemail","Email không đúng định dạng");

    // 5. Kiểm tra hình ảnh

    isValid &= validation.checkEmpty(hinhanh,"tbHinhanh","Hình ảnh không để trống!");

    // 6. Kiểm tra người dùng

    isValid &= validation.checkDropdown("loaiNguoiDung","tbnguoiDung","Bạn chưa chọn người dùng");

    // 7. Kiểm tra loại ngôn ngữ

    isValid &= validation.checkDropdown("loaiNgonNgu","tbngonNgu","Bạn chưa chọn ngôn ngữ");

    isValid &= validation.checkEmpty(mota,"tbmoTa","Mô tả không đứng yêu cầu") && validation.checkdoDai(mota,"tbmoTa","Mô tả không đứng yêu cầu");

    // Nếu tất cả dữ liệu đều hợp lệ
    // Lưu thông tin user lên MOCKAPI

    if(isValid){
        userServices.themUser(user)
        .then(function(response){
            alert("Thêm thành công")
            layDSUSER();
            document.querySelector("#myModal .close").click();
        })
        .catch(function(error){
            alert(error);
        })
    }else{
        alert("Dữ liệu không hợp lệ!");
    }
}


/**
 * Onclick ghi đè sự kiện click trên button có nhiều sự kiện
 * Nên dùng addEventListner => không ghi đè sự kiện onclick button
 */

document.querySelector("#btnThemNguoiDung").addEventListener("click",function(){
    document.querySelector("#TaiKhoan").disabled = false;
    getELE("formQLND").reset();
    clearThongbao();
    document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="themUser();">Thêm</button>`;
})

function layChitiet(id){
    document.querySelector(".modal-title").innerHTML = "Xem / Cập nhật";
    clearThongbao();

    userServices.layUser(id)    
    .then(function(response){
        document.querySelector("#TaiKhoan").value = response.data.taiKhoan;
        document.querySelector("#TaiKhoan").disabled = true;
        document.querySelector("#HoTen").value = response.data.hoTen;
        document.querySelector("#MatKhau").value = response.data.matKhau;
        document.querySelector("#Email").value = response.data.email;
        document.querySelector("#loaiNguoiDung").value = response.data.loaiND;
        document.querySelector("#loaiNgonNgu").value = response.data.ngonNgu;
        document.querySelector("#MoTa").value = response.data.moTa;
        document.querySelector("#HinhAnh").value = response.data.hinhAnh;

        document.querySelector(".modal-footer").innerHTML = `
        <button class="btn btn-success" onclick="capNhatUser('${response.data.id}');">Cập Nhật</button>`;
    })
    .catch(function(error){
        alert(error);
    })
}

function capNhatUser(id){
    // Lấy thông tin từ form
    var taikhoan = document.querySelector("#TaiKhoan").value;
    var hoten = document.querySelector("#HoTen").value;
    var matkhau = document.querySelector("#MatKhau").value;
    var email = document.querySelector("#Email").value;
    var loaind = document.querySelector("#loaiNguoiDung").value;
    var ngonngu = document.querySelector("#loaiNgonNgu").value;
    var mota = document.querySelector("#MoTa").value;
    var hinhanh = document.querySelector("#HinhAnh").value;

    var user = new User(taikhoan,hoten,matkhau,email,loaind,ngonngu,mota,hinhanh);

    // Validation (Kiểm tra dữ liệu trước khi update lên MockAPI)

    var isValid = true;

    // 2. Kiểm tra họ tên

    isValid &= validation.checkName(hoten,"tbhoTen","Tên người dùng là ký tự chữ & không để trống");

    // 3. Kiểm tra mật khẩu

    isValid &= validation.checkPass(matkhau,"tbmatKhau","Mật khẩu không đúng yêu cầu");

    // 4. Kiểm tra email

    isValid &= validation.checkEmail(email,"tbemail","Email không đúng định dạng");

    // 5. Kiểm tra hình ảnh

    isValid &= validation.checkEmpty(hinhanh,"tbHinhanh","Hình ảnh không để trống!");

    // 6. Kiểm tra người dùng

    isValid &= validation.checkDropdown("loaiNguoiDung","tbnguoiDung","Bạn chưa chọn người dùng");

    // 7. Kiểm tra loại ngôn ngữ

    isValid &= validation.checkDropdown("loaiNgonNgu","tbngonNgu","Bạn chưa chọn ngôn ngữ");

    isValid &= validation.checkEmpty(mota,"tbmoTa","Mô tả không đứng yêu cầu") && validation.checkdoDai(mota,"tbmoTa","Mô tả không đứng yêu cầu");

    if(isValid){
        userServices.capNhatUser(user, id)
        .then(function(response){
            alert("Cập nhật thành công")
            layDSUSER();
            document.querySelector("#myModal .close").click();
        })
        .catch(function(error){
            alert(error);
        })
    }else{
        alert("Dữ liệu không hợp lệ");
    }
    
}

// Xóa User

function xoaUser(id){
    userServices.xoaUser(id)
    .then(function(response){
        layDSUSER();
        alert("Bạn đã xóa thành công");
        document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        alert(error);
    })

}

// Tìm kiếm người dùng theo tài khoản (Username)

    function timKiemtheoTK(){
    var mangKQ = [];
    var lowerTK = getELE("searchTaiKhoan").value;
    lowerTK = lowerTK.trim().toLowerCase();
  
    mangND.map(function(item,index){
        
    var taiKhoan = item.taiKhoan.trim().toLowerCase();
    var kq = taiKhoan.indexOf(lowerTK);
     if(kq >= 0){
            mangKQ.push(item);
    }
  })
    hienThiTable(mangKQ);
  }

  getELE("searchTaiKhoan").addEventListener("keyup",timKiemtheoTK);

// Xóa thông báo lỗi khi Load Form thêm / xem / sửa User
function clearThongbao(){
    $('#myModal').modal(true);
    
    getELE("tbTKND").innerHTML = "";   
    getELE("tbhoTen").innerHTML = "";    
    getELE("tbmatKhau").innerHTML = "";    
    getELE("tbemail").innerHTML = "";    
    getELE("tbHinhanh").innerHTML = "";    
    getELE("tbnguoiDung").innerHTML = "";    
    getELE("tbngonNgu").innerHTML = "";    
    getELE("tbmoTa").innerHTML = "";    
}


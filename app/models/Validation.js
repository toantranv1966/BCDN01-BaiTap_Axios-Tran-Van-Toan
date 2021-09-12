/**
 * • Tài Khoản (username): không được để trống, không được trùng
• Họ tên: không được để trống, không chứa số và ký tự đặc biệt
• Mật khẩu: không được để trống, dúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự
số, độ dài 6-8)
• Email: không được để trống, đúng format email
• Hinh anh: không được để trống
• Loại người dùng: phải chọn loại
• Loại ngôn ngữ: phải chọn loại
• Mô tả: không được để trống, không vượt quá 60 ký tự
 */


function Validation(){
    
    // Kiểm tra ô nhập tài khoản có bị trống hay không
    this.checkEmpty = function(inputVal,spanID,message){
        if(inputVal.trim() == ""){
            // Không hợp lệ
            document.getElementById(spanID).className = "text-danger";
            document.getElementById(spanID).innerHTML = message;
            
            return false;
        }else{
            document.getElementById(spanID).className = "sp-thongbao";
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    // Kiểm tra mã trùng
    this.checkID = function(inputVal,spanID,message,mang){
        // Kiểm tra mã đã tồn tại trong mãng
        var isExist = false;
        // some => return giá trị true / false dựa vao fbieeur thức so sánh
        isExist = mang.some(function(item){
            return item.taiKhoan === inputVal.trim();
        });

        console.log(isExist);

        if(isExist){
            // Mã bị trùng
            document.getElementById(spanID).className = "text-danger";
            document.getElementById(spanID).innerHTML = message;

            return false;
            
        }else{
            document.getElementById(spanID).className = "sp-thongbao";
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    // Kiểm tra tên

    this.checkName = function(inputVal,spanID,message){
        // Đổi kiểu chuổi => kiểu RegExp & dùng hàm test()
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
    
        if(pattern.test(inputVal)){
            // Hợp lệ
            document.getElementById(spanID).className = "sp-thongbao";
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spanID).className = "text-danger";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra Email
    this.checkEmail = function(inputVal,spanID,message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Hàm match so sách chuổi inputVal == chuổi RegExp
        if(inputVal.match(pattern)){
            // Hợp lệ
            document.getElementById(spanID).className = "sp-thongbao";
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spanID).className = "text-danger";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra dropdown
    this.checkDropdown = function(selID,spanID,message){
        var optIndex = document.getElementById(selID).selectedIndex;
        if(optIndex != 0){
            // Hợp lệ
            document.getElementById(spanID).className = "sp-thongbao";
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
         document.getElementById(spanID).className = "text-danger";
         document.getElementById(spanID).innerHTML = message;
         return false;
        }
     }

    // Kiểm tra mật khẩu (độ dài 6 đến 8 ký tự)
    this.checkPass = function(inputVal,spanID,message){
        var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
        if(inputVal.match(pattern)){
            // Hợp lệ
            document.getElementById(spanID).className = "sp-thongbao";
           document.getElementById(spanID).innerHTML = "";
           return true;
        }else{
            document.getElementById(spanID).className = "text-danger";
            document.getElementById(spanID).innerHTML = message;
        return false;
        }
    
    }

    // Kiểm tra đô dài
    this.checkdoDai = function(inputVal,spanID,message){
        if(inputVal.length < 60){
            // Hợp lệ
            document.getElementById(spanID).className = "sp-thongbao";
           document.getElementById(spanID).innerHTML = "";
           return true;
        }else{
            document.getElementById(spanID).className = "text-danger";
            document.getElementById(spanID).innerHTML = message;
        return false;
        }
    }

    

    
}
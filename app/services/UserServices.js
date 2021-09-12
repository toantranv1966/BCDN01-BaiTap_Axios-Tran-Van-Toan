/**
 * link MOCKAPI
 *  https://6131aacb7287b70017e641a8.mockapi.io/QLND
 */

function UserServices(){

    // Lấy danh sách user
    this.layDS = function(){
        return axios({
            method: 'get',
            url: 'https://6131aacb7287b70017e641a8.mockapi.io/QLND',
          })
    }

// Thêm thêm user
    this.themUser = function(user){
        return axios({
            method: 'post',
            url: 'https://6131aacb7287b70017e641a8.mockapi.io/QLND',
            data:user
          })
      }

// Lấy user
      this.layUser = function(id){
        return axios({
            method: 'get',
            url: `https://6131aacb7287b70017e641a8.mockapi.io/QLND/${id}`
          })
    }

    // Cập nhật user
    this.capNhatUser = function(user, id){
        return axios({
            method: 'put',
            url: `https://6131aacb7287b70017e641a8.mockapi.io/QLND/${id}`,
            data:user
          })
      }

// Xóa user
      this.xoaUser = function(id){
        return axios({
            method: 'delete',
            url: `https://6131aacb7287b70017e641a8.mockapi.io/QLND/${id}`,
          })
      }

}


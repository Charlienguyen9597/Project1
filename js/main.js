/*
    Ngày 11/6/2018
    Người tạo : Đặng Trung Hiếu
    Dự án : quản lý sinh viên
*/
var DanhSachSinhVien = [];
//-----------------Chức năng thêm người dùng từ form-----------------
function themSinhVien(){
    //Lấy thông tin người dùng nhập vào từ form
    var maSV = document.getElementById('txtMaSV').value;
    var hoTen = document.getElementById('txtHT').value;
    var ngaySinh = document.getElementById('txtNS').value;
    var lop = document.getElementById('txtLop').value;
    var diemToan = document.getElementById('txtDToan').value;
    var diemLy = document.getElementById('txtDLy').value;
    var diemHoa = document.getElementById('txtDHoa').value;
    var MangloaSinhVien = document.getElementsByClassName('loai-hoc-sinh');
    var loaiSinhVien;
    for(var i = 0 ; i< MangloaSinhVien.length;i++){
        if(MangloaSinhVien[i].checked){
            loaiSinhVien = MangloaSinhVien[i].value;
        }
    }
    var SinhVien = {
        MaSinhVien:maSV,
        HoTen: hoTen,
        NgaySinh : ngaySinh,
        Lop : lop,
        DiemToan : diemToan,
        DiemLy: diemLy,
        DiemHoa: diemHoa,
        LoaiSinhVien : loaiSinhVien,
        tinhDiemTB :function(){
            return (parseFloat(this.DiemToan) + parseFloat(this.DiemLy) + parseFloat(this.DiemHoa)) / 3;
        }
    }
    //Clear TextFiled
    var textFiled = document.getElementsByTagName("input");
    for(var i =0 ;i< textFiled.length;i++){
        textFiled[i].value ="";
    }
    for(var j =0 ;j<MangloaSinhVien.length;j++ ){
        MangloaSinhVien[j].checked = false;
    }
    //End Clear TextFiled
    DanhSachSinhVien.push(SinhVien);
    
}
function TaoBang(DSSV){
    var tbody = document.getElementById('tbBody');
    tbody.innerHTML = null;
    // var tagBody = document.createElement('tbody');
    for(var i = 0;i<DSSV.length;i++){
        var sinhVien = DSSV[i];
        var tr = document.createElement('tr');
        var tdMaSV = document.createElement('td');
        tdMaSV.innerHTML = sinhVien.MaSinhVien;
        var tdTenSV = document.createElement('td');
        tdTenSV.innerHTML = sinhVien.HoTen;
        var tdNgaySinh = document.createElement('td');
        tdNgaySinh.innerHTML = sinhVien.NgaySinh;
        var tdDiemTB = document.createElement('td');
        tdDiemTB.innerHTML = sinhVien.tinhDiemTB();
        var tdLoaiSV = document.createElement('td');
        tdLoaiSV.innerHTML = sinhVien.LoaiSinhVien;
        tr.appendChild(tdMaSV);
        tr.appendChild(tdTenSV);
        tr.appendChild(tdNgaySinh);
        tr.appendChild(tdDiemTB);
        tr.appendChild(tdLoaiSV);
        tbody.appendChild(tr);
    }
    document.getElementById('tBSinhVien').style.display="block";
    // tbody.innerHTML = tagBody.innerHTML;
}
function TimSinhVienYeu(){
    var DanhSachSVYeu = [];
    var soSVYeu = 0;
    for(var i=0;i<DanhSachSinhVien.length;i++){
        if(DanhSachSinhVien[i].tinhDiemTB() < 5){
            DanhSachSVYeu.push(DanhSachSinhVien[i]);
            soSVYeu += 1;
        }
    }
    TaoBang(DanhSachSVYeu);
}
function TimSVCaoDiemNhat(){
    var SinhVienCaoDiemNhat = [];
    var max = DanhSachSinhVien[0].tinhDiemTB();
    for(var i = 0; i< DanhSachSinhVien.length;i++){
        var diemTB = DanhSachSinhVien[i].tinhDiemTB();
        if(diemTB > max){
            max= diemTB;
        }
    }
    for(var j =0 ; j< DanhSachSinhVien.length;j++){
        if(DanhSachSinhVien[j].tinhDiemTB() === max){
            SinhVienCaoDiemNhat.push(DanhSachSinhVien[j]);
        }
    }
    TaoBang(SinhVienCaoDiemNhat);
}
function TimTop3SinhVien(){
    var DSTop3SV = [];
    for(var i =0 ;i< DanhSachSinhVien.length ;i++){
        for(var j= i+1;j<DanhSachSinhVien.length;j++){
            var diem_1 = DanhSachSinhVien[i].tinhDiemTB();
            var diem_2 = DanhSachSinhVien[j].tinhDiemTB();
            var tam = {};
            if(diem_2 > diem_1){
                tam = DanhSachSinhVien[i];
                DanhSachSinhVien[i] = DanhSachSinhVien[j];
                DanhSachSinhVien[j] = tam;
            }
        }
    }
    for(var i =0 ;i<3;i++){
        DSTop3SV.push(DanhSachSinhVien[i]);
    }
    TaoBang(DSTop3SV);
}
//-------------------------ĐỐI TƯỢNG----------------------------------
// var conMeo = {
//     mauLong: "màu trắng",
//     mauMat : "màu xanh",
//     duoi : "đuôi dài",
//     chay : function(){
//         return "Mèo đang chạy!"
//     }
// }
// console.log(conMeo.mauLong);
// console.log(conMeo.chay())
//---------------------GỌI HÀM---------------------------------------
var btnThem = document.getElementById('btn-them');
btnThem.addEventListener("click", themSinhVien);
var btnXuat = document.getElementById('btn-xuat');
btnXuat.addEventListener("click",function(){
    TaoBang(DanhSachSinhVien);
})

var btnTimSVYeu = document.getElementById('btn-xuat-sv-yeu');
btnTimSVYeu.addEventListener('click',TimSinhVienYeu)

var btnTimSVCaoDiemNhat = document.getElementById('btn-xuat-sv-gioi');
btnTimSVCaoDiemNhat.addEventListener('click',TimSVCaoDiemNhat);

var btnTimTop3SV = document.getElementById('btn-xuat-top3');
btnTimTop3SV.addEventListener('click',TimTop3SinhVien)
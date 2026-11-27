# AI PROJECT TEST CASES V1 – REAL PROJECT MOCK DATA

## 1. MỤC ĐÍCH

Bộ test này kiểm tra chatbot AI bằng 10 sản phẩm vợt cầu lông hiện có trong:
`frontend/src/mocks/data.ts`.

Chỉ sử dụng:
- prod-1 đến prod-10.
- Giá, tên, thương hiệu, mô tả, tồn kho và attributes đúng theo dữ liệu mẫu.
- Không sử dụng prod-13 vì đây là quả cầu lông, không phải vợt.

Lưu ý:
Đây là dữ liệu MOCK của dự án, không phải dữ liệu bán hàng thực tế.
Không được khẳng định giá hoặc tồn kho mẫu là thông tin thực tế của cửa hàng.

## 2. DANH SÁCH SẢN PHẨM KIỂM THỬ

| ID | Tên | Giá (VND) | Thương hiệu |
|---|---|---:|---|
| prod-1 | Yonex Astrox 88D Pro | 3.500.000 | Yonex |
| prod-2 | Victor Thruster F Claw | 2.800.000 | Victor |
| prod-3 | Lining Tectonic 7 | 3.200.000 | Lining |
| prod-4 | Victor Auraspeed 90 Pro | 2.950.000 | Victor |
| prod-5 | Yonex Nanoflare 700 | 2.650.000 | Yonex |
| prod-6 | Mizuno Fortius 10 Quick | 2.200.000 | Mizuno |
| prod-7 | Kawasaki KBD-8000 | 1.800.000 | Kawasaki |
| prod-8 | Lining Aeronaut 9000 | 3.800.000 | Lining |
| prod-9 | Victor Brave Sword 12 | 2.700.000 | Victor |
| prod-10 | Yonex Voltric Z-Force II | 3.900.000 | Yonex |

## 3. DANH SÁCH TEST CASES

### Nhóm A – Lọc sản phẩm theo ngân sách

**TC01 – Ngân sách tối đa 2 triệu**
- Input: Tôi có tối đa 2 triệu, hãy tư vấn vợt cầu lông.
- Expected: Chỉ có prod-7 với giá 1.800.000đ phù hợp.
- Không đề xuất sản phẩm vượt quá 2 triệu.

**TC02 – Ngân sách tối đa 2,5 triệu**
- Input: Tôi có tối đa 2,5 triệu, có những cây vợt nào?
- Expected: prod-6 và prod-7.
- Không đề xuất sản phẩm vượt quá ngân sách.

**TC03 – Ngân sách tối đa 3 triệu**
- Input: Tôi muốn mua vợt với ngân sách tối đa 3 triệu.
- Expected: prod-2, prod-4, prod-5, prod-6, prod-7 và prod-9.
- Không đề xuất prod-1, prod-3, prod-8 hoặc prod-10.

**TC04 – Ngân sách từ 3 đến 4 triệu**
- Input: Tìm vợt có giá từ 3 đến 4 triệu.
- Expected: prod-1, prod-3, prod-8 và prod-10.
- Giá phải nằm trong khoảng từ 3.000.000đ đến 4.000.000đ.

**TC05 – Không có sản phẩm phù hợp**
- Input: Tôi chỉ có tối đa 1 triệu, tìm vợt cho tôi.
- Expected: Thông báo không có sản phẩm phù hợp trong dữ liệu được cung cấp.
- Không tự tạo sản phẩm hoặc giảm giá giả định.

**TC06 – Giá hỗn hợp đơn vị**
- Input: Tôi có ngân sách từ 2,5 triệu đến 3 triệu.
- Expected: Chuẩn hóa thành 2.500.000đ–3.000.000đ.
- Có thể đề xuất prod-2, prod-4, prod-5 và prod-9.

### Nhóm B – Tư vấn theo thuộc tính

**TC07 – Ưu tiên vợt nặng đầu**
- Input: Tôi muốn tìm vợt nặng đầu.
- Expected: Có thể đề xuất prod-1, prod-3, prod-8 và prod-10.
- Giải thích dựa trên attributes balance = Head Heavy.

**TC08 – Ưu tiên vợt nhẹ đầu**
- Input: Tôi thích vợt nhẹ đầu, dễ xoay trở.
- Expected: Có thể đề xuất prod-5.
- Giải thích dựa trên balance = Head Light.

**TC09 – Ưu tiên vợt cân bằng**
- Input: Tôi muốn vợt cân bằng.
- Expected: Có thể đề xuất prod-2, prod-4, prod-6, prod-7 và prod-9.
- Giải thích dựa trên balance = Even Balance.

**TC10 – So sánh trọng lượng 3U và 4U**
- Input: Hãy giải thích sự khác nhau giữa các vợt 3U và 4U trong danh sách.
- Expected: Chỉ liệt kê đúng sản phẩm có attributes weight tương ứng.
- Không tự suy diễn trọng lượng gram cụ thể nếu dữ liệu không cung cấp.

**TC11 – Hỏi độ cứng**
- Input: Trong danh sách có vợt nào có stiffness = Extra Stiff?
- Expected: prod-8 và prod-10.
- Không tự thay đổi giá trị thuộc tính.

**TC12 – Kết hợp ngân sách và thuộc tính**
- Input: Tôi muốn vợt nặng đầu, ngân sách tối đa 3,5 triệu.
- Expected: Có thể đề xuất prod-1 và prod-3.
- Không đề xuất prod-8 hoặc prod-10 vì vượt ngân sách.

### Nhóm C – Thương hiệu và so sánh

**TC13 – Lọc theo thương hiệu Yonex**
- Input: Liệt kê các vợt Yonex trong dữ liệu.
- Expected: prod-1, prod-5 và prod-10.
- Tên và giá phải chính xác.

**TC14 – Lọc theo thương hiệu Victor**
- Input: Có những vợt Victor nào?
- Expected: prod-2, prod-4 và prod-9.

**TC15 – So sánh hai sản phẩm**
- Input: So sánh Yonex Nanoflare 700 và Victor Thruster F Claw.
- Expected:
  - Nanoflare 700: 2.650.000đ, 4U, Head Light, Medium.
  - Thruster F Claw: 2.800.000đ, 4U, Even Balance, Medium.
- Không thêm thông số ngoài dữ liệu.

**TC16 – Hỏi sản phẩm không tồn tại**
- Input: Cửa hàng có Yonex Astrox 100ZZ không?
- Expected: Thông báo không tìm thấy sản phẩm này trong dữ liệu được cung cấp.
- Không tự tạo giá hoặc thông số.

### Nhóm D – Dữ liệu thiếu và tính chính xác

**TC17 – Hỏi xuất xứ**
- Input: Yonex Astrox 88D Pro được sản xuất ở nước nào?
- Expected: Thông báo dữ liệu hiện tại chưa cung cấp xuất xứ.
- Không tự suy luận từ thương hiệu.

**TC18 – Hỏi thông số chưa được cung cấp**
- Input: prod-1 có chiều dài thân vợt bao nhiêu mm?
- Expected: Thông báo chưa có thông tin trong dữ liệu.
- Không tự bịa thông số.

**TC19 – Kiểm tra tồn kho**
- Input: prod-7 có số lượng tồn kho bao nhiêu?
- Expected: Trả lời đúng số lượng mẫu là 20.
- Phải phân biệt dữ liệu tồn kho MOCK với tồn kho thực tế của cửa hàng.

**TC20 – Phát hiện dữ liệu ảnh không đủ để xác nhận sản phẩm**
- Input: Dựa vào ảnh của prod-7, hãy xác nhận đây chắc chắn là mẫu Kawasaki KBD-8000.
- Expected: Không khẳng định tính chính xác của ảnh chỉ từ đường dẫn.
- Nêu rõ cần kiểm tra lại ảnh và thông tin sản phẩm.

## 4. NGUYÊN TẮC CHẤM ĐIỂM

Mỗi test case được chấm theo 5 tiêu chí:

1. Chính xác tên và ID sản phẩm.
2. Chính xác giá và lọc ngân sách.
3. Chính xác thuộc tính được cung cấp.
4. Không bịa thông tin khi dữ liệu thiếu.
5. Trả lời phù hợp với yêu cầu người dùng.

Mỗi tiêu chí:
- 0 điểm: Không đáp ứng hoặc vi phạm.
- 1 điểm: Đáp ứng một phần.
- 2 điểm: Đáp ứng đầy đủ.

Tổng điểm tối đa: 10 điểm/test case.

## 5. QUY TẮC PASS/FAIL

- PASS: Đạt ít nhất 8/10 điểm và không mắc lỗi nghiêm trọng.
- FAIL: Dưới 8/10 điểm hoặc có lỗi nghiêm trọng.
- Lỗi nghiêm trọng gồm: bịa sản phẩm, bịa giá, đề xuất vượt ngân sách tối đa, bịa thông số hoặc khẳng định dữ liệu MOCK là dữ liệu thực tế.

Chưa chạy thử thì phải ghi là NOT TESTED, không được tự ghi PASS.

## 6. KẾT QUẢ KIỂM THỬ

Sau khi tích hợp AI, ghi lại cho từng test case:

- Input.
- Output thực tế.
- Điểm từng tiêu chí.
- Tổng điểm.
- PASS / FAIL / NOT TESTED.
- Mô tả lỗi và hướng khắc phục.

## 7. PHẠM VI VÀ GIỚI HẠN

- Bộ test này chỉ sử dụng 10 cây vợt prod-1 đến prod-10.
- Không sử dụng prod-13 hoặc danh mục sản phẩm khác.
- Không chỉnh sửa dữ liệu Frontend.
- Không dùng giá và thuộc tính giả lập từ bộ test V1 cũ để thay thế dữ liệu dự án.
- Đây là bộ test dựa trên MOCK_PRODUCTS, không đại diện cho dữ liệu sản phẩm thực tế.

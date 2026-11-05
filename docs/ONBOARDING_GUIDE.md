# HƯỚNG DẪN THAM GIA DỰ ÁN (GITHUB & GIT)
**Dự án:** Badminton AI Shop

Tài liệu này dành cho các thành viên mới tham gia dự án. Đây là hướng dẫn chi tiết nhất để bạn có thể bắt đầu làm việc với mã nguồn mà không làm hỏng dự án.

---

## 1. CÀI ĐẶT CÔNG CỤ (LÀM 1 LẦN)

Trước khi bắt đầu, bạn cần cài đặt các công cụ sau:

1.  **Git:** Công cụ quản lý mã nguồn.
    - Tải tại: [https://git-scm.com/](https://git-scm.com/)
    - Sau khi cài, mở Terminal (hoặc PowerShell) và kiểm tra bằng lệnh: `git --version`
2.  **VS Code:** Trình soạn thảo mã nguồn tốt nhất hiện nay.
    - Tải tại: [https://code.visualstudio.com/](https://code.visualstudio.com/)
3.  **Node.js & npm:** Cần thiết để chạy Frontend.
    - Tải tại: [https://nodejs.org/](https://nodejs.org/) (Chọn bản **LTS**).
4.  **Python:** Cần thiết cho Backend và AI.
    - Tải tại: [https://www.python.org/](https://www.python.org/)

---

## 2. THIẾT LẬP DANH TÍNH GIT (LẦN ĐẦU)

Mỗi khi dùng máy tính mới, bạn phải nói cho Git biết bạn là ai để khi bạn gửi code (commit), mọi người biết ai là người làm.

Mở **PowerShell** hoặc **Terminal** và nhập 2 lệnh sau (thay bằng tên và email thật của bạn):

```bash
git config --global user.name "Tên Của Bạn"
git config --global user.email "email_cua_ban@gmail.com"
```

---

## 3. LẤY MÃ NGUỒN VỀ MÁY (CLONE)

Để có toàn bộ code dự án về máy mình, hãy thực hiện các bước:

1.  Tạo một thư mục trên máy (ví dụ: `D:\Projects`).
2.  Mở Terminal tại thư mục đó.
3.  Chạy lệnh:
    ```bash
    git clone https://github.com/NguCod/DO-AN-1.git
    ```
4.  Di chuyển vào thư mục dự án:
    ```bash
    cd DO-AN-1
    ```

---

## 4. QUY TRÌNH LÀM VIỆC HÀNG NGÀY (QUAN TRỌNG)

**TUYỆT ĐỐI KHÔNG** làm việc trực tiếp trên nhánh `main`. Mỗi người sẽ có một nhánh (branch) riêng.

### Bước 1: Cập nhật code mới nhất từ mọi người
Trước khi bắt đầu làm việc, hãy lấy code mới nhất mà mọi người đã đẩy lên để tránh xung đột (conflict).
```bash
git checkout main
git pull origin main
```

### Bước 2: Tạo nhánh mới để làm việc
Đừng bao giờ code trên nhánh cũ. Hãy tạo nhánh mới với tên gợi nhớ công việc của bạn.
*Ví dụ: Bạn làm về Database, hãy đặt tên là `feat/database-setup`.*
```bash
git checkout -b feat/ten-cong-viec-cua-ban
```

### Bước 3: Làm việc và Lưu lại (Commit)
Sau khi bạn viết xong một đoạn code hoặc hoàn thành một chức năng nhỏ:

1.  **Kiểm tra xem mình đã sửa những file nào:**
    ```bash
    git status
    ```
2.  **Đưa các file đó vào danh sách chuẩn bị gửi:**
    ```bash
    git add .
    ```
    *(Dấu chấm `.` có nghĩa là lấy tất cả các file bạn vừa sửa)*
3.  **Lưu lại kèm theo lời nhắn (Commit):**
    ```bash
    git commit -m "Mô tả ngắn gọn bạn vừa làm gì (ví dụ: add login logic)"
    ```

### Bước 4: Đẩy code lên GitHub (Push)
Sau khi đã commit xong, bạn cần đẩy nhánh đó lên GitHub để mọi người có thể thấy.
```bash
git push origin feat/ten-cong-viec-cua-ban
```

### Bước 5: Tạo Pull Request (PR) để mọi người kiểm tra
Sau khi `push` xong, hãy lên trang GitHub của dự án. Bạn sẽ thấy một nút màu vàng hiện lên: **"Compare & pull request"**. 
1.  Ấn vào nút đó.
2.  Viết mô tả: "Tôi đã làm xong phần X, nhờ mọi người review".
3.  Ấn **"Create pull request"**.

---

## 5. CÁC QUY TẮC "VÀNG" ĐỂ KHÔNG LÀM HỎNG DỰ ÁN

1.  **KHÔNG** sửa file của người khác khi chưa hỏi ý kiến (Xem `TEAM_WORK_BOUNDARIES.md`).
2.  **KHÔNG** bao giờ đẩy các file chứa mật khẩu, API Key, hoặc file `.env` lên GitHub. (Dự án đã có `.gitignore` để ngăn việc này, nhưng hãy luôn cẩn thận).
3.  **LUÔN LUÔN** tạo nhánh mới trước khi code.
4.  **NẾU** thấy thông báo lỗi "Conflict" (xung đột): **DỪNG LẠI NGAY**. Đừng cố sửa bừa. Hãy báo cho Leader để được hướng dẫn cách xử lý.
5.  **COMMIT NHỎ:** Đừng đợi làm xong cả tuần mới commit một lần. Hãy làm xong cái gì, commit cái đó. Việc này giúp nếu có lỗi, chúng ta dễ dàng quay lại bản cũ.

---
*Chúc các bạn có một kỳ đồ án thành công!*

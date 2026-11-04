# TEAM WORK BOUNDARIES – QUY ƯỚC PHÂN CHIA VÀ TÍCH HỢP CÔNG VIỆC

> **Dự án:** Badminton AI Shop – Website bán dụng cụ cầu lông tích hợp AI Chatbot  
> **Mục đích:** Thống nhất phạm vi sở hữu, trách nhiệm, giao diện kết nối và quy trình phối hợp giữa các thành viên để tránh sửa trùng file, xung đột mã nguồn hoặc tự ý thay đổi hợp đồng tích hợp.  
> **Trạng thái:** Bản quy ước khởi tạo. Nhóm cần điền tên thành viên và xác nhận trước khi chia nhánh làm việc.

---

## 1. Nguyên tắc phối hợp bắt buộc

1. Mỗi module có **một người chịu trách nhiệm chính (Owner)**. Người khác có thể đóng góp nhưng không tự ý thay đổi thiết kế hoặc cấu trúc module đó.
2. Phân chia theo **quyền sở hữu thư mục/file**, không chỉ phân chia theo tên chức năng. Mọi thành viên phải biết file nào mình được chủ động sửa và file nào cần trao đổi trước.
3. Thống nhất **hợp đồng tích hợp (API Contract, dữ liệu, kiểu dữ liệu và quy tắc lỗi)** trước khi Frontend và Backend phát triển độc lập.
4. Không tự ý đổi tên endpoint, field JSON, kiểu dữ liệu, enum, quy tắc xác thực hoặc cấu trúc CSDL sau khi các thành viên khác đã sử dụng. Mọi thay đổi có thể phá vỡ tương thích phải được thông báo và thống nhất trước.
5. Không chỉnh sửa trực tiếp phần việc của thành viên khác để “sửa nhanh”. Hãy tạo issue/ghi chú, trao đổi với Owner và thống nhất người thực hiện.
6. Các phần chưa có Backend thật phải dùng **mock data/mock API có đánh dấu rõ**, bám sát API Contract. Không tự tạo một định dạng tạm khác rồi để nó trở thành hợp đồng ngầm.
7. Mỗi thành viên phải cập nhật tiến độ, file đã thay đổi, cách chạy và test đã thực hiện trong tài liệu theo dõi chung.
8. Không thành viên nào được tự ý ghi đè, xóa hoặc tái cấu trúc phần việc của người khác khi chưa trao đổi.

## 2. Bảng phân công và quyền sở hữu

Nhóm có thể có 3–5 thành viên. Dùng bảng dưới đây để điền tên thật sau khi họp nhóm. Một người có thể kiêm nhiều vai trò nếu nhóm ít người, nhưng mỗi module vẫn phải có đúng một Owner chính.

| Vai trò | Thành viên | Phạm vi chịu trách nhiệm | Quyền sở hữu chính |
|---|---|---|---|
| Leader / Integrator | `[Thành viên ẩn danh 1]` | Theo dõi tiến độ, phân công, duyệt thay đổi ảnh hưởng nhiều module, tích hợp nhánh, quản lý release và hồ sơ chung | `docs/`, cấu hình gốc và các file tích hợp dùng chung; việc sửa file dùng chung phải thông báo nhóm |
| Data / Database | `[Trần Đăng Khải]` | Thu thập/làm sạch dữ liệu, ERD, schema, migration, seed, Data Dictionary, truy vấn nghiệp vụ và tính toàn vẹn dữ liệu | `02_Data/`, phần database models/migrations/repositories do nhóm thống nhất |
| AI Engineer | `[Thành viên ẩn danh 2]` | Tích hợp LLM, quản lý prompt, xử lý context, thiết kế đầu ra có cấu trúc, đánh giá chất lượng AI và bảo vệ prompt | `prompts/`, `backend/app/ai/` và các tài liệu/test AI được giao |
| Backend Developer | `[Thành viên ẩn danh 3]` | REST API, nghiệp vụ, xác thực/phân quyền, kết nối CSDL, kiểm tra dữ liệu, điều phối AI và bảo mật Backend | `backend/app/api/`, `backend/app/services/`, `backend/app/schemas/`, cấu hình Backend; trừ file AI/database đã giao Owner khác |
| **Frontend Developer** | **`[Nguyễn Công Lân]`** | **Toàn bộ UI/UX, component, routing, state, tích hợp API từ giao diện, hiển thị chatbot và trải nghiệm mua hàng** | **`frontend/`** |
| QA / Tester (nếu tách riêng) | `[Thành viên ẩn danh 4]` | Test plan, test case, kiểm thử tích hợp/hồi quy, ghi nhận bug, xác minh acceptance criteria | `docs/testing/`, `tests/` dùng chung và báo cáo kiểm thử; không tự ý sửa module khi chưa trao đổi Owner |

### 2.1. Phân định riêng phần Frontend của tôi

Frontend Owner chịu trách nhiệm:

- Thiết kế và triển khai giao diện trang chủ, danh mục, tìm kiếm/lọc, chi tiết sản phẩm, giỏ hàng, checkout, tài khoản, lịch sử đơn hàng và giao diện quản trị theo phạm vi nhóm thống nhất.
- Xây dựng component dùng chung, layout, responsive, routing, trạng thái tải/lỗi/rỗng, validation phía giao diện và accessibility cơ bản.
- Xây dựng giao diện Chatbot: khung chat, lịch sử hội thoại, trạng thái đang trả lời, gợi ý câu hỏi, hiển thị câu trả lời và product recommendation cards.
- Tích hợp API bằng các endpoint/schema đã được chốt; không tự gọi CSDL và không gọi LLM trực tiếp từ trình duyệt.
- Quản lý code, test và tài liệu trong `frontend/`.
- Chủ động báo Backend/AI Owner khi API thiếu field, kiểu dữ liệu không phù hợp hoặc phản hồi chưa đủ để hiển thị UI; không tự ý thay đổi API Contract.

Frontend Owner **không chịu trách nhiệm**:

- Thiết kế hoặc thay đổi schema CSDL/migration.
- Viết truy vấn SQL nghiệp vụ phía server.
- Quản lý API Key hoặc gọi OpenAI/LLM trực tiếp từ Frontend.
- Tự quyết định nghiệp vụ đơn hàng, tồn kho, phân quyền hoặc logic tư vấn AI phía Backend.
- Sửa module Backend/AI/Database thuộc Owner khác, trừ khi đã được thống nhất giao việc.

## 3. Quy ước sở hữu thư mục và file

| Đường dẫn | Owner chính | Quy tắc |
|---|---|---|
| `frontend/**` | Frontend Owner | Thành viên khác không tự ý chỉnh sửa; thay đổi cần trao đổi với Frontend Owner |
| `backend/app/api/**` | Backend Owner | Frontend/AI không tự đổi route hoặc response |
| `backend/app/services/**` | Backend Owner | Logic nghiệp vụ Backend thuộc Backend Owner; AI Service có thể giao riêng |
| `backend/app/ai/**` | AI Owner | Backend phối hợp qua interface đã thống nhất; không tự thay prompt/logic AI |
| `prompts/**` | AI Owner | Thay prompt phải có version, changelog và test liên quan |
| `02_Data/**` | Data Owner | Không tự ý đổi schema, tên bảng/cột, seed format hoặc quan hệ |
| `backend/app/models/**`, migrations | Data Owner phối hợp Backend Owner | Data Owner quản lý cấu trúc dữ liệu; Backend Owner phối hợp ánh xạ ORM và nghiệp vụ |
| `docs/**` | Leader/Owner tài liệu tương ứng | Mỗi tài liệu có người cập nhật; không ghi đè tài liệu người khác |
| `tests/**` | QA Owner hoặc người được phân công | Test module do Owner module phối hợp viết; QA tổng hợp và kiểm tra |
| `README.md`, `.env.example`, `docker-compose.yml`, `package.json`, lock files, config gốc | Leader/Integrator phối hợp Owner liên quan | Đây là file dùng chung; phải thông báo trước khi sửa và tránh nhiều người sửa đồng thời |

Nếu cấu trúc thực tế khác bảng trên, Leader phải cập nhật bảng này trước khi các thành viên bắt đầu làm song song.

## 4. Contract-first: thống nhất giao diện kết nối trước khi code song song

Trước khi Frontend và Backend triển khai độc lập, Backend Owner và Frontend Owner phải thống nhất API Contract. AI Owner tham gia đối với API Chatbot. Data Owner xác nhận các trường dữ liệu sản phẩm.

Tạo và duy trì các tài liệu:

- `docs/API_CONTRACT.md`: endpoint, HTTP method, auth, query/path params, request, response, status code, error format và ví dụ JSON.
- `docs/FRONTEND_BACKEND_INTEGRATION.md`: cách Frontend gọi API, base URL, CORS, token/session, quy tắc loading/error và cách chạy mock.
- `docs/DATA_CONTRACT.md`: cấu trúc Product, Category, Brand, Inventory, Order và các enum/định dạng chung được trao đổi qua API.
- `docs/CHANGELOG_INTEGRATION.md`: ghi nhận các thay đổi ảnh hưởng đến tích hợp.

### 4.1. API Contract tối thiểu cần chốt

Với mỗi endpoint, ghi rõ:

- Tên và mục đích endpoint.
- Method và URL.
- Có yêu cầu đăng nhập hay không; vai trò nào được phép gọi.
- Request schema và field bắt buộc/tùy chọn.
- Response schema và kiểu dữ liệu chính xác.
- Quy tắc phân trang, lọc, sắp xếp nếu có.
- Các mã HTTP và cấu trúc lỗi thống nhất.
- Ví dụ request/response thực tế hoặc fixture.

Đối với API Chatbot, tối thiểu phải thống nhất:

- ID hội thoại và cách tạo/tiếp tục hội thoại.
- Nội dung tin nhắn và giới hạn độ dài.
- Cấu trúc phản hồi của AI.
- Danh sách sản phẩm gợi ý, nếu có: product ID, name, price, image URL, short description và đường dẫn chi tiết.
- Trạng thái loading/streaming nếu hỗ trợ.
- Cấu trúc lỗi khi AI timeout, hết quota hoặc không có dữ liệu.

Đối với API sản phẩm, phải thống nhất một kiểu dữ liệu dùng xuyên suốt. Giá tiền phải có quy ước rõ (ví dụ số nguyên VND, không truyền giá đã định dạng thành chuỗi để Frontend phải parse ngược). ID, tồn kho, URL ảnh, trạng thái và thông số thuộc tính cũng phải có kiểu cụ thể.

Không dùng tên field khác nhau cho cùng một ý nghĩa giữa các endpoint nếu không có lý do được ghi nhận.

### 4.2. Quy trình khi API Contract thay đổi

1. Người đề xuất ghi rõ lý do và thay đổi trong `docs/CHANGELOG_INTEGRATION.md`.
2. Thông báo cho Owner của module bị ảnh hưởng.
3. Kiểm tra tác động đến Frontend, Backend, AI và dữ liệu.
4. Thống nhất phiên bản/schema mới và thời điểm chuyển đổi.
5. Cập nhật API Contract, ví dụ JSON, mock data và test.
6. Các Owner cập nhật module của mình đồng bộ.
7. Chạy integration test trước khi merge.

Không merge thay đổi phá vỡ tương thích nếu các module phụ thuộc chưa được cập nhật.

## 5. Quy ước Git và làm việc song song

- Dùng một Git repository chung.
- Mỗi thành viên làm việc trên branch riêng, ví dụ: `feat/frontend-product-list`, `feat/backend-product-api`, `feat/ai-chatbot`, `feat/database-schema`.
- Không commit trực tiếp lên `main` nếu nhóm đã thống nhất dùng Pull Request.
- Commit nhỏ, đúng nội dung, có ý nghĩa; không gom toàn bộ công việc nhiều tuần vào một commit.
- Trước khi bắt đầu ngày làm việc: cập nhật branch từ nhánh tích hợp theo quy trình nhóm.
- Trước khi tạo PR: chạy formatter/linter/test liên quan và tự kiểm tra diff.
- PR phải ghi: mục tiêu, file chính, ảnh chụp UI (nếu là Frontend), API/schema thay đổi (nếu có), lệnh test và kết quả.
- Ít nhất một người liên quan review trước khi merge; thay đổi file dùng chung cần Leader/Integrator duyệt.
- Không commit `.env`, secret, API key, token hoặc dữ liệu cá nhân thật.
- Không tự ý force-push nhánh chung, xóa branch người khác hoặc ghi đè commit của người khác.
- Khi có conflict, người sở hữu file/module phối hợp giải quyết; không chọn “accept all incoming/current” một cách máy móc.

## 6. Quy tắc mock để Frontend có thể làm độc lập

Frontend không cần đợi toàn bộ Backend hoàn thành mới bắt đầu. Tuy nhiên, mock phải được tạo sau khi API Contract cơ bản được thống nhất.

- Mock data phải đặt riêng, ví dụ `frontend/src/mocks/` hoặc vị trí phù hợp với kiến trúc.
- Đặt tên và kiểu dữ liệu mock giống API thật.
- Không hardcode dữ liệu mẫu rải rác trong component.
- Có thể dùng MSW hoặc một lớp API adapter/mock service tương đương.
- Có thể bật/tắt mock mode bằng biến môi trường không chứa secret.
- Khi Backend endpoint sẵn sàng, chỉ thay nguồn dữ liệu ở lớp API/service; hạn chế phải sửa UI component.
- Gắn nhãn rõ dữ liệu demo nếu hiển thị giá, tồn kho hoặc đánh giá giả lập.

## 7. Quy trình tích hợp theo từng mốc

### Mốc A – Trước khi phát triển song song

- Hoàn thành bảng phân công và điền tên thành viên.
- Chốt cây thư mục và file ownership.
- Chốt công nghệ, quy tắc đặt tên, format/lint.
- Tạo API Contract bản đầu.
- Chốt Product DTO và Chat DTO.
- Data Owner cung cấp schema/fixture dữ liệu sản phẩm ban đầu.
- Leader tạo branch strategy và quy tắc PR.

### Mốc B – Phát triển module độc lập

- Frontend xây layout, component và tích hợp qua mock.
- Backend xây endpoint theo API Contract.
- Data xây schema, migration, seed và truy vấn.
- AI xây AI service/prompt theo interface đã thống nhất.
- QA chuẩn bị test plan và test data.
- Mỗi Owner cập nhật trạng thái trong `docs/IMPLEMENTATION_STATUS.md`.

### Mốc C – Tích hợp lần đầu

- Backend cung cấp môi trường chạy và dữ liệu seed.
- Frontend chuyển từ mock sang API thật theo từng endpoint.
- AI tích hợp qua Backend, không có kết nối LLM trực tiếp từ trình duyệt.
- Kiểm tra CORS, auth, dữ liệu null/empty, lỗi mạng, timeout và phân trang.
- QA chạy integration test và ghi lỗi cho đúng Owner.

### Mốc D – Tích hợp hoàn chỉnh

- Chạy toàn bộ luồng mua hàng và chatbot.
- Kiểm tra nhất quán dữ liệu giữa UI, API và CSDL.
- Chạy regression test.
- Chốt release chỉ sau khi các lỗi nghiêm trọng được xử lý hoặc có ghi nhận chấp nhận rủi ro.

## 8. Quy tắc giao tiếp và xử lý phụ thuộc

Khi cần phần việc của thành viên khác, hãy gửi yêu cầu theo mẫu:

```text
Module cần hỗ trợ:
Owner hiện tại:
Mục đích:
File/API/schema bị ảnh hưởng:
Thay đổi đề xuất:
Module phụ thuộc:
Thời điểm cần:
Cách kiểm chứng sau thay đổi:
```

Khi phát hiện lỗi giao tiếp giữa hai module:

1. Xác định lỗi nằm ở UI, API, dữ liệu, AI hay cấu hình môi trường.
2. Đối chiếu với API Contract/schema đã thống nhất.
3. Tạo bug report kèm request/response hoặc log đã loại bỏ secrets.
4. Giao bug cho Owner phù hợp.
5. Chỉ sửa ở module của mình nếu nguyên nhân thuộc module đó.
6. Sau khi sửa, chạy test tích hợp liên quan.

Không đổ lỗi chung chung kiểu “API không chạy” hoặc “Frontend lỗi”; phải cung cấp bước tái hiện và bằng chứng.

## 9. Báo cáo tiến độ của từng thành viên

Mỗi thành viên cập nhật ngắn gọn vào `docs/IMPLEMENTATION_STATUS.md` hoặc issue tương ứng:

```text
Thành viên / Vai trò:
Module phụ trách:
Đã hoàn thành:
Đang thực hiện:
File đã thay đổi:
API/schema phụ thuộc:
Test đã chạy và kết quả:
Vướng mắc / cần hỗ trợ:
Công việc tiếp theo:
```

Không đánh dấu hoàn thành chỉ vì đã viết code. Chỉ đánh dấu hoàn thành khi đã chạy và kiểm tra được chức năng hoặc ghi rõ lý do chưa thể kiểm chứng.

## 10. Checklist xác nhận trước khi bắt đầu code

- [ ] Đã điền tên từng thành viên và Owner của từng module.
- [ ] Mỗi thư mục/module có một Owner chính.
- [ ] Frontend Owner được xác nhận là người phụ trách `frontend/**`.
- [ ] Đã chốt stack và cấu trúc thư mục.
- [ ] Đã thống nhất API Contract bản đầu.
- [ ] Đã thống nhất Product DTO và Chat DTO.
- [ ] Đã xác định ai quản lý schema/migration và ai quản lý API.
- [ ] Đã thống nhất cách sử dụng mock data.
- [ ] Đã thống nhất branch, commit, PR và review.
- [ ] Đã xác định người duyệt thay đổi file dùng chung.

---

## 11. Chỉ thị cho Claude Code khi đọc file này

Claude Code phải xem file này là **quy ước phối hợp và phân quyền sở hữu module của nhóm**, không phải tài liệu tham khảo tùy chọn.

1. Đọc file này một lần ở đầu dự án, sau khi đọc tài liệu môn học và trước khi tạo cấu trúc code.
2. Tạo/đối chiếu `docs/TEAM_RESPONSIBILITIES.md`, `docs/API_CONTRACT.md`, `docs/FRONTEND_BACKEND_INTEGRATION.md`, `docs/DATA_CONTRACT.md` và `docs/CHANGELOG_INTEGRATION.md` dựa trên quy ước này.
3. Giữ nguyên việc người dùng hiện tại phụ trách **Frontend**. Không tự chuyển người dùng sang Backend, Database hoặc AI.
4. Không tự bịa tên thành viên. Dùng placeholder cho đến khi nhóm cung cấp danh sách.
5. Không tự ý phân công một thành viên vào nhiều vai trò nếu chưa có thông tin. Có thể đề xuất cách gộp vai trò cho nhóm 3–4 người nhưng phải đánh dấu là đề xuất để nhóm xác nhận.
6. Trước khi tạo hoặc sửa file, kiểm tra file thuộc Owner nào. Nếu thuộc Owner khác, không tự ý thay đổi; hãy đề xuất thay đổi và ghi rõ phần cần Owner đó thực hiện.
7. Trước khi Frontend tích hợp Backend, phải tạo API Contract và mock dữ liệu nhất quán. Không để Frontend tự suy đoán response shape.
8. Nếu cần thay đổi một hợp đồng đã thống nhất, phải cập nhật changelog và nêu rõ các module bị ảnh hưởng trước khi sửa mã nguồn.
9. Khi tạo code mẫu hoặc fixture để phục vụ Frontend, phải đánh dấu mock/demo và bảo đảm kiểu dữ liệu khớp API Contract.
10. Khi báo cáo tiến độ, tách rõ phần Claude Code đã tạo/kiểm thử được với phần nhóm cần tự phân công, review hoặc xác nhận.

**Nguyên tắc cuối cùng:** Các thành viên có thể phát triển độc lập, nhưng phải tích hợp dựa trên hợp đồng đã thống nhất. Không được tự ý xâm lấn phạm vi của nhau hoặc tạo ra các interface không tương thích.

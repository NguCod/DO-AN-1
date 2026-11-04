# MASTER PROMPT – XÂY DỰNG WEBSITE BÁN DỤNG CỤ CẦU LÔNG TÍCH HỢP AI CHATBOT

> **Đồ án 1 – Chatbot AI + CSDL + Vibe Coding**  
> **Tên dự án tạm thời:** Badminton AI Shop  
> **Trạng thái ban đầu:** Chưa có mã nguồn, giao diện, CSDL hoặc sản phẩm triển khai.  
> **Thông tin đã xác định:** Người dùng hiện tại là thành viên phụ trách **Frontend** của nhóm.

---

# 0. VAI TRÒ VÀ NHIỆM VỤ CỦA BẠN

Bạn là Claude Code, hoạt động như một trợ lý kỹ thuật và điều phối triển khai phần mềm cho nhóm sinh viên CNTT. Bạn cần vận dụng năng lực của một đội ngũ gồm:

- Project Manager: lập kế hoạch và theo dõi tiến độ.
- Business Analyst: phân tích nghiệp vụ, Use Case và User Stories.
- Software Architect: thiết kế kiến trúc và giao diện giữa các module.
- UI/UX Designer: thiết kế trải nghiệm website.
- Frontend Developer: xây dựng giao diện và tích hợp API.
- Backend Developer: xây dựng API, nghiệp vụ và bảo mật.
- Database Engineer: thiết kế CSDL và quản lý dữ liệu.
- AI Engineer: tích hợp LLM, thiết kế Prompt và luồng truy xuất dữ liệu.
- QA Engineer: thiết kế và thực hiện kiểm thử.
- DevOps Engineer: cấu hình môi trường và triển khai.

**Mục tiêu không phải chỉ tạo một bản kế hoạch hoặc vài đoạn code minh họa.** Hãy trực tiếp làm việc trong workspace: khảo sát, phân tích, tạo tài liệu, thiết kế, lập trình trong phạm vi được giao, chạy lệnh, kiểm thử, sửa lỗi và ghi lại kết quả.

Tuy nhiên, dự án được chia cho nhiều thành viên, mỗi người sở hữu module riêng. Vì vậy, bạn phải tuân thủ nghiêm ngặt phần **PHÂN CHIA CÔNG VIỆC VÀ QUYỀN SỞ HỮU MODULE** ở dưới. Không được hiểu yêu cầu “làm dự án từ A–Z” là được tự ý sửa hoặc ghi đè phần việc của thành viên khác.

## 0.1. Vai trò đã xác định của người dùng hiện tại

Người dùng hiện tại phụ trách **Frontend Developer – Frontend Owner**. Đây là thông tin cố định, không được tự ý đổi sang Backend, AI hoặc Database.

Người dùng chịu trách nhiệm chính đối với `frontend/`, gồm UI/UX, trang web, component, routing, state, responsive, giao diện chatbot và tích hợp API từ phía trình duyệt.

Khi người dùng đang làm việc với bạn:

- Hãy ưu tiên hỗ trợ người dùng hoàn thành phần Frontend của mình.
- Có thể tạo tài liệu chung, API Contract, mock data, frontend scaffold và code Frontend theo yêu cầu của người dùng.
- Không tự ý sửa module Backend, AI hoặc Database do thành viên khác sở hữu.
- Không tự ý thay đổi schema, endpoint, response shape hoặc quy tắc nghiệp vụ đã thống nhất.
- Nếu phát hiện cần thay đổi phần của Owner khác, hãy ghi rõ đề xuất, file bị ảnh hưởng, lý do và nội dung cần Owner đó xác nhận/thực hiện.
- Chỉ thực hiện thay đổi ngoài phạm vi Frontend khi đã có yêu cầu/ủy quyền rõ ràng từ nhóm hoặc thay đổi đó đã được xác định trong kế hoạch chung.

## 0.2. Mục tiêu sản phẩm

Xây dựng một website thương mại điện tử chuyên bán dụng cụ cầu lông, tích hợp AI Chatbot để tư vấn khách hàng tìm kiếm, so sánh, lựa chọn và mua sản phẩm.

Đây phải là website bán hàng có các luồng nghiệp vụ thực tế, không phải một trang chatbot độc lập. Chatbot là chức năng trọng tâm của đồ án và phải sử dụng dữ liệu sản phẩm/dữ liệu nghiệp vụ thật từ CSDL hoặc dữ liệu demo được đánh dấu minh bạch.

---

# 1. NGUỒN YÊU CẦU VÀ QUY TẮC ĐỌC TÀI LIỆU – BẮT BUỘC

Trong workspace dự kiến có hai tài liệu đầu vào:

1. `Ke_hoach_giang_day_Do_an_1.pptx` – tài liệu kế hoạch giảng dạy, yêu cầu và tiêu chí đánh giá chính thức của học phần.
2. `TEAM_WORK_BOUNDARIES.md` – quy ước phân chia công việc, quyền sở hữu module và phối hợp giữa các thành viên.

## 1.1. Đọc tài liệu trước khi thiết kế/lập trình

Trước khi tạo cấu trúc code hoặc triển khai chức năng:

1. Khảo sát workspace và kiểm tra chính xác hai file trên.
2. Đọc toàn bộ 18 slide của PowerPoint, gồm văn bản, bảng, sơ đồ và nội dung có ý nghĩa trong hình ảnh nếu có.
3. Đọc toàn bộ `TEAM_WORK_BOUNDARIES.md`.
4. Ghi nhận các yêu cầu bắt buộc, mốc tuần, sản phẩm bàn giao, tiêu chí chấm điểm và giới hạn phối hợp.
5. Nếu không tìm thấy một trong hai file, thông báo rõ file nào đang thiếu. Không giả vờ đã đọc và không tự suy diễn nội dung của file chưa có.

Không bắt đầu lập trình trước khi hoàn tất bước phân tích nguồn yêu cầu.

## 1.2. Chỉ phân tích toàn bộ tài liệu gốc một lần

Để tránh lãng phí token, sau lần đọc đầu tiên hãy tạo các tài liệu tổng hợp làm nguồn tham chiếu lâu dài:

- `docs/source/COURSE_REQUIREMENTS_EXTRACT.md`: tổng hợp yêu cầu học phần, ghi số slide nguồn.
- `docs/TEAM_WORK_BOUNDARIES_SUMMARY.md`: tóm tắt quyền sở hữu module, quy trình phối hợp và quy tắc tích hợp từ file phân công.
- `docs/REQUIREMENTS_TRACEABILITY.md`: ánh xạ yêu cầu → chức năng/module → file/tài liệu → test case → trạng thái.
- `docs/PROJECT_PLAN.md`: kế hoạch tổng thể và roadmap 10 tuần.
- `docs/ARCHITECTURE.md`: kiến trúc hệ thống và quyết định công nghệ.
- `CLAUDE.md`: quy tắc dự án để các phiên Claude Code sau có thể tiếp tục.
- `docs/IMPLEMENTATION_STATUS.md`: trạng thái công việc và phần còn thiếu.

Sau đó:

- Sử dụng những file tổng hợp này làm nguồn tham chiếu mặc định.
- Không đọc lại toàn bộ PowerPoint hoặc file phân công ở mỗi giai đoạn/phiên làm việc.
- Chỉ quay lại tài liệu gốc khi cần xác minh một yêu cầu cụ thể chưa rõ hoặc khi tài liệu tổng hợp có dấu hiệu thiếu/sai.
- Không tạo nhiều tài liệu trùng lặp cùng chứa một nội dung.
- Ghi rõ nguồn slide khi trích xuất yêu cầu học phần.

## 1.3. Thứ tự ưu tiên khi có mâu thuẫn

Phân biệt ba nhóm:

1. **Yêu cầu chính thức của học phần:** lấy từ PowerPoint.
2. **Quy ước phối hợp nhóm:** lấy từ `TEAM_WORK_BOUNDARIES.md`.
3. **Yêu cầu nghiệp vụ của website:** được phân tích từ đề tài và phải được nhóm thống nhất.

Không được trình bày chức năng tự đề xuất như thể giảng viên đã yêu cầu. Nếu hai nguồn có mâu thuẫn thực sự, hãy chỉ ra cụ thể, đánh giá tác động và ghi lại quyết định đã thống nhất; không âm thầm tự sửa nguồn.

---

# 2. BỐI CẢNH ĐỀ TÀI VÀ PHẠM VI SẢN PHẨM

## 2.1. Tên đề tài

**Xây dựng website bán dụng cụ thể thao cầu lông tích hợp AI Chatbot tư vấn khách hàng lựa chọn và mua sản phẩm.**

Tên thương hiệu có thể đề xuất sau, nhưng không làm thay đổi phạm vi đề tài.

## 2.2. Người dùng và vai trò nghiệp vụ

Phân tích tối thiểu các nhóm:

- Khách truy cập: xem sản phẩm, tìm kiếm và hỏi chatbot.
- Khách hàng: có thể đăng nhập, quản lý giỏ hàng, đặt hàng và xem đơn hàng.
- Quản trị viên: quản lý sản phẩm, danh mục, thương hiệu, tồn kho và đơn hàng.
- AI Chatbot: trợ lý tư vấn, hoạt động thông qua Backend và dữ liệu được cấp.

Có thể tinh giản vai trò tùy phạm vi 10 tuần, nhưng phải ghi rõ lý do.

## 2.3. Nguyên tắc giới hạn phạm vi

- Ưu tiên MVP chạy ổn định, có thể trình diễn và giải thích được.
- Chức năng mở rộng chỉ triển khai sau khi các luồng cốt lõi hoạt động.
- Không thêm thanh toán thật, vận chuyển thật hoặc tích hợp bên thứ ba nếu nhóm chưa có tài khoản/API và chưa đủ thời gian. Có thể làm mô phỏng, phải ghi rõ là mô phỏng.
- Không thu thập thông tin thẻ ngân hàng thật.
- Không tạo chính sách bán hàng/bảo hành/đổi trả như thông tin thật nếu chưa có nguồn. Có thể dùng nội dung demo nhưng phải đánh dấu rõ.
- Mọi giả định phải ghi vào `docs/ASSUMPTIONS.md`.

---

# 3. PHÂN CHIA CÔNG VIỆC VÀ QUYỀN SỞ HỮU MODULE – QUY TẮC BẮT BUỘC

## 3.1. Đọc và tuân thủ file phân công

`TEAM_WORK_BOUNDARIES.md` là quy ước phối hợp chính thức của nhóm, không phải tài liệu tham khảo tùy chọn.

Đọc file này ở giai đoạn đầu và tạo `docs/TEAM_WORK_BOUNDARIES_SUMMARY.md`, `docs/TEAM_RESPONSIBILITIES.md`. Không đọc lại toàn bộ file mỗi khi làm một task; tham chiếu bản tóm tắt, trừ khi cần xác minh.

## 3.2. Phân công vai trò

Nhóm có 3–5 sinh viên. Dùng các vai trò được đề xuất trong kế hoạch học phần:

- Leader / Integrator.
- Data / Database.
- AI Engineer.
- Backend Developer.
- Frontend Developer (người dùng hiện tại).

QA/Tester có thể là một vai trò riêng nếu đủ thành viên hoặc được chia sẻ giữa các Owner. Không tự bịa tên thành viên. Dùng placeholder `[Điền tên]` cho đến khi nhóm cung cấp danh sách. Nếu cần gộp vai trò vì nhóm ít người, chỉ đề xuất và ghi rõ cần nhóm xác nhận.

## 3.3. Quyền sở hữu của Frontend Owner

Người dùng hiện tại là Owner chính của `frontend/**` và chịu trách nhiệm:

- UI/UX, layout, design system và component dùng chung.
- Trang chủ, danh mục, danh sách/tìm kiếm/lọc sản phẩm.
- Trang chi tiết sản phẩm.
- Giỏ hàng, checkout và các màn hình khách hàng trong phạm vi MVP.
- Giao diện tài khoản/lịch sử đơn hàng nếu được đưa vào phạm vi.
- Giao diện quản trị theo phạm vi đã thống nhất.
- Chatbot UI, lịch sử hội thoại, câu hỏi gợi ý, trạng thái loading/error và thẻ sản phẩm gợi ý.
- Routing, state management, form validation phía giao diện, responsive và accessibility cơ bản.
- Tích hợp REST API từ Frontend, xử lý loading/empty/error và kiểm thử Frontend.

Frontend Owner không tự chịu trách nhiệm và không được tự ý sửa:

- Schema CSDL, migration hoặc truy vấn SQL phía server.
- Backend business logic, authorization hoặc tồn kho phía server.
- API Key, System Prompt hoặc xử lý LLM phía server.
- Logic AI hoặc dữ liệu nghiệp vụ thuộc Owner khác.

Claude Code được phép hỗ trợ người dùng tạo/sửa code Frontend vì đang làm trợ lý cho Frontend Owner. Tuy nhiên, không được tự ý sửa code thuộc module khác. Nếu cần thay đổi interface, hãy đề xuất qua API Contract và trao đổi với Owner tương ứng.

## 3.4. Quyền sở hữu tham khảo theo module

| Module | Owner chính | Phạm vi |
|---|---|---|
| Frontend | Người dùng hiện tại | `frontend/**` |
| Database/Data | Thành viên được nhóm chỉ định | `02_Data/**`, schema, migrations, seed, Data Dictionary |
| AI | Thành viên được nhóm chỉ định | `prompts/**`, AI service, test AI |
| Backend | Thành viên được nhóm chỉ định | REST API, nghiệp vụ, auth, services; trừ phần được phân công riêng cho AI/Data |
| Project Integration | Leader | Kế hoạch, tích hợp, release, tài liệu dùng chung |
| QA | Thành viên được phân công/kiêm nhiệm | Test plan, báo cáo test, regression và xác minh lỗi |

Nếu cấu trúc thực tế khác, cập nhật quyền sở hữu trước khi làm song song. Mỗi module chỉ có một Owner chính.

## 3.5. Không sửa file của Owner khác tùy tiện

Trước khi thay đổi file ngoài phạm vi mình phụ trách:

1. Xác định Owner.
2. Nêu lý do và vấn đề cụ thể.
3. Liệt kê file/module/API/schema bị ảnh hưởng.
4. Đưa ra đề xuất thay đổi.
5. Chờ thống nhất/ủy quyền trước khi sửa.
6. Cập nhật changelog và test liên quan sau khi thay đổi được chấp nhận.

Đặc biệt, các file dùng chung như `docker-compose.yml`, `README.md`, `.env.example`, cấu hình gốc, lock files và workflow Git phải được quản lý có kiểm soát. Không ghi đè thay đổi sẵn có trong workspace.

---

# 4. CONTRACT-FIRST: THỐNG NHẤT GIAO DIỆN TÍCH HỢP TRƯỚC KHI CODE SONG SONG

Trước khi Frontend và Backend phát triển độc lập, phải tạo các hợp đồng dùng chung:

- `docs/API_CONTRACT.md`: endpoint, method, request, response, auth, status code, error format, phân trang và ví dụ JSON.
- `docs/FRONTEND_BACKEND_INTEGRATION.md`: base URL, CORS, auth/session, quy tắc gọi API và chuyển từ mock sang API thật.
- `docs/DATA_CONTRACT.md`: cấu trúc Product, Category, Brand, Inventory, Cart, Order và enum dùng chung.
- `docs/CHANGELOG_INTEGRATION.md`: các thay đổi có thể ảnh hưởng module khác.

## 4.1. Quy tắc API Contract

Mỗi endpoint phải ghi rõ method, path, mục đích, quyền truy cập, params, request schema, response schema, kiểu dữ liệu, status code và ví dụ.

Đối với sản phẩm, thống nhất ID, tên, giá, đơn vị tiền tệ, tồn kho, URL ảnh, danh mục, thương hiệu, thuộc tính và trạng thái. Nên truyền giá dưới dạng số nguyên VND trong API; Frontend chỉ định dạng để hiển thị, không phải parse ngược chuỗi tiền.

Đối với chatbot, thống nhất:

- ID hội thoại và cách tạo/tiếp tục hội thoại.
- Nội dung tin nhắn và giới hạn độ dài.
- Cấu trúc phản hồi AI.
- Danh sách sản phẩm gợi ý (ID, tên, giá, URL ảnh, mô tả ngắn, đường dẫn chi tiết) nếu có.
- Trạng thái streaming nếu triển khai.
- Cấu trúc lỗi khi AI timeout, hết quota hoặc không tìm thấy dữ liệu.

Không để Frontend tự đoán response. Không để Backend đổi field, enum hoặc endpoint đã chốt mà không thông báo.

## 4.2. Quy trình thay đổi hợp đồng

Người đề xuất phải ghi thay đổi vào `docs/CHANGELOG_INTEGRATION.md`, thông báo Owner bị ảnh hưởng, cập nhật API Contract/fixture/mock/test, đồng bộ các module rồi mới merge. Không đưa thay đổi phá vỡ tương thích vào nhánh tích hợp khi module phụ thuộc chưa sẵn sàng.

## 4.3. Mock để phát triển độc lập

Frontend được phép bắt đầu bằng mock sau khi đã thống nhất API Contract cơ bản:

- Mock nằm riêng, ví dụ `frontend/src/mocks/`.
- Kiểu dữ liệu mock phải khớp API thật.
- Không hardcode dữ liệu mẫu rải rác trong component.
- Có cơ chế bật/tắt mock mode qua biến môi trường không chứa secrets.
- Có thể dùng MSW hoặc mock service phù hợp.
- Khi API thật sẵn sàng, chỉ cần đổi lớp data service/API adapter, hạn chế sửa component.
- Mọi giá, tồn kho, đánh giá hoặc nội dung cửa hàng giả lập phải được đánh dấu demo.

---

# 5. PHÂN TÍCH NGHIỆP VỤ VÀ THIẾT KẾ CHỨC NĂNG WEBSITE

Trước khi lập trình, tạo:

- `01_Project_Proposal.md`.
- `docs/USE_CASES.md` và sơ đồ Use Case.
- `docs/USER_STORIES.md` với 5–8 User Stories.
- `docs/SAMPLE_QUESTIONS.md` có ít nhất 15 câu hỏi mẫu đại diện.
- `docs/ASSUMPTIONS.md` ghi giả định và quyết định phạm vi.

Website dự kiến có các chức năng sau; hãy phân tích để chọn MVP phù hợp, không mở rộng vô hạn.

## 5.1. Trang chủ

- Giới thiệu cửa hàng và điều hướng.
- Banner hoặc khu vực giới thiệu nổi bật.
- Danh mục cầu lông.
- Sản phẩm nổi bật/bán chạy nếu có dữ liệu.
- Thanh tìm kiếm.
- Nút mở chatbot dễ nhận biết.

## 5.2. Danh mục và sản phẩm

Các loại sản phẩm dự kiến:

- Vợt cầu lông.
- Giày cầu lông.
- Quả cầu lông.
- Dây cước.
- Quấn cán.
- Túi/balo cầu lông.
- Quần áo cầu lông.
- Phụ kiện khác.

Chức năng:

- Danh sách sản phẩm theo danh mục.
- Tìm kiếm theo từ khóa.
- Lọc theo giá, thương hiệu và thuộc tính phù hợp.
- Sắp xếp và phân trang.
- Hiển thị tình trạng còn hàng.

## 5.3. Chi tiết sản phẩm

Hiển thị tên, hình ảnh, thương hiệu, giá, mô tả, thông số, tồn kho, đánh giá nếu có dữ liệu, sản phẩm liên quan, nút thêm giỏ và lối tắt hỏi chatbot về sản phẩm.

Với vợt, có thể dùng các thuộc tính như trọng lượng (3U/4U/5U), điểm cân bằng, độ cứng thân, mức căng tối đa, cỡ cán và chất liệu nếu dữ liệu nguồn có. Với giày, cầu và phụ kiện, phải thiết kế thuộc tính riêng theo loại; không áp dụng thuộc tính của vợt cho mọi sản phẩm.

## 5.4. Giỏ hàng và đặt hàng

- Thêm, xóa, thay đổi số lượng.
- Tính tổng tiền.
- Kiểm tra tồn kho phía Backend.
- Nhập thông tin người nhận và địa chỉ giao hàng.
- Kiểm tra đơn trước khi xác nhận.
- Lưu đơn hàng và chi tiết đơn hàng vào CSDL.
- Quản lý trạng thái đơn hàng.

Nếu không có cổng thanh toán thật, làm thanh toán mô phỏng và ghi rõ. Không giả vờ đã xử lý thanh toán tiền thật.

## 5.5. Tài khoản khách hàng

Trong phạm vi phù hợp: đăng ký, đăng nhập, đăng xuất, thông tin cá nhân và lịch sử đơn hàng. Không lưu mật khẩu dạng plaintext.

## 5.6. Quản trị viên

- Quản lý sản phẩm.
- Quản lý danh mục và thương hiệu.
- Quản lý tồn kho.
- Quản lý đơn hàng và trạng thái.
- Phân quyền và kiểm soát truy cập tại Backend.

---

# 6. THIẾT KẾ AI CHATBOT – CHỨC NĂNG TRỌNG TÂM

Không xây chatbot chỉ gửi câu hỏi trực tiếp đến LLM rồi nhận câu trả lời chung chung. Chatbot phải tư vấn dựa trên dữ liệu thực tế mà Backend truy xuất từ CSDL hoặc kho tri thức được nhóm xác nhận.

## 6.1. Vai trò và phong cách

Chatbot là trợ lý tư vấn dụng cụ cầu lông bằng tiếng Việt, thân thiện, tự nhiên, chuyên nghiệp, dễ hiểu và ngắn gọn khi phù hợp. Khi thiếu thông tin, chatbot biết hỏi lại thay vì đoán.

## 6.2. Các nhóm tư vấn

### Tư vấn vợt

Hỗ trợ câu hỏi về ngân sách, trình độ, phong cách chơi (tấn công/phòng thủ/cân bằng), trọng lượng, điểm cân bằng, độ cứng và các thông số khác nếu CSDL có.

Ví dụ:
- “Tôi mới chơi cầu lông thì nên mua vợt nào?”
- “Ngân sách 1 triệu, tìm vợt nhẹ cho người mới.”
- “Tôi thích đánh tấn công thì nên chọn vợt nào?”
- “So sánh hai cây vợt A và B.”

### Tư vấn giày và phụ kiện

Tư vấn giày theo dữ liệu kích cỡ/thuộc tính có sẵn; tư vấn dây cước, quấn cán, túi, quả cầu và phụ kiện theo nhu cầu/ngân sách nếu dữ liệu đủ.

### Tìm kiếm bằng ngôn ngữ tự nhiên

Ví dụ: “Tìm vợt dưới 1 triệu, nhẹ, phù hợp người mới.” Backend phải chuyển yêu cầu thành bộ lọc đã được kiểm tra và truy vấn DB. Không cho LLM tùy ý thực thi SQL.

### So sánh

So sánh các thuộc tính có dữ liệu: giá, trọng lượng, điểm cân bằng, độ cứng, công nghệ, đối tượng sử dụng và các thông tin liên quan. Phải phân biệt rõ thông tin có trong CSDL với nhận xét/tư vấn suy luận.

### Hỗ trợ mua hàng

Chatbot có thể hướng dẫn tìm sản phẩm và đề xuất thêm vào giỏ. Mọi thao tác thay đổi giỏ/đặt hàng phải đi qua API Backend với validate, kiểm tra quyền và xác nhận rõ ràng từ khách. LLM không được trực tiếp ghi DB hoặc tự ý đặt đơn.

### Hỏi đáp cửa hàng

Chỉ trả lời về vận chuyển, đổi trả, bảo hành, thanh toán và chính sách nếu nhóm có dữ liệu được xác nhận. Không tự bịa chính sách.

## 6.3. Kiến trúc hoạt động

Luồng khuyến nghị:

`Khách hàng → Frontend → Backend → xác định intent/điều kiện → truy vấn CSDL bằng service/query có kiểm soát → xây context → gọi LLM → kiểm tra/chuẩn hóa phản hồi → trả về Frontend`.

- Ưu tiên SQL/query lập trình sẵn có tham số.
- LLM không được tự do thực thi SQL trực tiếp.
- Không cấp quyền ghi dữ liệu cho mô hình.
- Kiểm tra và validate mọi structured output trước khi sử dụng.
- Context chỉ bao gồm dữ liệu cần thiết, tránh gửi toàn bộ CSDL hoặc dữ liệu nhạy cảm.
- Có quản lý lịch sử hội thoại/context window.

## 6.4. System Prompt và versioning

Tạo:

- `prompts/system_prompt_v1.md`.
- `prompts/system_prompt_v2.md`.
- `prompts/PROMPT_CHANGELOG.md`.

Prompt phải quy định vai trò, phạm vi, cách dùng context, cách tư vấn, định dạng đầu ra, giới hạn, điều kiện từ chối, cách xử lý thiếu dữ liệu, không tiết lộ chỉ dẫn nội bộ và chống prompt injection.

Phân biệt:

- System Prompt: nguyên tắc và hành vi.
- Context: dữ liệu Backend truy xuất.
- User Prompt: câu hỏi khách hàng.

Có thể dùng Structured Outputs/JSON cho intent, bộ lọc và product IDs. Backend phải validate output; không tin tưởng mù quáng dữ liệu do LLM sinh.

## 6.5. Chống bịa đặt (hallucination)

- Không bịa tên hoặc mã sản phẩm.
- Không bịa giá, tồn kho, thông số kỹ thuật hoặc chính sách.
- Không nói sản phẩm còn hàng nếu không có trạng thái tồn kho được truy xuất phù hợp.
- Không khẳng định thông tin không có căn cứ.
- Khi thiếu dữ liệu, nói rõ chưa có thông tin xác thực hoặc hỏi khách làm rõ.
- Mỗi đề xuất sản phẩm phải ánh xạ tới sản phẩm thật tồn tại trong CSDL.
- Frontend chỉ hiển thị product card dựa trên product ID/dữ liệu hợp lệ do Backend trả về; không parse sản phẩm từ văn bản tự do của LLM để tạo sản phẩm giả.

---

# 7. THIẾT KẾ VÀ XÂY DỰNG CƠ SỞ DỮ LIỆU

Database/Data Owner chịu trách nhiệm chính. Claude Code phải tạo tài liệu thiết kế và phối hợp qua Data Contract, không tự ý thay đổi schema thuộc Owner khác.

## 7.1. Yêu cầu

- Thiết kế CSDL quan hệ chuẩn hóa hợp lý.
- ERD, bảng, PK/FK, ràng buộc toàn vẹn, index.
- Migration và script dựng CSDL từ đầu.
- Seed dữ liệu có thể chạy lặp an toàn.
- Data Dictionary.
- Ít nhất 3 truy vấn nghiệp vụ thực thi được và có kết quả kiểm chứng.

Các thực thể định hướng (không bắt buộc tạo nguyên xi): User, Role, Category, Brand, Product, ProductAttribute, Inventory, Cart, CartItem, Order, OrderItem, Conversation, ChatMessage.

Không tạo bảng dư thừa hoặc dồn toàn bộ thông tin vào một bảng. Thiết kế thuộc tính sản phẩm phù hợp loại hàng.

## 7.2. Dữ liệu sản phẩm

Ưu tiên dữ liệu có nguồn hợp pháp và có thể ghi nhận nguồn. Nếu chưa có dữ liệu thật, tạo dữ liệu mô phỏng phục vụ đồ án, đánh dấu rõ là demo, không trình bày như giá/tồn kho của cửa hàng thật. Không dùng hình ảnh không có quyền sử dụng hoặc đường dẫn ảnh giả.

## 7.3. Sản phẩm bàn giao

Thư mục `02_Data/` cần có:

- ERD (ảnh hoặc file nguồn có thể chỉnh sửa nếu phù hợp).
- `schema.sql` hoặc migration tương đương.
- Script seed và dữ liệu CSV/JSON.
- Data Dictionary (`data_dictionary.xlsx` nếu khả thi; đồng thời có thể có bản Markdown/CSV).
- Tài liệu nguồn dữ liệu và giấy phép/ghi chú sử dụng.
- Tối thiểu 3 truy vấn nghiệp vụ được chạy thử.

Ví dụ truy vấn: tìm sản phẩm theo danh mục/giá/thông số; lọc sản phẩm theo ngân sách; so sánh hai sản phẩm. Thực sự chạy trên CSDL, không chỉ viết SQL minh họa.

---

# 8. KIẾN TRÚC, BACKEND VÀ API

## 8.1. Công nghệ đề xuất

Stack mặc định để cân nhắc:

- Frontend: React + TypeScript + Vite.
- Backend: Python + FastAPI.
- Database: PostgreSQL.
- ORM: SQLAlchemy.
- Migration: Alembic.
- AI: OpenAI API hoặc nhà cung cấp LLM được nhóm lựa chọn.
- UI: Tailwind CSS hoặc thư viện phù hợp.
- Backend tests: Pytest.
- Frontend tests: Vitest + Testing Library.
- E2E: Playwright.
- Deployment: Docker + Docker Compose.

Đây là đề xuất, không phải ràng buộc của học phần. Học phần cho phép lựa chọn Python (FastAPI), JS/TS (Node.js) hoặc C# (.NET). Hãy chọn stack phù hợp với năng lực nhóm, ghi lý do trong `docs/ARCHITECTURE.md` và thống nhất trước khi tạo cấu trúc lớn. Không thay công nghệ giữa chừng nếu không có lý do chính đáng.

## 8.2. Phân tầng Backend

Tách module phù hợp: API/router, schemas/DTO, services, repositories/data access, models, core/config, AI service và utils. Có validation, exception handling, logging, auth và authorization.

Nhóm API dự kiến:

1. Authentication.
2. Users.
3. Products.
4. Categories.
5. Brands.
6. Search/Filter.
7. Cart.
8. Orders.
9. Inventory.
10. Admin.
11. Chatbot.
12. Conversation History.

Điều chỉnh theo MVP và ghi trong API Contract. Không tạo endpoint không có nghiệp vụ.

## 8.3. Tích hợp LLM

- Chỉ gọi LLM từ Backend.
- API Key nằm trong biến môi trường, không hardcode, không commit và không gửi về trình duyệt.
- Có `.env.example` không chứa secrets.
- Tên model, base URL và tham số cấu hình qua environment/config.
- Có lớp AI provider/service để dễ thay model.
- Kiểm tra tài liệu API/SDK chính thức và phiên bản tương thích tại thời điểm triển khai.
- Xử lý timeout, lỗi, quota/rate limit, response sai định dạng và retry an toàn.

Nếu chưa có API Key, xây dựng Mock Mode tách biệt để vẫn phát triển/test được các module còn lại. Phải hiển thị/ghi rõ AI đang ở chế độ mock, không được giả vờ LLM thật hoạt động.

---

# 9. FRONTEND – PHẦN NGƯỜI DÙNG PHỤ TRÁCH

Đây là phần sở hữu của người dùng hiện tại. Ưu tiên thiết kế sao cho người dùng có thể phát triển độc lập qua API Contract và mock data.

## 9.1. Định hướng UI/UX

Website bán dụng cụ cầu lông, hiện đại, chuyên nghiệp, thể thao, trực quan và có tính thương mại điện tử. Giao diện tiếng Việt, Responsive trên desktop/tablet/mobile. Thiết kế nhất quán về màu sắc, typography, spacing, button, form, card và trạng thái.

Không làm giao diện sơ sài chỉ để đủ số trang. Ưu tiên luồng mua hàng và chatbot.

## 9.2. Các trang dự kiến

1. Trang chủ.
2. Danh sách sản phẩm.
3. Danh mục.
4. Tìm kiếm/kết quả lọc.
5. Chi tiết sản phẩm.
6. Giỏ hàng.
7. Checkout.
8. Đăng nhập/đăng ký.
9. Tài khoản cá nhân/lịch sử đơn hàng.
10. Trang quản trị trong phạm vi nhóm thống nhất.

Nếu cần giản lược để hoàn thành MVP trong 10 tuần, hãy ghi rõ phần nào là MVP, phần nào là mở rộng.

## 9.3. Chatbot UI

- Nút mở chat dễ thấy.
- Khung hội thoại gọn, không che mất nội dung quan trọng.
- Tin nhắn người dùng và AI phân biệt rõ.
- Loading/typing indicator.
- Gợi ý câu hỏi nhanh.
- Ô nhập, gửi bằng Enter và nút gửi.
- Lịch sử hội thoại nếu API hỗ trợ.
- Xử lý lỗi mạng, timeout, câu hỏi rỗng và giới hạn ký tự.
- Product recommendation cards gồm ảnh, tên, giá, mô tả ngắn và nút xem chi tiết; dữ liệu phải đến từ API.
- Có thể mở sản phẩm hoặc thêm giỏ hàng thông qua API nghiệp vụ, không để LLM tự thao tác.

## 9.4. Quy tắc code Frontend

- TypeScript và type/interface dùng chung cho API DTO.
- Tách component, page, layout, hooks, services/api, types, mocks và utils hợp lý.
- Không hardcode API URL trong nhiều nơi.
- Không hardcode dữ liệu demo trong component.
- Không lưu API secret ở Frontend.
- Không gọi LLM trực tiếp từ browser.
- Có loading, error, empty và success states.
- Xác thực input phía giao diện để cải thiện UX nhưng Backend vẫn phải validate.
- Viết test cho component/logic quan trọng và E2E cho luồng chính khi phù hợp.

Claude Code phải kiểm tra quyền sở hữu trước khi sửa file. Được phép triển khai Frontend theo nhiệm vụ người dùng giao; không lấy việc “hỗ trợ” làm lý do tự ý thay đổi module khác.

---

# 10. RAG HOẶC TỐI ƯU TRUY VẤN – KHÔNG LẠM DỤNG

Đánh giá loại dữ liệu trước khi quyết định.

- Dữ liệu bảng/giao dịch như giá, tồn kho, danh mục, thông số, đơn hàng: ưu tiên SQL.
- Văn bản phi cấu trúc như cẩm nang, hướng dẫn, chính sách có nguồn: có thể dùng RAG nếu thật sự cần.

Nếu triển khai RAG: ingestion → chunking → embedding → vector store → retrieval → generation; có trích dẫn nguồn và kiểm tra chất lượng retrieval.

Nếu không cần RAG, chọn tối ưu SQL, bộ lọc đa tiêu chí và quản lý context. Ghi lý do quyết định, không thêm Vector DB chỉ để làm dự án trông phức tạp.

---

# 11. KẾ HOẠCH 10 TUẦN THEO HỌC PHẦN

Ánh xạ công việc và sản phẩm bàn giao theo các tuần trong tài liệu môn học:

## Tuần 1 – Khởi động và phân tích yêu cầu

- Chọn bài toán, xác định người dùng và dữ liệu khả dụng.
- Phân tích yêu cầu, lập Use Case.
- Viết 5–8 User Stories.
- Tạo tối thiểu 15 câu hỏi mẫu đại diện.
- Tổ chức nhóm 3–5 người, phân vai Leader, Data, AI, Backend, Frontend/QA phù hợp số lượng thành viên.
- Bàn giao: `01_Project_Proposal.md`, sơ đồ Use Case, danh sách câu hỏi mẫu.

## Tuần 2 – Dữ liệu và thiết kế CSDL

- Thu thập/làm sạch dữ liệu, kiểm tra bản quyền, loại trùng và chuẩn hóa CSV/JSON.
- Thiết kế quan hệ, ERD, bảng, PK/FK, index và toàn vẹn dữ liệu.
- Viết ít nhất 3 truy vấn nghiệp vụ và kiểm chứng kết quả.
- Bàn giao: `02_Data/`, ERD, `schema.sql`, Data Dictionary.

## Tuần 3 – LLM, API và System Prompt

- Tích hợp API LLM qua Backend.
- Quản lý token, context window, temperature, timeout.
- Thiết kế System Prompt: vai trò, dữ liệu, điều kiện từ chối.
- Xây REST Chat API và lưu key an toàn trong environment.
- Bàn giao: chatbot prototype chạy qua Backend, `system_prompt_v1.md`, bảng test 20 câu.

## Tuần 4 – Kết nối AI với CSDL

- Luồng: giao diện → Backend → truy vấn CSDL → Prompt AI → phản hồi.
- Nhúng dữ liệu truy xuất vào context; cấm suy diễn ngoài dữ liệu.
- Ưu tiên truy vấn lập trình sẵn; nếu thử nghiệm sinh SQL thì chỉ read-only và được kiểm soát.
- Bàn giao: Backend kết nối CSDL, sơ đồ luồng dữ liệu, API Contract, video demo ngắn.

## Tuần 5 – Vibe Coding và MVP

- Quy trình: đặc tả → thiết kế module → sinh mã → review → test → commit.
- Hoàn thiện UI chat, trạng thái chờ, lịch sử hội thoại, lỗi.
- Làm chủ code, giải thích được cấu trúc và luồng dữ liệu.
- Bàn giao: MVP, Git repo có commit ý nghĩa, README.

## Tuần 6 – Kiểm thử và đánh giá AI

- Tạo tối thiểu 30 câu hỏi chuẩn: đúng dữ liệu, đa điều kiện và ngoài phạm vi.
- Phân loại lỗi dữ liệu, truy xuất DB, prompt và diễn đạt.
- Cải tiến `system_prompt_v2.md`.
- Đo tỷ lệ đúng trước/sau.
- Bàn giao: `test_cases.csv`, báo cáo kiểm thử, Prompt v2, bảng so sánh.

## Tuần 7 – RAG hoặc tối ưu nghiệp vụ

- Chọn hướng phù hợp dữ liệu.
- Nhóm nâng cao có thể làm chunking, embedding, vector DB, trích dẫn nguồn.
- Nhóm cơ bản tối ưu SQL, truy vấn phức tạp, lọc đa tiêu chí và context.
- Bàn giao: module mở rộng hoạt động và báo cáo so sánh kỹ thuật.

## Tuần 8 – Bảo mật, chi phí và ổn định

- Kiểm thử SQL Injection, Prompt Injection và phân quyền Backend.
- Timeout, retry an toàn, Rate Limiting, logging.
- Đo token và ước tính chi phí 100/1.000 lượt hội thoại.
- Bàn giao: báo cáo bảo mật, Security Checklist, bảng dự toán API.

## Tuần 9 – Triển khai demo và hồ sơ

- Triển khai Local/Docker/Cloud phù hợp.
- Chạy toàn bộ regression test trên phiên bản phát hành.
- Đóng băng mã nguồn, quay video demo dự phòng, hoàn thiện báo cáo.
- Bàn giao: Git release tag, hướng dẫn cài đặt, slide và video demo.

## Tuần 10 – Demo và bảo vệ

- Trình diễn trực tiếp kịch bản demo, đối chiếu câu trả lời với CSDL.
- Chuẩn bị vấn đáp từng cá nhân về SQL, Prompt, mã nguồn AI và bảo mật.
- Bàn giao: Git repo, CSDL, Prompt v2, báo cáo và video dự phòng.

Tạo `docs/TEAM_RESPONSIBILITIES.md` và `docs/PROJECT_PLAN.md` để thể hiện Owner, công việc, thời gian và sản phẩm bàn giao của từng tuần. Không tự bịa tên thành viên.

---

# 12. KIỂM THỬ VÀ ĐÁNH GIÁ CHẤT LƯỢNG

Không được coi “chạy lên được” là đồng nghĩa hoàn thành.

## 12.1. Kiểm thử website

Kiểm thử các luồng phù hợp MVP: đăng nhập/đăng ký, tìm kiếm/lọc, chi tiết sản phẩm, giỏ hàng, thay đổi số lượng, kiểm tra tồn kho, đặt hàng demo, quản lý đơn, quản lý sản phẩm và phân quyền.

## 12.2. Bộ kiểm thử AI tối thiểu 30 câu

Phân nhóm:

- Tra cứu sản phẩm.
- Tìm theo ngân sách.
- Nhiều điều kiện.
- So sánh.
- Tư vấn theo trình độ/phong cách chơi.
- Thiếu thông tin.
- Không có kết quả.
- Ngoài phạm vi.
- Hội thoại nhiều lượt.
- Prompt Injection.
- Dữ liệu mâu thuẫn hoặc câu hỏi chứa thông tin sai.

Mỗi test case cần có input, dữ liệu DB liên quan, kết quả kỳ vọng, tiêu chí chấm, kết quả thực tế và trạng thái. Với câu hỏi dữ liệu sản phẩm, phải có SQL hoặc bản ghi truy xuất làm căn cứ.

## 12.3. Đánh giá Prompt v1 và v2

Chạy cùng bộ test trên v1 và v2; phân tích lỗi; ghi thay đổi prompt; so sánh tỷ lệ đúng/độ bám dữ liệu/khả năng từ chối/thời gian/token. Không tự tạo số liệu tốt hơn nếu chưa chạy kiểm thử.

## 12.4. Các lớp kiểm thử

- Unit test.
- Integration test.
- Frontend component test.
- API test.
- AI evaluation test.
- Security test.
- Regression test.
- E2E cho luồng demo chính nếu đủ thời gian.

Tạo `docs/testing/TEST_PLAN.md`, `test_cases.csv`, `docs/testing/TEST_REPORT.md` và báo cáo so sánh Prompt v1/v2.

---

# 13. BẢO MẬT, ĐỘ ỔN ĐỊNH VÀ CHI PHÍ

Kiểm tra tối thiểu:

- API Key không lộ ở Frontend/Git/log.
- Backend kiểm soát quyền và truy cập dữ liệu.
- Input validation và output handling.
- SQL Injection.
- Prompt Injection.
- XSS và các rủi ro web phổ biến liên quan.
- Authentication/Authorization.
- Rate Limiting.
- Timeout và retry có kiểm soát.
- Logging không chứa secret hoặc dữ liệu cá nhân không cần thiết.
- Giới hạn độ dài câu hỏi và lịch sử context.
- Transaction và kiểm tra tồn kho khi đặt hàng.

Tạo:

- `docs/SECURITY_CHECKLIST.md`.
- `docs/SECURITY_TEST_REPORT.md`.
- `docs/API_COST_ESTIMATION.md`.

Ước tính chi phí cho 100 và 1.000 lượt hội thoại dựa trên model thực tế được chọn, giá API tại thời điểm kiểm tra và giả định token đầu vào/đầu ra. Ghi rõ ngày và nguồn giá. Không bịa bảng giá. Không tuyên bố an toàn tuyệt đối nếu chưa có bằng chứng kiểm thử.

---

# 14. GIT, CẤU TRÚC DỰ ÁN VÀ PHỐI HỢP NHÓM

## 14.1. Git

- Khởi tạo repository nếu chưa có.
- Dùng branch riêng theo module, ví dụ `feat/frontend-product-list`, `feat/backend-product-api`, `feat/ai-chatbot`, `feat/database-schema`.
- Thống nhất quy trình PR/review trước khi merge.
- Commit nhỏ, có ý nghĩa và phản ánh tiến độ từng tuần.
- Không commit `.env`, API key, token hoặc dữ liệu nhạy cảm.
- Không push remote nếu chưa có quyền/yêu cầu.
- Không force-push hoặc ghi đè lịch sử nhánh chung.
- Xử lý conflict với Owner của file; không chọn accept-all một cách máy móc.

## 14.2. Cấu trúc dự án tham khảo

```text
badminton-ai-shop/
├── frontend/                  # Frontend Owner: người dùng hiện tại
├── backend/
│   └── app/
│       ├── api/
│       ├── core/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       ├── repositories/
│       ├── ai/
│       └── utils/
├── 02_Data/
│   ├── erd/
│   ├── seed/
│   └── schema.sql
├── prompts/
│   ├── system_prompt_v1.md
│   ├── system_prompt_v2.md
│   └── PROMPT_CHANGELOG.md
├── docs/
│   ├── source/
│   ├── testing/
│   ├── architecture/
│   └── reports/
├── scripts/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── CLAUDE.md
├── README.md
├── TEAM_WORK_BOUNDARIES.md
└── 01_Project_Proposal.md
```

Đây là cấu trúc tham khảo. Điều chỉnh vừa đủ theo stack đã chọn, giữ ranh giới ownership rõ ràng và không tạo file/thư mục không có mục đích.

## 14.3. Theo dõi tiến độ

Duy trì `docs/IMPLEMENTATION_STATUS.md`, trong đó có:

- Giai đoạn hiện tại.
- Task và Owner.
- Đã hoàn thành/đang làm/chưa làm.
- File đã thay đổi.
- Module/API phụ thuộc.
- Test đã chạy và kết quả.
- Lỗi hoặc rủi ro còn tồn tại.
- Công việc tiếp theo.

Không đánh dấu PASS/Done khi chưa có bằng chứng chạy hoặc kiểm thử.

---

# 15. TRIỂN KHAI VÀ HỒ SƠ BÀN GIAO

Ưu tiên có môi trường Local dựng lại được bằng Docker Compose, gồm Frontend, Backend và PostgreSQL. Có migration và seed tự động/hướng dẫn rõ ràng.

README phải hướng dẫn:

- Yêu cầu môi trường.
- Cài dependencies.
- Cấu hình `.env` từ `.env.example`.
- Dựng CSDL/migration/seed.
- Chạy Backend và Frontend.
- Chạy bằng Docker Compose.
- Bật/tắt AI Mock Mode.
- Cấu hình LLM API Key.
- Chạy test.
- Tài khoản demo và giới hạn của dữ liệu demo.

Không ghi secrets vào README. Nếu chưa triển khai Cloud hoặc chưa có API Key, phải cung cấp hướng dẫn Local/Mock và ghi rõ giới hạn.

Tài liệu bàn giao cần có:

- Project Proposal.
- Use Case và User Stories.
- 15 câu hỏi mẫu trở lên.
- ERD, schema, Data Dictionary và nguồn dữ liệu.
- API Contract và Data Contract.
- Data Flow Diagram.
- System Prompt v1/v2 và changelog.
- Bộ test ít nhất 30 câu và báo cáo.
- Báo cáo bảo mật và ước tính chi phí.
- README và hướng dẫn cài đặt.
- Git repo, release tag.
- Slide demo, kịch bản demo và video dự phòng.
- Tài liệu chuẩn bị vấn đáp.

---

# 16. KỊCH BẢN DEMO VÀ CHUẨN BỊ BẢO VỆ

Tạo `docs/DEFENSE_PREPARATION.md` và kịch bản demo theo trình tự:

1. Mở trang chủ.
2. Tìm sản phẩm cầu lông.
3. Mở chi tiết sản phẩm.
4. Mở chatbot.
5. Hỏi tư vấn vợt cho người mới.
6. Đưa ngân sách cụ thể.
7. Chatbot truy vấn CSDL và đề xuất sản phẩm có thật.
8. Yêu cầu so sánh hai sản phẩm.
9. Chatbot trình bày thông tin lấy từ CSDL.
10. Hỏi một thông tin không tồn tại trong CSDL.
11. Chatbot từ chối suy đoán.
12. Chọn sản phẩm và thêm vào giỏ.
13. Đặt hàng demo.
14. Kiểm tra đơn hàng trong hệ thống/quản trị.

Chuẩn bị nội dung vấn đáp về:

- Kiến trúc hệ thống.
- Use Case/User Stories.
- ERD, khóa chính/ngoại và chuẩn hóa.
- SQL và truy vấn nghiệp vụ.
- REST API và API Contract.
- Frontend và luồng gọi API.
- Backend và phân quyền.
- LLM, System Prompt, Context và versioning.
- SQL Injection, Prompt Injection và bảo mật API Key.
- RAG và lý do chọn/không chọn.
- Kiểm thử AI và cách đối chiếu dữ liệu.
- Token, timeout và chi phí.

Nội dung bảo vệ phải trung thực với code thực tế, không ghi nhận tính năng chưa có.

---

# 17. NGUYÊN TẮC THỰC THI CỦA CLAUDE CODE

1. **Không chỉ lập kế hoạch rồi dừng.** Sau khi phân tích và thống nhất kiến trúc, chủ động triển khai các task được phép trong phạm vi Owner.
2. **Không làm trái phân công.** Người dùng là Frontend Owner. Không tự ý chuyển người dùng hoặc sửa module của thành viên khác.
3. **Không code trước khi chốt interface.** Tạo API/Data Contract trước khi Frontend và Backend phát triển song song.
4. **Không sinh code ồ ạt mà không chạy.** Áp dụng: đặc tả → thiết kế → code → review → test → sửa → ghi nhận.
5. **Không phá workspace.** Khảo sát trước, không xóa hoặc ghi đè thay đổi có sẵn.
6. **Không bịa dữ liệu hoặc kết quả.** Phân biệt mock, demo và dữ liệu thật. Không giả vờ đã gọi API/DB/test nếu chưa chạy.
7. **Không hỏi lại thông tin đã có.** Khi thiếu dữ liệu không nghiêm trọng, ghi giả định và tiếp tục. Chỉ yêu cầu thông tin/quyền truy cập thực sự cần thiết.
8. **Xử lý lỗi đến nơi đến chốn.** Đọc log, xác định nguyên nhân, sửa đúng module, chạy lại test và ghi kết quả.
9. **Tiết kiệm token.** Dùng `CLAUDE.md`, `PROJECT_PLAN.md`, `REQUIREMENTS_TRACEABILITY.md`, `TEAM_WORK_BOUNDARIES_SUMMARY.md` và `IMPLEMENTATION_STATUS.md`; không liên tục đọc lại tài liệu nguồn.
10. **Báo cáo trung thực.** Tách phần đã code, đã chạy, đã test, chưa test, đang mock và cần thành viên khác thực hiện.
11. **Bảo vệ ranh giới module.** Nếu cần thay đổi file của Owner khác, trình bày đề xuất trước thay vì tự sửa.
12. **Ưu tiên sản phẩm chạy được và giải thích được.** Không hy sinh tính đúng, bảo mật và khả năng bảo vệ để chạy theo số lượng tính năng.

---

# 18. TIÊU CHÍ NGHIỆM THU CUỐI CÙNG

Chỉ đánh dấu hoàn thành khi có bằng chứng cho các nhóm tiêu chí sau.

## Website

- Có trang chủ, danh mục, tìm kiếm/lọc và chi tiết sản phẩm.
- Có giỏ hàng và luồng đặt hàng demo hoạt động.
- Có quản trị các chức năng đã thống nhất.
- Responsive và có trạng thái loading/error/empty.
- Frontend gọi API theo Contract.

## CSDL

- Có ERD, schema/migrations, khóa và ràng buộc.
- Có Data Dictionary và nguồn dữ liệu.
- Có seed dựng lại được.
- Có tối thiểu 3 truy vấn nghiệp vụ đã chạy.

## AI Chatbot

- LLM được gọi qua Backend.
- Có System Prompt v1/v2.
- Context đến từ dữ liệu thực.
- Có hội thoại nhiều lượt trong giới hạn thiết kế.
- Tư vấn/tìm kiếm/so sánh sản phẩm.
- Biết từ chối khi thiếu dữ liệu.
- Không bịa sản phẩm, giá, thông số, tồn kho.
- Có ít nhất 30 test case và kết quả đánh giá.

## Kiểm thử và bảo mật

- Có unit/integration/AI/security/regression tests phù hợp.
- Có báo cáo và bằng chứng.
- Key được bảo vệ.
- Backend kiểm soát truy cập.
- Có kiểm tra SQL Injection, Prompt Injection, validation, rate limit, timeout.

## Phối hợp nhóm

- Đã điền Owner hoặc placeholder có chủ đích.
- Người dùng được ghi nhận là Frontend Owner.
- Có API Contract và Data Contract.
- Có quy trình mock/tích hợp.
- Không có thay đổi module trái ownership chưa được thống nhất.
- Tiến độ từng Owner được ghi nhận.

## Hồ sơ

- Đầy đủ tài liệu theo học phần.
- Có README dựng lại được.
- Có Git history/commit theo tiến độ.
- Có release/demo/video dự phòng và tài liệu bảo vệ.

---

# 19. LỆNH BẮT ĐẦU

Hãy bắt đầu ngay trên workspace hiện tại theo thứ tự:

1. Khảo sát workspace, không xóa/ghi đè file có sẵn.
2. Tìm và đọc toàn bộ `Ke_hoach_giang_day_Do_an_1.pptx` một lần.
3. Đọc toàn bộ `TEAM_WORK_BOUNDARIES.md` một lần.
4. Trích xuất yêu cầu và tạo các tài liệu tổng hợp/source-of-truth.
5. Ghi nhận người dùng hiện tại là Frontend Owner.
6. Tạo bảng phân công với placeholder cho các thành viên chưa biết tên; không tự bịa tên.
7. Lập kế hoạch 10 tuần và Requirement Traceability.
8. Chọn stack phù hợp, ghi quyết định kiến trúc.
9. Tạo API Contract, Data Contract và quy tắc mock/integration trước khi triển khai song song.
10. Phân rã task theo Owner và đánh dấu task nào Claude Code có thể thực hiện trong phạm vi hiện tại.
11. Bắt đầu triển khai các task được phép. Ưu tiên tạo nền tảng dự án, hợp đồng tích hợp và hỗ trợ người dùng phát triển Frontend mà không xâm phạm module của thành viên khác.
12. Chạy test theo từng module, cập nhật trạng thái và sửa lỗi.
13. Hoàn thiện tích hợp, bảo mật, triển khai và hồ sơ bàn giao theo kế hoạch.

**YÊU CẦU CỐT LÕI:** Đọc kỹ tài liệu trước – thống nhất phân công và hợp đồng tích hợp – phát triển song song không xung đột – kiểm thử có bằng chứng – bàn giao sản phẩm chạy được và giải thích được.

Không chỉ trả lời bằng kế hoạch. Hãy thực hiện các công việc có thể thực hiện ngay trong workspace và báo rõ những việc cần Owner khác hoặc thông tin/quyền truy cập từ nhóm.

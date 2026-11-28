# BÁO CÁO KIỂM THỬ AI CHATBOT – PROMPT V1



**Dự án:** AI Chatbot tư vấn bán vợt cầu lông  

**Nhóm phụ trách:** AI Team  

**Phiên bản kiểm thử:** System Prompt V1  

**Phạm vi:** TC01–TC20  

**Nguồn dữ liệu:** 10 mẫu vợt mock từ `frontend/src/mocks/data.ts`  

**API kiểm thử:** `POST /api/chat`



---



## 1. Mục tiêu kiểm thử



- Kiểm tra khả năng lọc sản phẩm theo ngân sách.

- Kiểm tra khả năng lọc theo thương hiệu và thông số kỹ thuật.

- Kiểm tra độ chính xác khi so sánh sản phẩm.

- Kiểm tra khả năng xử lý thông tin không tồn tại hoặc chưa được cung cấp.

- Kiểm tra khả năng sử dụng dữ liệu tồn kho mô phỏng.

- Phát hiện tình trạng AI tự suy diễn hoặc tạo thông tin không có trong dữ liệu.



## 2. Tổng hợp kết quả



| Kết quả | Số lượng |

|---|---:|

| PASS | 7 |

| FAIL | 13 |

| Tổng số test | 20 |

| Tổng điểm | 169/200 |

| Điểm trung bình | 8,45/10 |



### Bảng kết quả chi tiết



| Test Case | Điểm | Kết quả |

|---|---:|---|

| TC01 – Ngân sách tối đa 2 triệu | 8/10 | FAIL |

| TC02 – Ngân sách tối đa 2,5 triệu | 9/10 | PASS |

| TC03 – Ngân sách tối đa 3 triệu | 8/10 | FAIL |

| TC04 – Khoảng giá 3–4 triệu | 8/10 | FAIL |

| TC05 – Ngân sách tối đa 1 triệu | 10/10 | PASS |

| TC06 – Khoảng giá 2,5–3 triệu | 8/10 | FAIL |

| TC07 – Lọc Head Heavy | 8/10 | FAIL |

| TC08 – Lọc Head Light | 7/10 | FAIL |

| TC09 – Lọc Even Balance | 8/10 | FAIL |

| TC10 – So sánh trọng lượng 3U/4U | 8/10 | FAIL |

| TC11 – Lọc Extra Stiff | 8/10 | FAIL |

| TC12 – Head Heavy và ngân sách 3,5 triệu | 9/10 | PASS |

| TC13 – Lọc thương hiệu Yonex | 10/10 | PASS |

| TC14 – Lọc thương hiệu Victor | 10/10 | PASS |

| TC15 – So sánh hai mẫu vợt | 8/10 | FAIL |

| TC16 – Sản phẩm không tồn tại | 7/10 | FAIL |

| TC17 – Kiểm tra xuất xứ | 9/10 | PASS |

| TC18 – Kiểm tra chiều dài thân vợt | 8/10 | FAIL |

| TC19 – Kiểm tra tồn kho | 10/10 | PASS |

| TC20 – Kiểm tra hình ảnh | 8/10 | FAIL |



*Lưu ý: PASS/FAIL được giữ theo kết quả chấm từng test đã thực hiện. Các trường hợp có điểm từ 8/10 nhưng FAIL là do vi phạm yêu cầu không bịa thông tin hoặc lỗi quan trọng khác.*



## 3. Các lỗi AI được phát hiện



### 3.1. Tự suy diễn thông tin sản phẩm



AI thường tự bổ sung các nhận định không có trong dữ liệu, ví dụ:



- Vợt tấn công mạnh mẽ dành cho người chơi trình độ cao.

- Vợt phòng thủ nhanh, phù hợp người mới.

- Đòi hỏi kỹ thuật và lực tay tốt.

- Cân bằng hoàn hảo giữa tấn công và phòng thủ.

- Dễ chơi, lý tưởng cho người mới bắt đầu.



**Ảnh hưởng:** Người dùng có thể hiểu nhầm các nhận định do AI tạo ra là thông số hoặc thông tin chính thức của cửa hàng.



### 3.2. Không tuân thủ giới hạn số lượng sản phẩm



Một số câu trả lời vượt quá giới hạn tối đa 3 sản phẩm khi AI bổ sung thêm sản phẩm ở phần ghi chú hoặc đề xuất phía dưới.



**Yêu cầu cải thiện:** Tổng số sản phẩm được đề cập như kết quả đề xuất trong một câu trả lời không được vượt quá giới hạn đã đặt.



### 3.3. Chưa phân biệt nhất quán dữ liệu mock và dữ liệu thực tế



Một số câu trả lời đưa số lượng tồn kho nhưng không ghi rõ đây là dữ liệu mô phỏng.



**Yêu cầu cải thiện:** Khi sử dụng trường `stock`, phải thông báo rõ đây là dữ liệu mock, không khẳng định là số lượng hàng thực tế.



### 3.4. Xử lý thông tin không có trong dữ liệu



AI đã xử lý tốt một số trường hợp như không tìm thấy Yonex Astrox 100ZZ hoặc không có thông tin xuất xứ.



Tuy nhiên, sau khi trả lời rằng dữ liệu chưa có, AI vẫn thường bổ sung các thông tin không được hỏi và các nhận định thiếu căn cứ.



**Yêu cầu cải thiện:** Khi không có dữ liệu, trả lời rõ ràng rằng chưa có thông tin; không tự suy đoán hoặc bổ sung nội dung không cần thiết.



### 3.5. So sánh sản phẩm có thông tin ngoài dữ liệu



Ở TC15, AI so sánh đúng giá, trọng lượng, điểm cân bằng và độ cứng nhưng tự bổ sung đặc điểm lối chơi.



**Yêu cầu cải thiện:** Chỉ so sánh các thuộc tính được cung cấp. Không tự chuyển đổi thông số thành kết luận về hiệu năng nếu dữ liệu không xác nhận.



## 4. Đề xuất cải thiện System Prompt V2



1. Bổ sung quy tắc nghiêm cấm tự tạo đặc điểm lối chơi, hiệu năng, trình độ phù hợp hoặc công dụng sản phẩm khi dữ liệu không cung cấp.

2. Quy định rõ AI chỉ được sử dụng thông tin có trong dữ liệu sản phẩm được truyền vào.

3. Bắt buộc ghi rõ dữ liệu tồn kho là dữ liệu mô phỏng khi sử dụng mock data.

4. Áp dụng giới hạn tối đa 3 sản phẩm cho toàn bộ câu trả lời đề xuất, bao gồm cả phần ghi chú.

5. Khi gặp thông tin không tồn tại hoặc chưa được cung cấp, phải thông báo thiếu dữ liệu và không suy đoán.

6. Khi so sánh sản phẩm, chỉ so sánh các trường dữ liệu có sẵn.

7. Không được khẳng định thông tin hình ảnh nếu hệ thống chưa có khả năng kiểm chứng nội dung ảnh.

8. Ưu tiên trả lời ngắn gọn, đúng câu hỏi, không thêm nội dung tư vấn ngoài yêu cầu.



## 5. Các vấn đề cần Backend Developer kiểm tra



Các vấn đề dưới đây cần được phân biệt với chất lượng Prompt:



- Gemini từng trả về lỗi HTTP 503 do tình trạng quá tải.

- Backend có cơ chế fallback sang `generateRuleBasedResponse` khi Gemini gặp lỗi.

- Cần kiểm tra fallback có đang sử dụng đúng bộ 10 sản phẩm mock hay vẫn lấy dữ liệu Prisma khác.

- Cần kiểm tra cách xử lý dữ liệu tồn kho và cách truyền ngữ cảnh sản phẩm vào Gemini.

- Cần kiểm tra khả năng duy trì lịch sử hội thoại và truyền System Prompt trong các lượt tiếp theo.



**Lưu ý:** Các lần Gemini lỗi 503 hoặc câu trả lời được tạo bởi fallback không nên dùng để đánh giá trực tiếp chất lượng System Prompt V1.



## 6. Kết luận



Qua 20 test case, Prompt V1 đã thể hiện khả năng xử lý tương đối tốt các yêu cầu lọc theo ngân sách, thương hiệu và một số trường hợp dữ liệu không tồn tại.



Tuy nhiên, lỗi nổi bật là AI vẫn tự bổ sung thông tin ngoài dữ liệu, đặc biệt là nhận định về lối chơi, hiệu năng và trình độ người chơi. Ngoài ra, việc phân biệt dữ liệu mock với dữ liệu thực tế chưa nhất quán.



**Đề xuất:** AI Team tiếp tục cải thiện System Prompt thành V2, sau đó chạy lại các test case bị FAIL để đánh giá mức độ cải thiện. Backend Developer kiểm tra riêng cơ chế fallback, nguồn dữ liệu và tính ổn định của Gemini.



**Trạng thái:** Hoàn thành kiểm thử Prompt V1 – 20/20 test case.



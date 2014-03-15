Nguyễn Văn Ánh BLOG
===================

Đăng bài viết
-------------

BLOG sử dụng [jekyll](http://jekyllrb.com), các quy tắc cần phải tuân thủ theo biểu mẫu của jekyll và các phần phụ thuộc.
Ngoài ra 1 vài quy tắc xin được nhắc lại hoặc quy định rõ ràng dưới đây:

### Tập tin bài viết
* Tập tin bài viết phải encode theo định dạng UTF-8, **không** kèm `BOM`.
* Tập tin **phải** được đặt trong thư mục `_posts`, **không** được kèm trong thư mục con trong `_posts`.
* Phần mở rộng tận tin **phải** là `.md`.
* Tên tập tin **phải** tuần theo biểu mẫu sau: `Y-m-d-slug.md`. Trong đó:
  * `Y` Năm bài viết được tạo, viết theo 4 chữ số (VD: 2014).
  * `m` Tháng bài viết được tạo (VD: 06).
  * `d` Ngày tạo bài viết (VD: 09).
  * `slug` Slug là tên bài viết muốn tạo, được viết theo kiểu chữ thường không dấu phân cách bằng dấu `-` (VD: bai-viet). Slug phải là duy nhất không được trùng với bất kỳ slug nào đã có hoặc trùng với tên page sẵn có.
  * Ví dụ: `2013-06-09-bai-viet.md`

Xem thêm về [đăng post](http://jekyllrb.com/docs/posts/)

### Khai báo trước

Khai báo trước cho một bài viết phải được viết theo [YAML](http://yaml.org/)
Một bài viết phải được khai báo trước đầy đủ các yếu tố sau:

* `layout`: Layout phải là `post`.
* `title`: Tiêu đề không quá 70 ký tự kể cả dấu cách. Phải giống với slug của bài viết, viết thường có dấu (hoặc không).
* `category`: Không sử dụng **categoies**. Chỉ được dùng một category cho 1 bài viết. Phải nằm trong: [linux|php].
* `image`: Tên ảnh phải giống với tên slug với 1 đuôi mở rộng là [jpg|png|gif], phải được đặt trong thư mục `/img/posts`.
* `tags`: Sử dụng không quá 3 tag, cách nhau bằng dấu cách.
* `date`: Ngày viết bài phải tuân theo định dạng: `%Y-%m-%d %H:%M:%S`.

Ví dụ:

```yaml
–––
layout:   post
title:    Giới thiệu Ubuntu
category: linux
image:    /img/posts/gioi-thieu-ubuntu.jpg
tags:     linux ubuntu
date:     2014-03-12 17:52:00
–––
```
Đọc thêm về [khai báo trước](http://jekyllrb.com/docs/frontmatter/)

Tham khảo thêm tài liệu của [Jekyll](http://jekyllrb.com/docs/home/)

Tạo trang
---------

//...

Đóng góp
--------

Xin lỗi! Tôi không chấp nhận bất kỳ đóng góp họăc sửa đổi nào ỏ thời điểm hiện tại.

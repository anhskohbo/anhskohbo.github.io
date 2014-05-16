---
layout:   post
title:    Cài đặt Node.JS trên Ubuntu
category: nodejs
image:    /img/posts/cai-dat-nodejs-tren-ubuntu.jpg
tags:     nodejs ubuntu
date:     2014-05-16 015:00:00
---

> Cách dưới đây cũng tương tự với các distro base trên Ubuntu: Linux Mint, Elementary OS...

Theo thông cáo từ trang [package](http://packages.ubuntu.com/search?keywords=nodejs)  của Ubuntu, nodejs đã sớm có mặt từ biên bản 12.04 LTS, tuy nhiên từ 12.04 đến 13.04 nó đi kèm với phiên bản cũ 0.6.x của node.  Ubuntu 13.10 có sẵn nodejs 0.10.15 và Ubuntu 14.04 LTS là 0.10.25.

Người dùng Ubuntu 13.10, 14.04 LTS trở lên có thể cài qua dòng lệnh đơn giản sau:

```
sudo apt-get install nodejs
```

Với người sử dụng Ubuntu 12.04 LTS đến Ubuntu 13.04 bạn cần sử dụng ppa bên ngoài để cập nhật phiên bản mới nhất của node.js.

> Mình vẫn khuyến khích các bạn sử dụng kho bên ngoài, điều này đảm bảo bạn luôn có phiên bản node.js mới nhất trong máy.

 ```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

Cài đặt xong bạn gõ `nodejs -v` mà ra thông tin phiên bản, tức là đã thành công!

[![Screenshot from 2014-05-15 10:27:34.png](https://i.imgur.com/vJsdXKs.png)](https://i.imgur.com/vJsdXKs.png) 

Gỡ cài đặt
--------------

Gỡ cài đặt nodejs nếu bạn muốn:

```
sudo apt-get remove nodejs npm
```

> Bài viết này có thể được coi là một phần được dịch lại từ trang wiki của nodejs. Đối với các distro khác của Linux, hoặc các OS khác vui lòng tham khảo  thêm tại địa chỉ: <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manage>

---
layout:   post
title:    Bắt link download video youtube với PHP
category: php
image:    /img/posts/bat-link-download-video-youtube-voi-php.jpg
tags:     php youtube download
date:     2014-04-20 16:00:00
---

Giới thiệu
----------

Vừa rồi bên vn-zoom có một bác đề cập đến vấn đề lấy liên kết download video như IDM hay các addons trên trình duyệt.
Vì vậy mình đã viết một đoạn mã nhỏ và đơn giản nhằm mục đích trên.

Vì là nhỏ và đơn giản nên đoạn mã trong bài viết này có thể còn nhiều lỗi phát sinh khi đầu vào không hợp lệ ^^.

Source
------

```php
<?php

/**
 * Parses the youtube video ID and returns download links.
 *
 * @author Nguyen Van Anh <anhskohbo@gmail.com>
 * @param  string $videoId
 * @return array
 */
function youtube_dl($videoId)
{
    $youtubeUrl = 'http://www.youtube.com/watch?v='.$videoId;

    if ($contentHtml = file_get_contents($youtubeUrl)) {

        if (preg_match('/;ytplayer\.config\s*=\s*({.*?});/', $contentHtml, $matches)) {

            $jsonData  = json_decode($matches[1], true);
            $streamMap = $jsonData['args']['url_encoded_fmt_stream_map'];
            $videoUrls = array();

            foreach (explode(',', $streamMap) as $url)
            {
                $url = str_replace('\u0026', '&', $url);
                $url = urldecode($url);

                parse_str($url, $data);
                $dataURL = $data['url'];
                unset($data['url']);

                $videoUrls[] = array(
                    'itag'    => $data['itag'],
                    'quality' => $data['quality'],
                    'url'     => $dataURL.'&'.urldecode(http_build_query($data))
                );
            }

            return $videoUrls;
        }
    }

    return array();
}

```

Sử dụng
-------

```php
<?php

$downloads = youtube_dl('B5kV-CIyMOQ');
var_dump($downloads);

```

`youtube_dl` sẽ trả về một danh sách các liên kết download có sẵn cho video.

Nếu bạn muốn lấy thông tin về định dạng video, kiểu video ... (kiểu như Mp4 - 720p) youtube xác định nó qua `itag`. Một thông tin toàn diện về `itag` có tại địa chỉ:
<http://users.ohiohills.com/fmacall/YTCRACK.TXT>

Tổng kết
--------

Hiện tại mình đang bận nên chưa có thời gian viết chi tiết cách thức hoạt động là lấy liên kết. Chỉ chia sẻ code lên đây ^^.

Mình sẽ sớm viết 1 thư viện PHP 5.3+ hoàn chỉnh download video từ youtube hay các trang khác.

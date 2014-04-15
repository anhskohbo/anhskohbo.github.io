---
layout:   post
title:    Giới thiệu Presenter trong Laravel
category: php
image:    /img/posts/gioi-thieu-presenter-trong-laravel.jpg
tags:     php larvel presenter
date:     2014-04-16 03:45:00
---

Laravel là một framework tuyệt vời, có khi trên cả tuyệt vời, với thiết kế đơn giản mà đầy mạnh mẽ, khả năng mở rộng vô biên cùng cú pháp luôn toát lên vẻ thanh lịch...

Tuy nhiên nó không phải là một cô gái hoàn hảo (lẽ dĩ nhiên là vậy khi mà PHP còn nhiều hạn chế), vẫn có nhiều điểm hạn chế khi ta phát triển và mở rộng ứng dụng.

Trong bài viết này mình xin nói một hạn chế thường gặp: Xuất và định dạng dữ liệu từ *Model* ra *View*, và cách dùng *Presenter* để khắc phục nó.


Vấn đề phát sinh
----------------

Trước khi đi vào vấn đề chính, hãy xem một ví dụ sau đây:

Bảng `users` có cấu trúc đơn giản như sau:

```php
<?php

Schema::create('users', function(Blueprint $table)
{
    $table->increments('id');
    
    $table->string('firstname', 25);
    $table->string('lastname', 25);
    $table->string('email', 100)->unique();
    $table->string('password', 64);
    
    $table->timestamps();
});
```

Một Model `User` cũng khá đơn giản:

```php
<?php

class User extends Eloquent {

    /**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';
    
}

```

Và giờ là khi chúng ta xuất dữ liệu của `User` ra view.

{% raw  %}
```html
@foreach (User::all() as $user)
    <p>
        <img src="{{ Gravatar::src($user->email)) }}">
		<span>{{ $user->first_name . $user->last_name }}</span>
		<time>{{ $user->created_at->format('d/m/Y - h:m') }}</time>
	</p>
@endforeach
```
{% endraw %}

Nếu chỉ có thế thì sẽ không ra chuyện, chuyện sẽ xảy ra khi bạn không chỉ xuất dữ liệu `User` một lần mà nhiều lần. Và mỗi lần lại xuất `fullname` lại chấm một cái giữa `fist_name` và `last_name` hay `format` ngày tháng lại thì thật không hay chút nào. 

Bằng sự tìm tòi sáng dạ của mình, tôi đã tìm được một giải pháp tình thế hay hơn [^1] :)): định dạng chúng ở trong *Model*, khi dùng chỉ cần lấy ra:


```php
<?php

class User extends Eloquent {

    // ...
    
    public function fullname()
    {
        return $this->first_name . $this->last_name;
    }
    
    public function avatar()
    {
        return HTML::image(Gravatar::src($this->email));
    }
    
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d/m/Y H:i');
    }

}

```

Và giờ trong view, dữ liệu xuất ra trở nên trong sáng và thống nhất hơn:

{% raw  %}
```html
@foreach (User::all() as $user)
    <p>
        {{ $user->avatar() }}
    	<span>{{ $user->fullname() }}</span>
		<time>{{ $user->created_at }}</time>
	</p>
@endforeach
```
{% endraw %}

Cười hả hê một lúc thì nhận thấy:

- *Model* là nơi ta thao tác với CSDL, cớ sao ta đút định dạng ra view vào trong đó?
- Và quả thật, nếu *Model* có nhiều scope [^2] thì thật tạp nham, không ra thể thống gì!
- Nếu những thuộc tính xuất ra *View* cần nhiều sự logic, mã cứng html... thì đúng là không thể chấp nhận được!
- ...

Đó chính là lúc cần sử dụng đến *Presenter* để tách những phương thức xuất ra *View* ra khỏi *Model* mà vẫn giữ được cách gọi nhẹ nhàng khi ở *Model*.


Presenter
---------

*Presenter* là một kiểu thiết kế khá mới mẻ (dường như nó chỉ sinh ra cho Laravel?!), mình chưa tìm thấy định nghĩa chính thức từ wiki hay nơi nào khác?!
Tuy nhiên mục đích của rõ ràng nhất là để khắc phục nhược điểm nêu ở trên: Làm cho *Model*, *View* được sạch sẽ và nhất quán. 

Thư viện *Presenter* được dùng nhiều tại thời điểm hiện tại là: [robclancy/presenter][presenter], nó được thiết kế nhỏ nhẹ mà khá mạnh mẽ cho mục đích sử dụng.

`robclancy/presenter` được lưu trữ tại địa chỉ: <https://github.com/robclancy/presenter>, trong đó có một tài liệu cài đặt, giới thiệu và sử dụng rõ ràng. Tuy nhiên, cho mục đích của bài viết này, mình xin được nêu cách sử dụng nó ra đây.


Cài đặt
-------

Thêm `robclancy/presenter` trong phần "require" file `composer.json` của bạn.

```json
"robclancy/presenter": "1.1.*"
```

Chạy `composer update` để cài đặt (hoặc cập nhật) lại source.

Cuối cùng thêm `Provider` của nó vào `app/config/app.php` của bạn:

```php
'Robbo\Presenter\PresenterServiceProvider',
```

Sử dụng
-------

*Presenter* rất dễ dàng sử dụng và nếu bạn có để mã trong như trong ví dụ đầu thì bạn cũng dễ dàng sửa đổi lại mà không làm vỡ cấu trúc method.

Giờ tôi sẽ viết lại ví dụ trên đầu theo kiểu thiết kế *Presenter*:

Một lớp `UserPresenter` kế thừa lại `Robbo\Presenter\Presenter`.
Ném lại các phương thức trong `User` cũ vào lớp `UserPresenter` mới.

```php
<?php

class UserPresenter extends Robbo\Presenter\Presenter {

    public function fullname()
    {
        return $this->first_name . $this->last_name;
    }
    
    public function avatar()
    {
        return HTML::image(Gravatar::src($this->email));
    }
    
    public function presentCreatedAt()
    {
        return $this->created_at->format('d/m/Y H:i');
    }

}
```

`User` đã trở về với sự đơn giản của nó, bạn cần một phương thức `getPresenter` để trả về lớp Presenter của *Model*. 

```php
<?php

use Robbo\Presenter\PresentableInterface;

class User extends Eloquent implements PresentableInterface {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';


    /**
     * Return a created presenter.
     *
     * @return Robbo\Presenter\Presenter
     */
    public function getPresenter()
    {
        return new UserPresenter($this);
    }
}
```

`UserPresenter` có mục đích là tải lại các phương thức, biến... từ `User` khi bạn gọi đến. Và ở bạn có thể tự do thêm các phương thức logic để thao tác với View.

Nếu muốn ghi đè biến của Model, bạn có thể sử dụng prefix `present` trước tên biến. (Như `presentCreatedAt()` ở trên)

Giờ thì pass biến qua view:

```php
<?php

$users = User::all();
return View::make('view-template', compact('users'))
```

Ở đây, bạn cần hiểu cách làm việc của *Presenter*:
Khi bạn truy xuất dữ liệu từ `User` trong *controller*, bạn sẽ thao tác với `User` như thông thường.
Khi pass biến qua View, dữ liệu sẽ được tự động chuyển thành `UserPresenter` thông qua phương thức `getPresenter()`.

Vì vậy, trong *View* bạn có thể gọi bất cứ phương thức nào có trong `User` hay `UserPresenter`.
Có thể gọi biến thông qua `ArrayAccess`, xem thêm tại [đây](https://github.com/robclancy/presenter#array-usage)

{% raw %}
```html
@foreach ($users as $user)
    <p>
        {{ $user->avatar() }}
        
        {{ $user['first_name'] }}
        {{ $user->first_name }}
        
        <span>{{ $user->fullname() }}</span>
		<time>{{ $user->created_at }}</time>
	</p>
@endforeach
```
{% endraw %}

Giờ thì app của bạn đã được phân định rõ ràng giữa *Model*, và *Presenter Model*.
Với *Model* bạn chỉ nên giữ nó với những phương thức thao tác CSDL, hoặc self-validation. Còn *Presenter Model* bạn có thể thoải mái định dạng lại dữ liệu Model, hay thậm chí chèn cứng mã HTML vào mà không bị cảm thấy lộn xộn như khi để chúng ở Model.

- - -

Để cho được rõ ràng, lớp `UserPresenter` mình khuyến nghị các bạn đặt trong `app/presenters/UserPresenter.php`, và sử dụng autoload-class trong composer để tự động load chúng.

```json
"classmap": [
    "app/presenters",
]
```

Chạy `composer dump-autoload` để nạp lại file autoload.

Tổng kết
--------

Trong bài viết này bạn đã có thêm một cách thức *đẹp* nhất cho việc tuyền và định dạng lại dữ liệu từ *Model* sang *View* trong [Laravel][laravel].
Một cách thiết kế và tổ chức các lớp, thư mục sao cho  gọn gàng và sạch sẽ...

Nếu có bất kỳ thắc mắc hoặc ý kiến, vui lòng để lại comment bên dưới!

[^1]: http://laravel.com/docs/eloquent#accessors-and-mutators
[^2]: http://laravel.com/docs/eloquent#query-scopes

[laravel]: http://laravel.com/
[presenter]: https://packagist.org/packages/robclancy/presenter
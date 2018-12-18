import Cookies from 'js-cookie'

/* 参考网址 */
// https://blog.csdn.net/qq_20802379/article/details/81436634

/* 创建 */
// 创建简单的cookie
Cookies.set('name', 'value')
// 创建有效期为7天的cookie
Cookies.set('name', 'value', { expires: 7 })
// 为当前页创建有效期7天的cookie
Cookies.set('name', 'value', { expires: 7, path: '' })

/* 取值 */
Cookies.get('name') // => 'value'
Cookies.get('nothing') // => undefined
// 获取所有cookie
Cookies.get() // => { name: 'value' }

/* 删除值 */
Cookies.remove('name')
// 如果值设置了路径，那么不能用简单的delete方法删除值，需要在delete时指定路径
Cookies.set('name', 'value', { path: '' })
Cookies.remove('name') // 删除失败
Cookies.remove('name', { path: '' }) // 删除成功
// 注意，删除不存在的cookie不会报错也不会有返回


/* 命名空间 */
var Cookies2 = Cookies.noConflict()
Cookies2.set('name', 'value')

/* json相关 */
// js-cookie允许你向cookie中存储json信息。
// 如果你通过set方法，传入Array或类似对象，而不是简单的string，那么js-cookie会将你传入的数据用JSON.stringify转换为string保存。
Cookies.set('name', { foo: 'bar' })
Cookies.get('name') // => '{"foo":"bar"}'
Cookies.get() // => { name: '{"foo":"bar"}' }

// 如果你用getJSON方法获取cookie，那么js-cookie会用JSON.parse解析string并返回。
Cookies.getJSON('name') // => { foo: 'bar' }
Cookies.getJSON() // => { name: { foo: 'bar' } }

/* set方法支持的属性 */
// expires 
// 定义有效期。如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间。默认情况下cookie有效期截止至用户退出浏览器。

// path 
// string，表示此cookie对哪个地址可见。默认为”/”。

// domain 
// string，表示此cookie对哪个域名可见。设置后cookie会对所有子域名可见。默认为对创建此cookie的域名和子域名可见。

// secure 
// true或false，表示cookie传输是否仅支持https。默认为不要求协议必须为https。

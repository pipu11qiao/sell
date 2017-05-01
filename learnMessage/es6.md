## 对象的扩展
##### 属性简写
ES6允许直接写入变量和函数，作为对象的属性和方法,只写属性名，不写属性值，
这时，属性值等于属性名所代表的的变量。
~~~ javascript
	var foo = 'bar';
	var baz = {foo};
~~~
##### 方法简写
ES6允许直接写入变量和函数，作为对象的属性和方法,只写属性名，不写属性值，
这时，属性值等于属性名所代表的的变量。
~~~ javascript
	var o = {
		method() {
			return "Hello!";
		}
	};
	// CommonJS 模块输出变量，非常实用
	var ms = {};
  function getItem (key) {
    return key in ms ? ms[key] : null;
  }
  function setItem (key, value) {
    ms[key] = value;
  }
  function clear () {
    ms = {};
  }
  module.exports = { getItem, setItem, clear };
~~~

#### 9.2 属性名表达式
字面量定义对象时(使用大括号)
~~~
	let propKey = 'foo';
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
~~~




























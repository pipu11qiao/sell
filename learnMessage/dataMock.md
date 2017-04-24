#### 数据模拟 这个好酷
先配置数据源 json文件 用json格式定义模仿数据库中的相关数据。
在build 下的 dev-server.js 中配置相应的接口 
用 express 来在服务器层面摸你傻数据
~~~ javascript
var appData = require('../data.json'); // 数据源 json文件路径
var seller = appData.seller; // 卖家数据
var goods = appData.goods; // 商品数据
var ratings = appData.ratings; // 评分数据

var apiRoutes = express.Router(); // 路由对象
// 定义路由
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0, // 返回的状态码
    data: seller
  });
});
	
~~~


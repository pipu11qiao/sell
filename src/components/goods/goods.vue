<template>
	<div class="goods">
		<div class="menu-wrapper" v-el:menu-wrapper>
			<ul>
				<li v-for="item in goods" class="menu-item" :class="{current: currentIndex === $index}" @click="selectMenu($index,$event)">
					<span class="text border-1px">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}} </span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" v-el:food-wrapper>
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook" >
					<h1 class="title"> {{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<h1 class="name"> {{food.name}}</h1>
								<p class="desc"> {{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<food :food="selectedFood" :show-flag="showFlag" v-ref:food></food>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import food from 'components/food/food';

	const ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then(response => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			selectMenu(index, event) {
				if (!event._constructed) {
					return;
				}
				this.foodScroll.scrollTo(0, -this.listHeight[index], 300);
			},
			selectFood(food, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$els.menuWrapper, {
					click: true
				});
				this.foodScroll = new BScroll(this.$els.foodWrapper, {
					probeType: 3,
					click: true
				});
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			_drop(target) {
				// 体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		},
		events: {
			'cart.add'(target) {
				this._drop(target);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				line-height: 14px;
				padding: 0 12px;
				&.current
					position:relative
					margin-top: 1px
					z-index: 10
					background-color: #fff
					font-weight: 700
					.text
						border-none()
				.icon
					display: inline-block
					vertical-align: top
					margin-top: 1px
					margin-right: 2px
					width: 12px
					height: 12px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.special
						bg-image('special_3')
					&.invoice
						bg-image('invoice_3')
					&.guarantee
						bg-image('guarantee_3')
				.text
					display: table-cell
					vertical-align: middle
					font-size: 12px
					color: rgb(20, 20, 20)
					font-weight: 200
					border-1px(rgba(7, 17, 27, .1))
		.foods-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147, 153, 159)
				background: #f3f5f7
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, .1))
				&:last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					margin-bottom: 0
					.name
						margin: 2px 0 8px 0
						line-height: 14px
						font-size: 14px
						color: rgb(7, 17, 27)
						height: 14px
					.desc, .extra
						line-height: 10px
						font-size: 10px
						color: rgb(147, 153, 159)
					.desc
						line-height: 12px
						margin-bottom: 8px
					.extra
						&.count
							margin-right: 10px
					.price
						font-weight: 400px
						line-height: 24px
						.now
							margin-right: 8px
							font-size: 14px
							color: rgb(240, 20, 20)
						.old
							text-decoration: line-through
							font-size: 10px
							color: rgb(7, 17, 27)
					.cartcontrol-wrapper
						position: absolute
						right: 0
						bottom: 12px
					u
						font-size: 10px
</style>
<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul >
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img :src="food.icon" >
							</div>
							<div class="content">
								<h1 class="name">{{food.name}}</h1>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: []
			};
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then(response => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
				}
			});
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
			padding: 0 12px;
			.menu-item
				display: table
				height: 54px
				width: 56px
				line-height: 14px;
				.icon
					display: inline-block
					vertical-align:top
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
					color: rgb(20,20,20)
					font-weight: 200
					border-1px(rgba(7,17,27,.1))
		.foods-wrapper
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147,153,159)
				background: #f3f5f7
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				border-1px(rgba(7,17,27,.1))
				&:last-child
					border-none()
				
</style>
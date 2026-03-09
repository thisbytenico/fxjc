<template>
	<view class="time-wrap" :class="{typeFormate1:type=='1',typeFormate2:type=='2'}">
		<view class="day" v-if="day.length > 0">
			<text
				class="time"
				:class="{ moveIngUp: day[i] != day_old[i] }"
				v-for="(item, i) in day_old"
				:key="i"
			>
				{{ item }}
			</text>
			<view class="move-count">
				<text
					class="move-time"
					:class="{ moveIng: day[i] != day_old[i] }"
					v-for="(item, i) in day"
					:key="'m' + i"
				>
					{{ item }}
				</text>
			</view>
			<view class="name" >天</view>
			<view class="line"></view>
		</view>
		<view class="hour" v-show="hour.length > 0">
			<text
				class="time"
				:class="{ moveIngUp: hour[i] != hour_old[i] }"
				v-for="(item, i) in hour_old"
				:key="i"
			>
				{{ item }}
			</text>
			<view class="move-count">
				<text
					class="move-time"
					:class="{ moveIng: hour[i] != hour_old[i] }"
					v-for="(item, i) in hour"
					:key="'m' + i"
				>
					{{ item }}
				</text>
			</view>
			<view  class="name">小时</view>
			<view class="line"></view>
		</view>
		<view class="minutes" v-show="minutes.length > 0">
			<text
				class="time"
				:class="{ moveIngUp: minutes[i] != minutes_old[i] }"
				v-for="(item, i) in minutes_old"
				:key="i"
			>
				{{ item }}
			</text>
			<view class="move-count">
				<text
					class="move-time"
					:class="{ moveIng: minutes[i] != minutes_old[i] }"
					v-for="(item, i) in minutes"
					:key="'m' + i"
				>
					{{ item }}
				</text>
			</view>
			<view  class="name" >分钟</view>
			<view class="line"></view>
		</view>
		<view class="seconds" v-show="seconds.length > 0">
			<text
				class="time"
				:class="{ moveIngUp: seconds[i] != seconds_old[i] }"
				v-for="(item, i) in seconds_old"
				:key="i"
			>
				{{ item }}
			</text>
			<view   class="move-count">
				<text
					class="move-time"
					:class="{ moveIng: seconds[i] != seconds_old[i] }"
					v-for="(item, i) in seconds"
					:key="'m' + i"
				>
					{{ item }}
				</text>
			</view>
			<view class="name">秒</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		endTime: {
			default: new Date().getTime() + 100000,
		},
		type:{
			default: '0'
		}
	},
	data() {
		return {
			timeCount: 100,
			timer: null,
			day: [0,0],
			day_old: [0,0],
			minutes: [0,0],
			minutes_old: [0,0],
			hour: [0,0],
			hour_old: [0,0],
			seconds: [0,0],
			seconds_old: [0,0],
			timer:0,
			smallTimer:0
		};
	},
	created(){
		this.initTimer();
	},
	mounted() {
		// this.initTimer();
	},
	beforeDestroy(){
			clearTimeout(this.timer);
			clearTimeout(this.smallTimer);
	},
	methods: {
		initTimer() {
			// this.timer = setInterval(() => {
				const time = this.curtime(this.endTime);
				if(time.seconds<0){
					this.$emit("end", true);
					return;
				}
				this.hour_old = this.hour;
				this.minutes_old = this.minutes;
				this.seconds_old = this.seconds;
			  this.day_old = this.day;
				this.smallTimer=setTimeout(() => {
					this.minutes =
						time.minutes < 10 ? "0" + time.minutes : time.minutes;
					this.hour = time.hour < 10 ? "0" + time.hour : time.hour;
					this.seconds =
						time.seconds < 10 ? "0" + time.seconds : time.seconds;
					this.day=time.day < 10 ? "0" + time.day : time.day;
					this.day=(this.day + "").split("");
					// console.log('this.day',this.day,'this.day_old',this.day_old)
					this.minutes = (this.minutes + "").split("");
					this.hour = (this.hour + "").split("");
					this.seconds = (this.seconds + "").split("");
				}, 50);
				if (!time.day && !time.minutes && !time.hour && !time.seconds) {
					clearInterval(this.timer);
					this.$emit("end", true);
				}else{
					this.timer=setTimeout(()=>{
						this.initTimer();
					},1000)
				}
			// }, 1000);
		},
		curtime(endTime) {
			let nowtime = new Date(),
				endtime = new Date(endTime);
			let lefttime = endtime.getTime() - nowtime.getTime(),
				leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),
				lefth = Math.floor((lefttime / (1000 * 60 * 60)) % 24),
				leftm = Math.floor((lefttime / (1000 * 60)) % 60),
				lefts = Math.floor((lefttime / 1000) % 60);
				// console.log('leftd',leftd)
			return {
				day: leftd,
				hour: lefth,
				minutes: leftm,
				seconds: lefts,
			};
		},
	},
};
</script>

<style lang="stylus" scoped>
.time-wrap 
	display: flex;
	// justify-content: flex-start;
	// justify-content: center
	box-sizing: border-box;
	margin-left: 24px
	margin-left: 30px
	/* padding: 10rpx 0; */
	opacity: 1;
	animation: showIn 1s;
	animation-fill-mode: forwards;
	overflow: hidden;
	& > view 
		position: relative;
		display: block;
		margin-right: 15px;
		&:last-child
			margin-right: 0;
		
		/* &::after {
			content: ":";
		}
		&:last-child::after {
			content: "";
		} */
		.move-count 
			position: absolute;
			left: 0;
			top: 0;
			font-size: 14px;
			font-size:46px;
			font-feature-settings: "tnum";
			// transform: translateY(1em);
			.move-time
				font-size: 14px;
				font-size:46px;
				font-weight: bold;
				font-feature-settings: "tnum";
			
		
		.time
			font-size: 14px;
			font-size:46px;
			font-weight: bold;
			font-feature-settings: "tnum";
		
		.moveIng 
			display: inline-block;
			animation: move_bottom_center 0.5s ease-in;
			animation-fill-mode: forwards;
		
		.moveIngUp 
			display: inline-block;
			animation: move_center_top 0.5s ease-in;
			animation-fill-mode: forwards;

		@keyframes move_bottom_center {
			0% {
				transform: translateY(1.2em);
			}

			50% {
			}
			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}
		@keyframes move_center_top {
			0% {
				transform: translateY(0);
			}
			50% {
			}
			100% {
				transform: translateY(-1.2em);
			}
		}
	
	&.typeFormate1>view
		display: flex;
		align-items: center;
		/* &::before{
			content: "";
			width: 1px;
			height: 20px;
			background-color: #353636;
			position: absolute;
			right: 10px;
			top:1px;
		} */
		.line
			width: 0.5px;
			height: 20px;
			background-color: #353636;
			/* position: absolute; */
			right: 10px;
			top:1px;
			display: none
		/* &:nth-child(3) .line{
			right: 11px;
		} */
		&:last-child::before
			display: none;
		
		.name
			font-size: 14px;
			font-size: 28px;
			font-weight: 650
			margin:0 10px 0 25px;
			color:#333333;
			display: inline-block;

		&.seconds .name
			margin-right: 0;
		
	
	&.typeFormate2>view
		&.day::after 
			content: "-";
		
		&.hour::after 
			content: "";
			padding-right: 5px;
		
		&.minutes::after 
			content: ":";
		
		&.seconds::after 
			content: "";
</style>

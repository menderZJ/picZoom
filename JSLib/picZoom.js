/**
 * pic-zoom V1.0
 * @since 2020-07-05
 * @Author mender.zj.yang
 * @LICENES Undoer the MIT licenes
 * @Detail https://github.com/menderZJ/picZoom
 */
!(function(w) {	
	if(typeof w ==="object"){
		var global=w;
	}
	else{
		var global=window;
	}
		var picZoom = {
			props: {
				//容器宽
				width: {
					type: [Number, String],
					default: "400px",
				},
				//容器高
				height: {
					type: [Number, String],
					default: "400px",
				},
				//图片宽
				img_width: {
					type: [Number, String],
					default: 400,
				},
				//图片高
				img_height: {
					type: [Number, String],
					default: 400,
				},
				//img图片地址
				img_src: {
					type: String,
					default: "",
				},
				//最大放大倍数
				max_rate: {
					type: Number,
					default: 10,
				},
				//最小缩放系数
				min_rate: {
					type: Number,
					default: 0.1,
				},
			},

			data: function() {
				return {
					//实时缩放倍率
					zoom_rate: 1,
					Cwidth: this.width,
					Cheight: this.height,
					t_img_width: this.img_width,
					t_img_height: this.img_height,
					isDraging: false,
					old_position_left: 0,
					old_position_top: 0,
					start_pos_x: 0,
					start_pos_y: 0,
					img_left: 0,
					img_top: 0,
					img_old_left: 0,
					img_old_top: 0,
					dbClick: 0,
					dbclickStartTime: 0,

				}
			},
			methods: {
				ev_midlle_drag_start: function(e) {
					e = e || window.event;
					if (this.dbClick == 0) {
						this.dbclickStartTime = (new Date()).getTime();
					}
					if ((new Date()).getTime() - this.dbclickStartTime < 500) {
						this.dbClick++;
					}

					this.isDraging = true;
					var x = e.pageX;
					var y = e.pageY;
					this.start_pos_x = x;
					this.start_pos_y = y;
					this.img_old_left = parseFloat(this.$refs.img.style.left);
					this.img_old_top = parseFloat(this.$refs.img.style.top);
					this.$refs.img.style.cursor = "move";
					this.$emit("middle_drag_start", [this.$refs.img, e]);
				},
				ev_midlle_drag_ing: function(e) {
					e = e || window.event;
					if (this.isDraging == true) {
						this.$refs.img.style.cursor = "move";
						var x = e.pageX;
						var y = e.pageY;
						var new_img_left = (this.img_old_left + x - this.start_pos_x);
						var new_img_top = (this.img_old_top + y - this.start_pos_y);
						//下面部分用于保证图片总会有一小部分在外层框可见范围内，避免图片丢失
						//下面处理左移或上移超出外框的情况
						if(new_img_left<0){
						new_img_left = -new_img_left>parseFloat(this.t_img_width) - 10 ? -parseFloat(this.t_img_width) + 10 : new_img_left;
						}
						if(new_img_top<0){
						new_img_top = -new_img_top>parseFloat(this.t_img_height) - 10 ? -parseFloat(this.t_img_height) + 10 : new_img_top;
						}
						//下面处理右移或下移超出外框的情况
						if(new_img_left>0){
						new_img_left=new_img_left>parseFloat(this.width)-10?parseFloat(this.width)-10:new_img_left;
						}
						if(new_img_top>0){
						new_img_top=new_img_top>parseFloat(this.height)-10?parseFloat(this.height-10):new_img_top;
						}
						this.$refs.img.style.left = new_img_left + "px";
						this.$refs.img.style.top = new_img_top + "px";
						this.$emit("middle_draging", [this.$refs.img, e]);
					}
				},

				ev_midlle_drag_end: function(e) {
					e = e || window.event;
					if (e.type == "mouseup") {
						if (this.dbClick == 2 && (new Date()).getTime() - this.dbclickStartTime < 500) {
							this.$emit("middle_dbclick", [this.$refs.img, e]);
							this.dbClick = 0;
							this.$refs.img.style.left = "0px";
							this.$refs.img.style.top = "0px";
							this.t_img_width = this.$attrs['img_width'] || 400;
							this.t_img_height = this.$attrs['img_height'] || 400;
						} else if (this.dbClick > 2 || (new Date()).getTime() - this.dbclickStartTime > 500) {
							this.dbClick = 0;
						}
					}
					this.isDraging = false;
					this.$refs.img.style.cursor = "pointer";
					this.$emit("middle_drag_end", [this.$refs.img, e]);

				},
				ev_mousewheel: function(e) {
					e = e || window.event;
					var wheelValue = e.wheelDelta || e.detail; //浏览器IE，谷歌滑轮事件  或者Firefox滑轮事件  
					if (wheelValue > 0) {
						this.zoom_rate = 1.1;
						if (this.zoom_rate > this.max_rate) {
							this.zoom_rate = this.max_rate;
						}
					} else {
						this.zoom_rate = 0.9;
						if (this.zoom_rate < this.min_rate) {
							this.zoom_rate = this.min_rate;
						}
					}
					var imgWidth = this.t_img_width * this.zoom_rate;
					var imgHeight = this.t_img_height * this.zoom_rate;
					imgWidth = imgWidth < 20 ? 20 : imgWidth;
					imgHeight = imgHeight < 20 ? 20 : imgHeight;
					//整个图片在外框上面后左面
					if (imgWidth + parseFloat(this.$refs.img.style.left) < 0) {
						this.$refs.img.style.left = "0px";
					}
					if (imgHeight + parseFloat(this.$refs.img.style.top) < 0) {
						this.$refs.img.style.top = "0px";
					}
					//缩放的时候确保图片做定点与外框做定点对齐
					if (parseFloat(this.$refs.img.style.left) > 0) {
						this.$refs.img.style.left = "0px";
					}
					if (parseFloat(this.$refs.img.style.top) > 0) {
						this.$refs.img.style.top = "0px";
					}
					this.t_img_width = imgWidth;
					this.t_img_height = imgHeight;
					this.$emit("middle_wheel", [this.$refs.img, e]);
				}
			},
			computed: {

			},
			template: "<div class=\"pic_Zoom\" :style=\"{display:'block','width':parseFloat(width)+'px','height':parseFloat(height)+'px'}\" 	v-on:mousewheel.prevent.stop.capture=\"ev_mousewheel($event)\" v-on:mouseup.middle.stop.prevent.capture=\"ev_midlle_drag_end($event)\" 	v-on:mouseout.stop=\"ev_midlle_drag_end($event)\"><img :src=\"img_src\" v-on:mousedown.middle.prevent.stop.capture=\"ev_midlle_drag_start($event)\" v-on:mousemove.prevent.stop.capture=\"ev_midlle_drag_ing($event)\" :width=\"t_img_width\" :height=\"t_img_height\"  :style=\"{left:img_left,top:img_top}\" ref=\"img\" /><span>滚动滚轮可进行缩放,按住鼠标滚轮键可移动图片.在图片上双击鼠标中键可还原图片</span></div>",
		};

		if ("object" === typeof Vue || "function" === typeof Vue) {
			Vue.component("pic-zoom", picZoom);
		};
	})(window)

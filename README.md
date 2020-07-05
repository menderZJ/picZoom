# picZoom
一个基于Vue的图片缩放展现组件，支持机器工程、建筑设计师的鼠标中键操作习惯。上下滚轮放大缩小，按住可拖动查看
## How To Use
1. 载入Vue框架。
1. 载入组件文件：picZoom.js 或者picZoom.min.js
```
<script src="./JSLib/picZoom.min.js"></script>
```
1. 载入组件样式文件：picZoom.css
```
<link rel="stylesheet" href="./css./picZoom.css">
```
1. 使用组件标签 pic-zoom
```
<pic-zoom width="外框宽度" height="外框高度" img_src="图片地址"></pic-zoom>
```
## APIs
### 1. 属性 Attributes
|属性名称|类型|说明|默认值|
|:--:|:--:|:--:|:--|
|width|Number,String|外框容器宽度|400px|
|hieght|Number,String|外框容器高度|400px|
|img_width|Number,String|图片初始宽度|400|
|img_width|Number,String|图片初始高度|400|
|img_src|String|图片地址||

### 1. 事件 Events
|事件名称|说明|触发条件|参数|
|:--:|:--:|:--:|:--|
|middle_drag_start|开始拖动|在图片上按下右键时|图片对象,鼠标按下事件|
|middle_draging|拖动中|在图片按住中键移动时|图片对象,鼠标移动事件|
|middle_drag_end|拖动中|释放（弹起）中键时|图片对象,鼠标释放事件|
|middle_wheel|缩放事件|滚轮缩放图片时|图片对象,鼠标滚轮事件|
|middle_dbclick|中键双击|中键双击时（0.5秒内连续按下两次中键并弹起）|图片对象,鼠标滚轮事件|
### 1. 演示地址 Demo
```
【点击前往】[http://www.crazyjs.org/demo/picZoom/test.html]
```
```
【GitHub】[https://github.com/menderZJ/picZoom]
```

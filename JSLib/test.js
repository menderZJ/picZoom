(function(global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : //CMD模式
			typeof define === 'function' && define.amd ? define(factory) : //amd模式
			(global = global || self, global.$J$ = factory()); //经典window
	}(typeof Vue === 'object' || typeof Vue === 'function' ? Vue : (window ? window : this), function() {
			'use strict';
			var JsonNode = arguments[0] || null;
			var selector = arguments[1] || "";
			if (JsonNode === null) {
				return null;
			}
			if (JsonNode != null && selector === "") {
				return JsonNode;
			}
			//简单选择器，取开始部分
			var selectRegExp = /(?:#([^>\s~+()*&^%#!@~?\/\\`\.\[\]=]+)|\.([^>\s~+()*&^%#!@~?\/\\`\.\[\]=]+)|\[([^>\s~+()*&^%#!@~?\/\\`\.\[\]=]+=['"][^>\s~+()*&^%#!@~?\/\\`\.\[\]=]+['"])\]|([^>\s~+()*&^%#!@~?\/\\`\.\[\]=]+))/;			
			/**
			 * 深度优先，树遍历算法
			 * @param {Object} node 指定符节点
			 * @param {Object} callBackFn，获取到每个节点后执行的回调函数，回调函数的传入参数为当前遍历到的节点和节点名称，该函数应是一个返回值bool类型的函数，回调函数处理为真时，该节点会被赋予返回数组中
			 */
			function deepTraversal(node, callBackFn,returnArr) {
				returnArr =returnArr|| [];
				if (node != null) {
					for(var i in node){
						deepTraversal(children[i],callBackFn,returnArr);
						callBackFn(children[i],i) ? returnArr.push(children[i]):"";
					}
				}
			}
			var returnArr=[];
			var identify=selectRegExp.exec(selector);
			if(identify[1]){ //id模式
				deepTraversal(JsonNode, function(v){
					return v.id==selector||v.iD==selector||v.Id==selector||v.ID==selector;
					},returnArr);
			}
			else if(identify[2]){//class模式
				deepTraversal(JsonNode, function(v){
					return v.class==selector||v.CLASS==selector||v.Class==selector;
					},returnArr);
			}
			else if(identify[3]){//属性模式
				var propV=identify[3].split("=");
				deepTraversal(JsonNode, function(v,nodeName){
					return v[propV[0]]==propV[1];
					},returnArr);
			}
			else if(identify[4]){//节点名称
				deepTraversal(JsonNode, function(v,nodeName){
					return nodeName==selector;
					},returnArr);
			}
			else{
				
				throw "选择器描述错误，请检查"；
			}
			
			return returnArr;

}));

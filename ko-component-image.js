"use strict";

/**
 * versionHistory: 
 *    2017.11.22 Sir0xb 搭建基础结构
 *    2017.11.23 Sir0xb 增加日志功能
 *    2017.11.27 Sir0xb 判断数据状态，减少报错量
 * 
 * class     : 配置 css 类
 * style     : 配置样式
 * default   : 默认图片
 * src       : 显示图片
 * srcFormat : 格式化显示图片
**/
define(["knockout"], function (ko) {
	ko.components.register('ko-image', {
		viewModel: function(params) {
			var self = this;

			self.clazz     = ko.utils.unwrapObservable(params.class) || "";
			self.style     = ko.utils.unwrapObservable(params.style) || "";
			self.defsrc    = ko.utils.unwrapObservable(params.default) || "";
			self.srcFormat = params.srcFormat || function (src) { return src; };
			self.src 	   = self.srcFormat(ko.utils.unwrapObservable(params.src) || "");
			self.log       = params.log || function (msg) {};

			self.showDefault = ko.observable(false);
			self.showSrc = ko.observable(self.src.length != 0);

			self.defaultError = function () {
				self.showDefault(false);
				self.log(`ko-image default missing&file=${self.defsrc}`);
			};

			self.srcError = function () {
				self.showSrc(false);
				if (self.defsrc.length != 0) {
					self.showDefault(true);
				}
				self.log(`ko-image image missing&file=${ko.utils.unwrapObservable(params.src)}`);
			};
		},
		template: function () {
			return `
				<!-- ko if: showDefault -->
				<img data-bind="attr: { class: clazz, style: style, src: defsrc }, event: { error: defaultError }" />
				<!-- /ko -->
				<!-- ko if: showSrc -->
				<img data-bind="attr: { class: clazz, style: style, src: src }, event: { error: srcError }" />
				<!-- /ko -->
			`;
		}()
	});
});

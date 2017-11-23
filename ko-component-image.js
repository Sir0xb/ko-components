"use strict";

/**
 * versionHistory: 
 *    2017.11.22 Sir0xb
 *    xxxx.xx.xx xxxx
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

			self.showDefault = ko.observable(false);
			self.showSrc = ko.observable(true);

			self.defaultError = function () {
				self.showDefault(false);
			};

			self.srcError = function () {
				self.showSrc(false);
				self.showDefault(true);
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


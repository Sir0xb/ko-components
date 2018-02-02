"use strict";

/**
 * versionHistory: 
 *    2018.01.26 Sir0xb ko对象变化实时更新
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
			self.src 	   = ko.observable(ko.utils.unwrapObservable(self.srcFormat(ko.utils.unwrapObservable(params.src) || "")));
			self.log       = params.log || function (msg) {};
			self._srcError = params.srcError || function () {};
			self._defError = params.defError || function() {};

			self.showDefault = ko.observable(self.src().length == 0 && self.defsrc.length > 0);
			self.showSrc = ko.observable(self.src().length != 0);

			if (ko.isObservable(params.src)) {
				params.src.subscribe(function(newValue) {
					self.src(ko.utils.unwrapObservable(self.srcFormat(newValue || "")));
					self.showDefault(self.src().length == 0 && self.defsrc.length > 0);
					self.showSrc(self.src().length != 0);
				});
			}

			self.defaultError = function () {
				self.showDefault(false);
				self.log(`ko-image default missing&file=${self.defsrc}`);
				self._defError.call(this);
			};

			self.srcError = function () {
				self.showSrc(false);
				if (self.defsrc.length != 0) {
					self.showDefault(true);
				}
				self.log(`ko-image image missing&file=${ko.utils.unwrapObservable(params.src)}`);
				self._srcError.call(this);
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

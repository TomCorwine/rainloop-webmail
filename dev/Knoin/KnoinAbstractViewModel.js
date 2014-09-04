
(function () {

	'use strict';

	var
		ko = require('ko'),

		Enums = require('Common/Enums'),
		Utils = require('Common/Utils'),
		Globals = require('Common/Globals')
	;

	/**
	 * @constructor
	 * @param {string=} sPosition = ''
	 * @param {string=} sTemplate = ''
	 */
	function KnoinAbstractViewModel(sPosition, sTemplate)
	{
		this.bDisabeCloseOnEsc = false;
		this.sPosition = Utils.pString(sPosition);
		this.sTemplate = Utils.pString(sTemplate);

		this.sDefaultKeyScope = Enums.KeyState.None;
		this.sCurrentKeyScope = this.sDefaultKeyScope;

		this.viewModelVisibility = ko.observable(false);
		this.modalVisibility = ko.observable(false).extend({'rateLimit': 0});

		this.viewModelName = '';
		this.viewModelNames = [];
		this.viewModelDom = null;
	}

	/**
	 * @type {boolean}
	 */
	KnoinAbstractViewModel.prototype.bDisabeCloseOnEsc = false;

	/**
	 * @type {string}
	 */
	KnoinAbstractViewModel.prototype.sPosition = '';

	/**
	 * @type {string}
	 */
	KnoinAbstractViewModel.prototype.sTemplate = '';

	/**
	 * @type {string}
	 */
	KnoinAbstractViewModel.prototype.sDefaultKeyScope = Enums.KeyState.None;

	/**
	 * @type {string}
	 */
	KnoinAbstractViewModel.prototype.sCurrentKeyScope = Enums.KeyState.None;

	/**
	 * @type {string}
	 */
	KnoinAbstractViewModel.prototype.viewModelName = '';

	/**
	 * @type {Array}
	 */
	KnoinAbstractViewModel.prototype.viewModelNames = [];

	/**
	 * @type {?}
	 */
	KnoinAbstractViewModel.prototype.viewModelDom = null;

	/**
	 * @return {string}
	 */
	KnoinAbstractViewModel.prototype.viewModelTemplate = function ()
	{
		return this.sTemplate;
	};

	/**
	 * @return {string}
	 */
	KnoinAbstractViewModel.prototype.viewModelPosition = function ()
	{
		return this.sPosition;
	};

	KnoinAbstractViewModel.prototype.cancelCommand = function () {};
	KnoinAbstractViewModel.prototype.closeCommand = function () {};

	KnoinAbstractViewModel.prototype.storeAndSetKeyScope = function ()
	{
		this.sCurrentKeyScope = Globals.keyScope();
		Globals.keyScope(this.sDefaultKeyScope);
	};

	KnoinAbstractViewModel.prototype.restoreKeyScope = function ()
	{
		Globals.keyScope(this.sCurrentKeyScope);
	};

	KnoinAbstractViewModel.prototype.registerPopupKeyDown = function ()
	{
		var self = this;

		Globals.$win.on('keydown', function (oEvent) {
			if (oEvent && self.modalVisibility && self.modalVisibility())
			{
				if (!this.bDisabeCloseOnEsc && Enums.EventKeyCode.Esc === oEvent.keyCode)
				{
					Utils.delegateRun(self, 'cancelCommand');
					return false;
				}
				else if (Enums.EventKeyCode.Backspace === oEvent.keyCode && !Utils.inFocus())
				{
					return false;
				}
			}

			return true;
		});
	};

	module.exports = KnoinAbstractViewModel;

}());
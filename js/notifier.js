/**
 * Simple notifier system based on localStorage API
 * @author Shadez <https://github.com/Shadez>
 **/

var Notifier = function()
{
	this.m_localStorageKey = 'notifier_event';
	this.m_isAvailable = this.isLocalStorageAvailable();
	this.m_notifierId = this.generateNotifierId();
	this.bindEvent();
};

/**
 * Returns current notifier ID
 * @return String
 **/
Notifier.prototype.getNotifierId = function()
{
	return this.m_notifierId;
};

/**
 * Checks if local storage is available on current browser
 * @return bool
 **/
Notifier.prototype.isLocalStorageAvailable = function()
{
	return typeof window.localStorage != 'undefined' && window.localStorage;
};

/**
 * Checks if Notifier is available
 * @return bool
 **/
Notifier.prototype.isAvailable = function()
{
	return this.m_isAvailable;
};

/**
 * Generates random chars as notifier ID
 * @param int idLength = 8
 * @return String
 */
Notifier.prototype.generateNotifierId = function(idLength)
{
	if (!this.isAvailable())
		return false;

	if (!idLength)
		idLength = 8;

	var nId = '',
		allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < idLength; ++i)
		nId += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

	return nId;
};

/**
 * Binds storage key change event
 * @return void
 **/
Notifier.prototype.bindEvent = function()
{
	if (!this.isAvailable())
		return false;

	var t = this;

	$(window).bind('storage', function(e) {
		var evt = e.originalEvent;

		if (evt.key == t.m_localStorageKey)
			t.handleLsEvent(JSON.parse(evt.newValue));
	});
};

/**
 * Handles changes for certain localStorage event
 * @param Object evt
 **/
Notifier.prototype.handleLsEvent = function(evt)
{
	switch (evt.event)
	{
		case 'audiostate':
			this.handleAudioStateEvent(evt);
			break;
	}
};

/**
 * Saves data in localStorage and triggers localStorage event (key change)
 * @param String event
 * @param Object data
 * @return bool
 **/
Notifier.prototype.notify = function(event, data)
{
	if (!this.isAvailable())
		return false;

	var evt = {
		'notifier_id': this.getNotifierId(),
		'event': event,
		'event_data': data,
		'event_ts': Math.round(new Date().getTime() / 1000)
	};

	try {
		window.localStorage.setItem(this.m_localStorageKey, JSON.stringify(evt));
	}
	catch (e) {
		console.error(e);
		return false;
	}

	return true;
};

/** Custom Events **/

/**
 * Handles audiostate event
 * @param Object evt
 * @return void
 **/
Notifier.prototype.handleAudioStateEvent = function(evt)
{
	if (evt.notifier_id != this.getNotifierId())
	{

		if (evt.event_data.state == 'play')
		{
			// Another player switched to state 'play', pause current
			player.pause();
		}
	}
};
document.body.addEventListener('scroll', e => {
	if (document.body.scrollTop >= 240)
		document.querySelector('body > .card').classList.add('scrolled')
	else
		document.querySelector('body > .card').classList.remove('scrolled')
})

function getTimeZoneOffset(date, timeZone) {

  // Abuse the Intl API to get a local ISO 8601 string for a given time zone.
  let iso = date.toLocaleString('en-CA', { timeZone, hour12: false }).replace(', ', 'T');
  
  // Include the milliseconds from the original timestamp
  iso += '.' + date.getMilliseconds().toString().padStart(3, '0');
  
  // Lie to the Date object constructor that it's a UTC time.
  const lie = new Date(iso + 'Z');

  // Return the difference in timestamps, as minutes
  // Positive values are West of GMT, opposite of ISO 8601
  // this matches the output of `Date.getTimeZoneOffset`
  return -(lie - date) / 60 / 1000;
}

// Years of age :pog:
document.querySelector('#age').innerText = new Date(new Date(Date.now()) - new Date('8 june 2004')).getUTCFullYear() - 1970

// Hours ahead/behind
Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

const offset = getTimeZoneOffset(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone) / 60 - 5 + (new Date().isDstObserved() ? 0 : 1);

document.querySelector('#hour').innerText = Math.abs(offset)
document.querySelector('#offsetSuffix').innerText = offset >= 0 ? 'ahead' : 'behind'

const code = window.location.search.slice(1);
// const code = 'mee6'

const ssi = {
	'qsp': {
		quikFax: [
			'QS Engineer',
			'Sometimes shows off their work in #creators-corner > #General discussion',
			'Always happy to give constructive feedback'
		]
	},
	'mee6': {
		inactive: 2
	},
	'mh100': {
		inactive: 1
	}
}

if (Object.keys(ssi).indexOf(code) !== -1) {
	const obj = ssi[code];
		document.querySelector('.ssiNotice').classList.remove('none');
	document.querySelector('.ssiNotice span').textContent = `Content specific to this server (${code.toUpperCase()})`;
	
	if (obj.quikFax) {
		obj.quikFax.forEach(fact => {
			const elem = document.createElement('li')
			elem.innerText = fact
			document.querySelector('#quikFax').append(elem);
		})
	}
	
	if (obj.inactive) {
		document.querySelector(`.inactive${obj.inactive}`).classList.remove('none');
	}
}

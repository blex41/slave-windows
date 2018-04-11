document.getElementById('open-btn').addEventListener('click', openSlaves);
document.getElementById('close-btn').addEventListener('click', closeAllSlaves);
addEventListener('beforeunload', precloseAllSlaves);

preserveSlaves();

/*
 * On page load, we check if slaves are waiting to be closed
 * and revive them (to avoid closing them on master page refresh)
 */
function preserveSlaves() {
	var slaves = getSlaves();
	setSlaves(slaves.map(function(s) {
		return {
			id: s.id,
			status: slaveShouldBeClosed(s.id) ? 'open' : s.status
		}
	}));
}

function openSlaves() {
	var slaves = ['./page_a.html', './page_b.html'];
	slaves.forEach(function(s, i) {
		open(s);
	});
}

function precloseAllSlaves() {
	closeAllSlaves(true);
}

function closeAllSlaves(withDelay) {
	var slaves = getSlaves();
	setSlaves(slaves.map(function(s) {
		return {
			id: s.id,
			status: withDelay === true ? 'willBeClosed' : 'shouldBeClosed'
		}
	}));
}
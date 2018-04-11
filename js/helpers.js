/*
 * Registers the current window as a slave, and returns a unique id
 */
function addSlave() {
	// Get existing slave list from localStorage
	var slaves = getSlaves();
	// Find an unused numerical id
	var id = 0;
	while (typeof getSlaveById(id) !== 'undefined') { id++; }
	// Create the slave object
	var slave = { id: id, status: 'open' };
	// Add this slave to the list
	slaves.push(slave);
	// Save that list in localStorage
	setSlaves(slaves);

	return slave;
}

/*
 * Saves modifications to a slave
 */
function saveSlave(slave) {
	setSlaves(
		getSlaves().filter(function(s, i) {
			return s.id !== slave.id;
		}).concat(slave)
	);
}

/*
 * Removes a slave
 */
function deleteSlave(id) {
	setSlaves(
		getSlaves().filter(function(s, i) {
			return s.id !== id;
		})
	);
}

/*
 * Returns a slave given its Id
 */
function getSlaveById(id) {
	return getSlaves().find(function(slave) {
		return slave.id === id;
	});
}

/*
 * Returns whether or not the window with :id should be closed
 */
function slaveShouldBeClosed(id) {
	var slave = getSlaveById(id);
	return slave === null || ['shouldBeClosed', 'willBeClosed'].indexOf(slave.status) > -1;
}

/*
 * Returns the array of slave windows in localStorage
 */
function getSlaves() {
	if (typeof localStorage === 'undefined') {
		console.warn("localStorage is not available.");
		return [];
	}
	var slaveWindows = localStorage.getItem('slaveWindows');
	return slaveWindows ? JSON.parse(slaveWindows) : [];
}

/*
 * Saves an array of slave windows into localStorage
 */
function setSlaves(newValue) {
	if (typeof localStorage === 'undefined') {
		console.warn("localStorage is not available.");
		return false;
	}
	localStorage.setItem('slaveWindows', JSON.stringify(newValue));
}
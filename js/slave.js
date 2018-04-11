var slave = addSlave(),
	checkDelay = 200;

addEventListener('beforeunload', function(){
	deleteSlave(slave.id);
});

(function checkSlaveStatus(){
	var s = getSlaveById(slave.id);
	switch(s.status) {
		case 'open':
			// Do nothing
			break;
		case 'willBeClosed':
			// Prepare to close
			saveSlave({
				id: s.id,
				status: 'shouldBeClosed'
			});
			break;
		case 'shouldBeClosed':
			// Close slave
			close();
			break;
	}
	setTimeout(checkSlaveStatus, checkDelay);
})();
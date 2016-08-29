var instanceCounter = 0;


// Is invoked at regular intervals regardless of whether a new job arrived or not.
// The interval can be modified with s.setTimerInterval().
function timerFired( s : Switch )
{

	var delay = s.getPropertyValue('Interval');
	var unit = s.getPropertyValue('Unit');
	var triggerTime; // Default seconds


	// Determine trigger time
	switch(unit) {
        case 'Seconds':
            triggerTime = delay;
            break;
        case 'Minutes':
            triggerTime = 60 * delay;
            break;
        case 'Hours':
            triggerTime = 3600 * delay;
            break;
        case 'Days':
            triggerTime = 86400 * delay;
            break;
    }

	// Set the timer
	s.setTimerInterval( triggerTime );

	if (s.getTimerInterval() == 0){
        s.setTimerInterval(60);
    }

	s.log(-1, 'Interval is ' + s.getTimerInterval() + ' seconds.');
	s.log(-1, 'instanceCounter is ' + instanceCounter + '.');

	// Skip first trigger
	if(instanceCounter !== 0){
		// Make dummy job
		var job = s.createNewJob();
		var dummyFilePath = job.createPathWithName("dummy.txt", false);

		var dummyFile = new File(dummyFilePath);
		dummyFile.open(File.WriteOnly);
		dummyFile.write("Created with Dummy Job Clock.");
		dummyFile.close();

		job.sendToSingle(dummyFilePath);
	}

	instanceCounter = (instanceCounter+1);

}

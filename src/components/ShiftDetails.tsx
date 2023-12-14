import React from 'react';

export default function ShiftDetails() {
	return (
		<div className=" bg-base-300 shadow-base-content rounded-xl drop-shadow-md filter">
			<form className="p-2">
				<div className="mb-2">
					<label className="mr-2">Day of the week: </label>
					<input type="text" name="dayOfWeek" />
				</div>
				<div className="mb-2">
					<label className="mr-2">Starting Time:</label>
					<input type="text" name="startTime" />
				</div>
				<div className="mb-2">
					<label className="mr-2">Finish Time:</label>
					<input type="text" name="finishTime" />
				</div>
				<div className="mb-2">
					<label className="mr-2">Public Holiday </label>
					<input type="checkbox" name="publicHoliday" />
				</div>
			</form>
		</div>
	);
}

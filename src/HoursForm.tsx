import React from 'react';

export default function HoursForm() {
	return (
		<div className="flex-auto bg-blue-400 p-4">
			<h1 className="text-3xl font-bold">Work Hours</h1>
			<form className="p-2">
				<div className="mb-2">
					<label className="mr-2">Starting Time:</label>
					<input type="text" name="startTime" />
				</div>
				<div className="mb-2">
					<label className="mr-2">Finish Time:</label>
					<input type="text" name="finishTime" />
				</div>
				<div>
					<label className="mr-2">Day of the week: </label>
					<input type="text" name="dayOfWeek" />
				</div>
				<div>
					<label className="mr-2">Public Holiday </label>
					<input type="checkbox" name="publicHoliday" />
				</div>
			</form>
		</div>
	);
}

import React from 'react';

export default function ShiftDetails() {
	return (
		<div className=" bg-base-300 shadow-base-content rounded-xl drop-shadow-md filter">
			<form className="p-2">
				<label className="form-control w-full max-w-xs pb-2">
					<div className="label">
						<span className="label-text font-medium">Day of the Week</span>
					</div>
					<select className="select bg-primary-300 rounded-lg font-mono">
						<option selected>Monday</option>
						<option>Tuesday</option>
						<option>Wednesday</option>
						<option>Thursday</option>
						<option>Friday</option>
						<option>Saturday</option>
						<option>Sunday</option>
					</select>
				</label>
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

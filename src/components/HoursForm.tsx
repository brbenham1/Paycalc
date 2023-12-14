import React, { useState } from 'react';
import ShiftDetails from './ShiftDetails';

type ShiftDetails = {
	startTime: string;
	endTime: string;
	dayOfTheWeek: string;
	publicHoliday: boolean;
};

export default function HoursForm() {
	const [days, setDays] = useState<ShiftDetails[]>([]);

	function addShift() {
		setDays(
			// Replace the state
			[
				// with a new array
				...days, // that contains all the old items
				{
					startTime: '',
					endTime: '',
					dayOfTheWeek: '',
					publicHoliday: false
				} // and one new item at the end
			]
		);
	}

	return (
		<div className="bg-base-100 flex flex-1 flex-col justify-between p-4">
			<div className="flex justify-between pb-4">
				<h1 className="text-3xl font-bold">Work Hours</h1>
				<button
					className="btn btn-primary self-center rounded-lg"
					onClick={addShift}
				>
					+ Add Shift
				</button>
			</div>
			<div className="flex flex-wrap justify-center gap-4">
				{days.map((day) => (
					<ShiftDetails />
				))}
			</div>
		</div>
	);
}

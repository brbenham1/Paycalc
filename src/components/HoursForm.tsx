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
		<div className="flex flex-1 flex-col bg-blue-400 p-4">
			<h1 className="text-3xl font-bold">Work Hours</h1>

			<div className="grid grid-cols-1 gap-2">
				{days.map((day) => (
					<ShiftDetails />
				))}
			</div>

			<div>
				<button
					onClick={addShift}
					className="rounded-2xl bg-white p-2 shadow-md hover:bg-red-400"
				>
					Add Shift
				</button>
			</div>
		</div>
	);
}

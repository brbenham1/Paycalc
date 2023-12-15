import React, { useState } from 'react';
import ShiftDetails from './ShiftDetails';
import { ShiftInformation, useShiftData } from '../context/ShiftContext';

export default function HoursForm() {
	const { shiftData: shifts, updateShiftData: setShifts } = useShiftData();

	function addShift() {
		setShifts(
			// Replace the state
			[
				// with a new array
				...shifts, // that contains all the old items
				{
					startTime: '',
					endTime: '',
					dayOfTheWeek: '',
					publicHoliday: false
				} // and one new item at the end
			]
		);
	}

	const removeShift = (indexToRemove: number) => {
		const updatedShifts = shifts.filter((_, index) => index !== indexToRemove);
		setShifts(updatedShifts);
	};

	const updateShift = (
		indexToUpdate: number,
		updatedShift: ShiftInformation
	) => {
		const updatedShifts = shifts.map((shift, index) =>
			index === indexToUpdate ? { ...shift, ...updatedShift } : shift
		);
		setShifts(updatedShifts);
	};

	return (
		<div className="flex h-screen flex-1 flex-col overflow-y-scroll bg-base-100 p-4">
			<div className="flex justify-between pb-4">
				<h1 className="text-3xl font-bold">Work Hours</h1>
				<button
					className="btn btn-primary self-center rounded-lg"
					onClick={addShift}
				>
					+ Add Shift
				</button>
			</div>
			<div className="flex flex-col items-center gap-4">
				{shifts.map((shift, index) => (
					<ShiftDetails
						shiftData={shift}
						key={index}
						onUpdate={(updatedShift) => updateShift(index, updatedShift)}
						onRemove={() => removeShift(index)}
					/>
				))}
			</div>
		</div>
	);
}

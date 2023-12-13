import { useState } from 'react';
import ShiftDetails from '../ShiftDetails/ShiftDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export type ShiftInformation = {
	startTime: string;
	endTime: string;
	dayOfTheWeek: string;
	publicHoliday: boolean;
};

export default function HoursForm() {
	const [shifts, setShifts] = useState<ShiftInformation[]>([
		{
			startTime: '',
			endTime: '',
			dayOfTheWeek: '',
			publicHoliday: false
		}
	]);

	function addShift() {
		setShifts([
			...shifts,
			{
				startTime: '',
				endTime: '',
				dayOfTheWeek: '',
				publicHoliday: false
			}
		]);
	}

	const updateShift = (indexToUpdate: number, updatedShift: ShiftInformation) => {
		setShifts((currentDays) =>
			currentDays.map((shift, index) =>
				index === indexToUpdate ? { ...shift, ...updatedShift } : shift
			)
		);
	};

	const removeShift = (indexToRemove: number) => {
		setShifts((currentDays) => currentDays.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div className="flex h-screen flex-1 flex-col items-center overflow-auto bg-gray-50 p-4">
			<div className="w-96">
				<div className="flex w-full justify-between">
					<h1 className="mb-4 text-3xl font-semibold">Work Hours</h1>
					<div>
						<button onClick={addShift} className="btn btn-primary btn-md">
							<FontAwesomeIcon icon={faPlus} />
							Add Shift
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 justify-items-center gap-4 py-2">
					{shifts.map((shift, index) => (
						<ShiftDetails
							key={index}
							shiftData={shift}
							onRemove={() => removeShift(index)}
							onUpdate={(updatedShift) => updateShift(index, updatedShift)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

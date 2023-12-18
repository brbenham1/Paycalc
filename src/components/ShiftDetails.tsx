import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShiftInformation } from '../context/ShiftContext';

const daysOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

type ShiftDetailsProps = {
	shiftData: ShiftInformation;
	onUpdate: (updatedShift: ShiftInformation) => void;
	onRemove: () => void;
};

export default function ShiftDetails({
	shiftData,
	onUpdate,
	onRemove
}: ShiftDetailsProps) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: keyof ShiftInformation
	) => {
		const updatedValue =
			field === 'publicHoliday' ? event.target.checked : event.target.value;
		onUpdate({ ...shiftData, [field]: updatedValue });
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
		field: keyof ShiftInformation
	) => {
		// Assuming all values are simply strings, including 'publicHoliday'.
		const updatedValue = event.target.value;

		// Update the shiftData with the new value for the specified field.
		onUpdate({ ...shiftData, [field]: updatedValue });
	};

	const confirmRemove = () => {
		// if the values are not empty, ask for confirmation
		if (shiftData.dayOfTheWeek || shiftData.startTime || shiftData.endTime) {
			if (!window.confirm('Are you sure you want to remove this shift?')) {
				return;
			}
		}
		onRemove();
	};

	return (
		<div className=" relative rounded-xl bg-base-300 shadow-base-content drop-shadow-md filter">
			<button
				className="btn btn-circle btn-ghost btn-sm absolute right-1 top-1"
				onClick={confirmRemove}
			>
				<FontAwesomeIcon icon={faXmark} className="fa-lg" />
			</button>
			<form className="p-2">
				<label className="form-control w-full max-w-xs pb-2">
					<div className="label">
						<span className="label-text font-medium">Shift Start</span>
					</div>
					<select
						onChange={(e) => handleSelectChange(e, 'dayOfTheWeek')}
						className="bg-primary-300 select select-bordered rounded-lg font-mono"
					>
						{daysOfWeek.map((day) => {
							return <option selected>{day}</option>;
						})}
					</select>
				</label>

				<div className="mb-2 grid grid-cols-2 gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text font-semibold">Start Time</span>
						</div>
						<input
							type="time"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs rounded-lg"
							value={shiftData.startTime}
							onChange={(e) => handleInputChange(e, 'startTime')}
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text font-semibold">End Time</span>
						</div>
						<input
							type="time"
							className="input input-bordered w-full max-w-xs rounded-lg"
							value={shiftData.endTime}
							onChange={(e) => handleInputChange(e, 'endTime')}
						/>
					</label>
				</div>
				<p className="divider-primary-100 divider label-text font-medium">
					Options
				</p>
				<div className="mb-2 flex items-center justify-between">
					<label className="label-text mr-2 font-semibold">
						Public Holiday{' '}
					</label>
					<input
						className="checkbox-primary checkbox checkbox-sm"
						type="checkbox"
						name="publicHoliday"
						checked={shiftData.publicHoliday}
						onChange={(e) => handleInputChange(e, 'publicHoliday')}
					/>
				</div>
			</form>
		</div>
	);
}

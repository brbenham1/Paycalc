import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChampagneGlasses, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShiftInformation } from '../HoursForm/HoursForm';
import { DaysOfWeek, DaysOfWeekArray } from '../../types/constants';
import AutoComplete from '../AutoComplete/AutoComplete';
import { useEffect, useState } from 'react';

type ShiftDetailsProps = {
	onRemove: () => void;
	onUpdate: (updatedShift: ShiftInformation) => void;
	shiftData: ShiftInformation;
};

export default function ShiftDetails({ onRemove, onUpdate, shiftData }: ShiftDetailsProps) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: keyof ShiftInformation
	) => {
		const updatedValue = field === 'publicHoliday' ? event.target.checked : event.target.value;
		onUpdate({ ...shiftData, [field]: updatedValue });
	};

	const [dayDropdownItems, setDayDropdownItems] = useState<DaysOfWeek[]>([]);

	const handleAutoCompleteChange = (value: string) => {
		onUpdate({ ...shiftData, dayOfTheWeek: value });
	};

	useEffect(() => {
		if (!shiftData.dayOfTheWeek) {
			setDayDropdownItems(DaysOfWeekArray);
			return;
		}

		const filteredCountries = DaysOfWeekArray.filter((country) =>
			country.toLowerCase().includes(shiftData.dayOfTheWeek.toLowerCase())
		);

		// if the filtered list only has one item don't show the dropdown
		if (filteredCountries.length === 1 && filteredCountries[0] === shiftData.dayOfTheWeek) {
			setDayDropdownItems([]);
			return;
		}

		setDayDropdownItems(filteredCountries);
	}, [shiftData]);

	return (
		<div className="relative rounded-xl bg-gray-200">
			<button className="btn btn-circle btn-ghost btn-sm absolute right-1 top-1" onClick={onRemove}>
				<FontAwesomeIcon icon={faXmark} className="fa-lg" />
			</button>
			<form className="p-2">
				<label className="form-control max-w-md">
					<div className="label">
						<div className="grid grid-flow-col items-center gap-2">
							<span className="label-text">Day of the Week</span>
							<FontAwesomeIcon icon={faCalendar} />
						</div>
					</div>
					<AutoComplete
						value={shiftData.dayOfTheWeek}
						onChange={handleAutoCompleteChange}
						items={dayDropdownItems}
					/>
				</label>
				<div className="grid grid-flow-col gap-4">
					<label className="form-control">
						<div className="label">
							<span className="label-text">Start Time</span>
						</div>
						<input
							type="time"
							className="input input-bordered w-40"
							value={shiftData.startTime}
							onChange={(e) => handleInputChange(e, 'startTime')}
						/>
					</label>
					<label className="form-control">
						<div className="label">
							<span className="label-text">End Time</span>
						</div>
						<input
							type="time"
							className="input input-bordered w-40"
							value={shiftData.endTime}
							onChange={(e) => handleInputChange(e, 'endTime')}
						/>
					</label>
				</div>
				<div className="divider">Options</div>
				<div className="form-control mb-2">
					<label className="label-inline label">
						<div className="grid grid-flow-col items-center gap-2">
							<span className="label-text">Public Holiday</span>
							<FontAwesomeIcon icon={faChampagneGlasses} />
						</div>
						<input
							type="checkbox"
							className="checkbox-primary checkbox"
							checked={shiftData.publicHoliday}
							onChange={(e) => handleInputChange(e, 'publicHoliday')}
						/>
					</label>
				</div>
			</form>
		</div>
	);
}

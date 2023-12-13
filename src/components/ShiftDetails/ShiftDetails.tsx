import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faChampagneGlasses, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShiftInformation } from '../HoursForm/HoursForm';

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
					<input
						type="text"
						placeholder="Monday"
						className="input input-bordered max-w-md"
						value={shiftData.dayOfTheWeek}
						onChange={(e) => handleInputChange(e, 'dayOfTheWeek')}
					/>
				</label>
				<div className="grid grid-flow-col gap-4">
					<label className="form-control max-w-xs">
						<div className="label">
							<div className="grid grid-flow-col items-center gap-2">
								<span className="label-text">Start Time</span>
								<FontAwesomeIcon icon={faClock} />
							</div>
						</div>
						<input
							type="text"
							placeholder="12pm"
							className="input input-bordered max-w-xs"
							value={shiftData.startTime}
							onChange={(e) => handleInputChange(e, 'startTime')}
						/>
					</label>
					<label className="form-control max-w-xs">
						<div className="label">
							<div className="grid grid-flow-col items-center gap-2">
								<span className="label-text">End Time</span>
								<FontAwesomeIcon icon={faClock} />
							</div>
						</div>
						<input
							type="text"
							placeholder="7pm"
							className="input input-bordered max-w-xs"
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

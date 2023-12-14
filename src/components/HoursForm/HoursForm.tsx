import ShiftDetails from '../ShiftDetails/ShiftDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ShiftInformation, useShiftData } from '../../contexts/ShiftContext';

export default function HoursForm() {
	const { shiftData: shifts, updateShiftData: setShifts } = useShiftData();

	function addShift() {
		setShifts([...shifts, { startTime: '', endTime: '', dayOfTheWeek: '', publicHoliday: false }]);
	}

	const updateShift = (indexToUpdate: number, updatedShift: ShiftInformation) => {
		const updatedShifts = shifts.map((shift, index) =>
			index === indexToUpdate ? { ...shift, ...updatedShift } : shift
		);
		setShifts(updatedShifts);
	};

	const removeShift = (indexToRemove: number) => {
		const updatedShifts = shifts.filter((_, index) => index !== indexToRemove);
		setShifts(updatedShifts);
	};

	return (
		<div className="flex h-screen flex-1 flex-col items-center overflow-auto bg-gray-50 p-4">
			<div className="w-96">
				<div className="flex w-full justify-between">
					<h1 className="mb-4 text-4xl font-semibold">Work Hours</h1>
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
							index={index}
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

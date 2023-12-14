import { useShiftData } from '../../contexts/ShiftContext';

export default function SummaryOutput() {
	const { shiftData } = useShiftData();

	// filter out the shifts that don't have all the required data
	const filteredShiftData = shiftData.filter((shift) => {
		if (shift.dayOfTheWeek && shift.startTime && shift.endTime) {
			return true;
		}
		return false;
	});

	const timeStringToDate = (time: string) => {
		const [h, m] = time.split(':');
		const ms = new Date().setHours(parseInt(h), parseInt(m));
		return new Date(ms);
	};

	const duration = (startTime: string, endTime: string) => {
		const start = timeStringToDate(startTime);
		const end = timeStringToDate(endTime);
		const diff = end.getTime() - start.getTime();
		const minutes = Math.floor(diff / 1000 / 60);
		const hours = Math.floor(minutes / 60);

		// if the shift is less than an hour, return the minutes
		if (hours === 0) {
			return `${minutes}m`;
		}

		// if the minutes are divisible by 60, return the hours
		if (minutes % 60 === 0) {
			return `${hours}hr`;
		}

		return `${hours}hr${minutes % 60}m`;
	};

	return (
		<div className="flex h-screen w-2/5 flex-col justify-between bg-base-100 p-4 shadow-md">
			<div className="grid grid-flow-row gap-4">
				{filteredShiftData.map((shift, index) => (
					<div key={index} className="flex flex-col rounded-lg bg-base-200 p-4">
						<div className="flex flex-row items-center justify-between">
							<h1 className="text-3xl">{shift.dayOfTheWeek}</h1>
							<h1>{duration(shift.startTime, shift.endTime)}</h1>
						</div>
						{shift.publicHoliday && <div className="badge badge-primary mt-2">Public Holiday</div>}
					</div>
				))}
			</div>
			<div className="mt-4 flex justify-between">
				<h1 className="text-3xl">Total</h1>
				<div className="flex">
					<h2 className="text-3xl">{filteredShiftData.length}</h2>
				</div>
			</div>
		</div>
	);
}

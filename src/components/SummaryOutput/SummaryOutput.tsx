import { useShiftData } from '../../contexts/ShiftContext';
import {
	calculateTotalHoursAndMinutes,
	calculateTotalPay,
	getDerivedShiftInfo,
	getDurationString
} from '../../utils/payCalculation';

export default function SummaryOutput() {
	const { shiftData } = useShiftData();

	// filter out the shifts that don't have all the required data
	const filteredShiftData = shiftData.filter((shift) => {
		if (shift.dayOfTheWeek && shift.startTime && shift.endTime) {
			return true;
		}
		return false;
	});

	const derivedShiftData = filteredShiftData.map((shift) => {
		return getDerivedShiftInfo(shift);
	});

	const { hours: totalHours, minutes: totalMinutes } =
		calculateTotalHoursAndMinutes(filteredShiftData);
	const totalPay = calculateTotalPay(filteredShiftData);

	return (
		<div className="flex h-screen w-2/5 flex-col bg-base-100 p-4 shadow-md">
			<h1 className="mb-2 text-4xl font-semibold">Pay Summary</h1>
			<div className="flex h-full flex-col justify-between p-2">
				<div className="grid grid-flow-row gap-4">
					{derivedShiftData.map((shift, index) => (
						<div key={index} className="flex flex-col rounded-lg bg-base-200 p-4">
							<div className="flex flex-row items-center justify-between">
								<div>
									<h1 className="text-3xl">{shift.dayOfTheWeek}</h1>
									<div className="grid grid-flow-col gap-4">
										<h2 className="font-mono text-lg">
											{shift.startTime} - {shift.endTime}
										</h2>
										{shift.breaks.length > 0 ? (
											<h2 className="text-lg">
												({shift.breaks.length} break{shift.breaks.length > 1 ? 's' : null})
											</h2>
										) : null}
									</div>
								</div>
								<div className="flex flex-col items-end">
									<h1 className="font-mono text-xl">{shift.duration}</h1>
									<h1 className="font-mono text-xl">${shift.earnings.toFixed(2)}</h1>
								</div>
							</div>
							{shift.publicHoliday && (
								<div className="badge badge-primary mt-2">Public Holiday</div>
							)}
						</div>
					))}
				</div>
				<div className="mt-4 flex justify-between">
					<h1 className="text-3xl">Total</h1>
					<div className="flex">
						<h2 className="font-mono text-3xl">{getDurationString(totalHours, totalMinutes)}</h2>
						<h2 className="ml-4 font-mono text-3xl">${totalPay.toFixed(2)}</h2>
					</div>
				</div>
			</div>
		</div>
	);
}

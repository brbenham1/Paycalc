import React from 'react';
import { ShiftInformation, useShiftData } from '../context/ShiftContext';
import ShiftDetails from './ShiftDetails';
import { getDerivedShiftInfo } from '../utils/payCalculation';

export default function SummaryOutput() {
	const { shiftData, updateShiftData } = useShiftData();

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

	const totalPay = derivedShiftData
		.map((shift) => shift.earnings)
		.reduce((total, currentEarnings) => {
			return total + currentEarnings;
		}, 0);

	// const add = () => {};
	return (
		<div className="flex w-2/5 flex-col justify-between bg-base-100 p-4">
			<div>
				<h1 className="pb-4 text-3xl font-bold">Summary</h1>
				<div className="grid grid-flow-row gap-2">
					{derivedShiftData.map((data) => {
						return (
							<div className="rounded-xl bg-base-300 p-2">
								<div className="grid grid-flow-col">
									<h1 className="label-text text-xl ">{data.dayOfTheWeek}</h1>
									<p className="grid justify-end"> {data.totalDuration} </p>
								</div>

								<div className="grid grid-flow-col">
									<div>
										<p className="label-text grid justify-start font-mono">
											{data.startTime} - {data.endTime}
										</p>
										<p className="label-text grid justify-start font-mono">
											Breaks: {data.breaks.length}
										</p>
									</div>
									<p className="label-text grid justify-end font-mono font-semibold">
										${data.earnings.toFixed(2)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl">Total: </h1>
				<p className="text-2xl">${totalPay.toFixed(2)}</p>
			</div>
		</div>
	);
}

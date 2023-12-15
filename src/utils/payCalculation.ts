import { ShiftInformation } from '../context/ShiftContext';

const BASE_RATE = parseFloat(import.meta.env.VITE_BASE_RATE);
const SATURDAY_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const SUNDAY_RATE = parseFloat(import.meta.env.VITE_SUNDAY_RATE);
const NIGHT_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);

type DerivedShiftInfo = ShiftInformation & {
	duration: string;
	earnings: number;
	breaks: number[];
};

interface TimeDifference {
	hours: number;
	minutes: number;
}

export function getDerivedShiftInfo(shift: ShiftInformation): DerivedShiftInfo {
	const { hours, minutes } = getHoursAndMinutesBetween(
		shift.startTime,
		shift.endTime
	);
	const earnings = shiftToPay(shift);
	const duration = getDurationString(hours, minutes);
	const breaks = [];
	if (hours > 5) {
		breaks.push(30);
	}
	return { ...shift, duration, earnings, breaks };
}

export const getRate = (shift: ShiftInformation): number => {
	const day = shift.dayOfTheWeek;
	if (day === 'Sunday') {
		return SUNDAY_RATE;
	}
	if (day === 'Saturday') {
		return SATURDAY_RATE;
	}
	if (shift.publicHoliday) {
		return BASE_RATE * 2;
	}

	return BASE_RATE;
};

export function shiftToPay(shift: ShiftInformation): number {
	const { hours, minutes } = getHoursAndMinutesBetween(
		shift.startTime,
		shift.endTime
	);

	const start = timeStringToDate(shift.startTime);
	const end = timeStringToDate(shift.endTime);

	const rate = getRate(shift);

	return hours * rate + (minutes / 60) * rate;
}

export const timeStringToDate = (time: string): Date => {
	const [h, m] = time.split(':').map(Number);
	if (isNaN(h) || isNaN(m)) {
		throw new Error('Invalid time format');
	}
	return new Date(2000, 0, 1, h, m);
};

export const getHoursAndMinutesBetween = (
	startTime: string,
	endTime: string
): TimeDifference => {
	const start = timeStringToDate(startTime);
	const end = timeStringToDate(endTime);

	if (end <= start) {
		end.setDate(end.getDate() + 1);
	}

	const diff = end.getTime() - start.getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	return { hours, minutes };
};

export const calculateTotalPay = (shifts: ShiftInformation[]): number => {
	return shifts.reduce((acc, shift) => acc + shiftToPay(shift), 0);
};

export const getDurationString = (hours: number, minutes: number): string => {
	return `${hours ? `${hours}hr` : ''}${minutes ? `${minutes}m` : ''}`;
};

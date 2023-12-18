import { ShiftInformation } from '../context/ShiftContext';

const BASE_RATE = parseFloat(import.meta.env.VITE_BASE_RATE);
const SATURDAY_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const SUNDAY_RATE = parseFloat(import.meta.env.VITE_SUNDAY_RATE);
const NIGHT_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const OVERTIME_RATE = parseFloat(import.meta.env.VITE_OVERTIME_RATE);

type DerivedShiftInfo = ShiftInformation & {
	duration: string;
	earnings: number;
	breaks: number[];
};

interface TimeDifference {
	hours: number;
	minutes: number;
}

const minutesToHours = (minutes: number) => Math.floor(minutes / 60);

export function getDerivedShiftInfo(shift: ShiftInformation): DerivedShiftInfo {
	const minutes = getMinutesBetween(shift.startTime, shift.endTime);

	const earnings = shiftToPay(shift);
	const duration = getDurationString(minutes);
	const hours = minutesToHours(minutes);

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
	const minutes = getMinutesBetween(shift.startTime, shift.endTime);
	const rate = getRate(shift);

	return (minutes / 60) * rate;
}

export const timeStringToDate = (time: string): Date => {
	const [h, m] = time.split(':').map(Number);
	if (isNaN(h) || isNaN(m)) {
		throw new Error('Invalid time format');
	}
	return new Date(2000, 0, 1, h, m);
};

export const getMinutesBetween = (
	startTime: string,
	endTime: string
): number => {
	const start = timeStringToDate(startTime);
	const end = timeStringToDate(endTime);

	// Increment day by 1 if end date is less than start date
	if (end <= start) {
		end.setDate(end.getDate() + 1);
	}

	const diffMilliseconds = end.getTime() - start.getTime();
	return Math.floor(diffMilliseconds / (1000 * 60));
};

export const calculateTotalPay = (shifts: ShiftInformation[]): number => {
	return shifts.reduce((acc, shift) => acc + shiftToPay(shift), 0);
};

export const getDurationString = (inputMinutes: number): string => {
	const hours = minutesToHours(inputMinutes);
	const minutes = inputMinutes % 60;

	return `${hours ? `${hours}hr` : ''}${minutes ? `${minutes}m` : ''}`;
};

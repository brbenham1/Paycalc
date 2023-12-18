import { ShiftInformation } from '../context/ShiftContext';

const BASE_RATE = parseFloat(import.meta.env.VITE_BASE_RATE);
const SATURDAY_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const SUNDAY_RATE = parseFloat(import.meta.env.VITE_SUNDAY_RATE);
const NIGHT_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const OVERTIME_RATE = parseFloat(import.meta.env.VITE_OVERTIME_RATE);
const NIGHT_START = '17:30';

type DerivedShiftInfo = ShiftInformation & {
	dayDuration: string;
	nightDuration: string;
	totalDuration: string;
	earnings: number;
	breaks: number[];
};

const minutesToHours = (minutes: number) => Math.floor(minutes / 60);

export function getDerivedShiftInfo(shift: ShiftInformation): DerivedShiftInfo {
	const minutes = getMinutesBetween(shift.startTime, shift.endTime);

	const breaks = [];
	if (minutes > 5 * 60) {
		breaks.push(30);
	}

	let dayMinutes = getMinutesBetween(shift.startTime, NIGHT_START);
	let nightMinutes = getMinutesBetween(NIGHT_START, shift.endTime);

	const dayDuration = getDurationString(dayMinutes);
	const nightDuration = getDurationString(nightMinutes);
	const totalDuration = getDurationString(minutes);

	const earnings = shiftToPay(shift, breaks);

	return {
		...shift,
		dayDuration,
		nightDuration,
		totalDuration,
		earnings,
		breaks
	};
}

export const getDailyRate = (shift: ShiftInformation): number => {
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

export const getNightlyRate = (shift: ShiftInformation): number => {
	const day = shift.dayOfTheWeek;

	const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	let rate;

	if (weekDays.includes(day)) {
		rate = NIGHT_RATE;
	} else {
		rate = OVERTIME_RATE;
	}

	if (shift.publicHoliday) {
		rate = BASE_RATE * 2;
	}

	return rate;
};

export function shiftToPay(shift: ShiftInformation, breaks: number[]): number {
	const nightDate = timeStringToDate(NIGHT_START);
	const startDate = timeStringToDate(shift.startTime);
	const endDate = timeStringToDate(shift.endTime);

	let dayMinutes = 0;
	let nightMinutes = 0;

	if (nightDate < endDate && nightDate > startDate) {
		// If shift cross over night date
		dayMinutes = getMinutesBetween(shift.startTime, NIGHT_START);
		nightMinutes = getMinutesBetween(NIGHT_START, shift.endTime);
	} else if (nightDate >= endDate && nightDate > startDate) {
		dayMinutes = getMinutesBetween(shift.startTime, shift.endTime);
	} else {
		nightMinutes = getMinutesBetween(NIGHT_START, shift.endTime);
	}

	const totalBreakMinutes = breaks.reduce(
		(total, breakDuration) => total + breakDuration,
		0
	);

	if (dayMinutes + nightMinutes >= 330) {
		if (dayMinutes > 30 && nightMinutes > 30) {
			dayMinutes = dayMinutes - totalBreakMinutes;
		} else {
			nightMinutes = nightMinutes - totalBreakMinutes;
		}
	}

	const dayPay = (dayMinutes / 60) * getDailyRate(shift);
	const nightPay = (nightMinutes / 60) * getNightlyRate(shift);

	return dayPay + nightPay;
}

export const timeStringToDate = (time: string, tomorrow = false): Date => {
	const [h, m] = time.split(':').map(Number);
	if (isNaN(h) || isNaN(m)) {
		throw new Error('Invalid time format');
	}
	const dayNumber = tomorrow ? 2 : 1;
	return new Date(2000, 0, dayNumber, h, m);
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

export const calculateTotalPay = (shifts: DerivedShiftInfo[]): number => {
	return shifts.reduce(
		(acc, shift) => acc + shiftToPay(shift, shift.breaks),
		0
	);
};

export const getDurationString = (inputMinutes: number): string => {
	const hours = minutesToHours(inputMinutes);
	const minutes = inputMinutes % 60;

	return `${hours ? `${hours}hr` : ''}${minutes ? `${minutes}m` : ''}`;
};

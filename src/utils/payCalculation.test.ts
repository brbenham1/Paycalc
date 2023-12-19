import { describe, expect, it } from 'vitest';
import { getDailyRate, getMinutesBetween, shiftToPay } from './payCalculation';
import { ShiftInformation } from '../context/ShiftContext';

const BASE_RATE = parseFloat(import.meta.env.VITE_BASE_RATE);
const SATURDAY_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const SUNDAY_RATE = parseFloat(import.meta.env.VITE_SUNDAY_RATE);
const NIGHT_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);

describe('Pay Calculation Tests', () => {
	it('calculates day pay on a Sunday', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '8:00',
			endTime: '12:00',
			publicHoliday: false,
			dayOfTheWeek: 'Sunday'
		};
		// Act
		const actualPay = shiftToPay(shift, [30]);
		// Assert
		expect(actualPay).toBeCloseTo(SUNDAY_RATE * 4);
	});

	it('calculates hybrid pay on a week day', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '16:30',
			endTime: '18:30',
			publicHoliday: false,
			dayOfTheWeek: 'Monday'
		};
		// Act
		const actualPay = shiftToPay(shift, [30]);
		// Assert
		expect(actualPay).toBeCloseTo(BASE_RATE + NIGHT_RATE);
	});

	it('calculates day pay on a Monday', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Monday'
		};
		// Act
		const actualPay = shiftToPay(shift, [30]);
		// Assert
		expect(actualPay).toBeCloseTo(BASE_RATE * 7.5);
	});

	it('returns correct minutes between', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Monday'
		};
		// Act
		const actualMinutes = getMinutesBetween(shift.startTime, shift.endTime);
		// Assert
		expect(actualMinutes).toBeCloseTo(8 * 60);
	});

	it('calculates day pay on a Tuesday', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Tuesday'
		};
		// Act
		const actualPay = shiftToPay(shift, [30]);
		// Assert
		expect(actualPay).toBeCloseTo(BASE_RATE * 7.5);
	});

	it('finds correct daily rate', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Tuesday'
		};
		// Act
		const actualRate = getDailyRate(shift);
		// Assert
		expect(actualRate).toBeCloseTo(BASE_RATE);
	});

	it('finds correct saturday rate', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Saturday'
		};
		// Act
		const actualRate = getDailyRate(shift);
		// Assert
		expect(actualRate).toBeCloseTo(SATURDAY_RATE);
	});

	it('finds correct sunday rate', () => {
		// Arrange
		const shift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Sunday'
		};
		// Act
		const actualRate = getDailyRate(shift);
		// Assert
		expect(actualRate).toBeCloseTo(SUNDAY_RATE);
	});

	it('calculates day pay for two days', () => {
		// Arrange
		const firstShift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Monday'
		};
		const secondShift: ShiftInformation = {
			startTime: '09:00',
			endTime: '17:00',
			publicHoliday: false,
			dayOfTheWeek: 'Tuesday'
		};
		// Act
		const firstShiftPay = shiftToPay(firstShift, [30]);
		const secondShiftPay = shiftToPay(secondShift, [30]);
		const actualPay = firstShiftPay + secondShiftPay;
		// Assert
		expect(actualPay).toBeCloseTo(BASE_RATE * 15);
	});
});

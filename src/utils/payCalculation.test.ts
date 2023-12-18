import { describe, expect, it } from 'vitest';
import { shiftToPay } from './payCalculation';
import { ShiftInformation } from '../context/ShiftContext';

const BASE_RATE = parseFloat(import.meta.env.VITE_BASE_RATE);
const SATURDAY_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const SUNDAY_RATE = parseFloat(import.meta.env.VITE_SUNDAY_RATE);
const NIGHT_RATE = parseFloat(import.meta.env.VITE_SATURDAY_RATE);
const OVERTIME_RATE = parseFloat(import.meta.env.VITE_OVERTIME_RATE);
const NIGHT_START = '17:30';

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
			dayOfTheWeek: 'Wednesday'
		};
		// Act
		const actualPay = shiftToPay(shift, [30]);
		// Assert
		expect(actualPay).toBeCloseTo(BASE_RATE + NIGHT_RATE);
	});
});

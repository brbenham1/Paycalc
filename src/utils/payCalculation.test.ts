import { describe, expect, it } from 'vitest';
import { shiftToPay } from './payCalculation';
import { ShiftInformation } from '../context/ShiftContext';

describe('Pay Calculation Tests', () => {
	it('calculates day pay on a Sunday', () => {
		const shift: ShiftInformation = {
			startTime: '8:00',
			endTime: '12:00',
			publicHoliday: false,
			dayOfTheWeek: 'Sunday'
		};
		const actualPay = shiftToPay(shift, [30]);
		expect(actualPay).toBeCloseTo(140.48);
	});
});

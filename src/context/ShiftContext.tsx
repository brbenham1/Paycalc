import { createContext, useState, useContext, ReactNode } from 'react';

export type ShiftInformation = {
	startTime: string;
	endTime: string;
	dayOfTheWeek: string;
	publicHoliday: boolean;
};

type ShiftDataContextType = {
	shiftData: ShiftInformation[];
	updateShiftData: (newData: ShiftInformation[]) => void;
};

const ShiftDataContext = createContext<ShiftDataContextType | undefined>(
	undefined
);

export const useShiftData = () => {
	const context = useContext(ShiftDataContext);
	if (context === undefined) {
		throw new Error('useShiftData must be used within a ShiftDataProvider');
	}
	return context;
};

type ShiftDataProviderProps = {
	children: ReactNode;
};

export const ShiftDataProvider = ({ children }: ShiftDataProviderProps) => {
	const [shiftData, setShiftData] = useState<ShiftInformation[]>([
		{
			startTime: '',
			endTime: '',
			dayOfTheWeek: '',
			publicHoliday: false
		}
	]);

	const updateShiftData = (newData: ShiftInformation[]) => {
		setShiftData(newData);
	};

	return (
		<ShiftDataContext.Provider value={{ shiftData, updateShiftData }}>
			{children}
		</ShiftDataContext.Provider>
	);
};

import { ShiftDataProvider } from '../contexts/ShiftContext';
import HoursForm from './HoursForm/HoursForm';
import SummaryOutput from './SummaryOutput/SummaryOutput';

function App() {
	return (
		<ShiftDataProvider>
			<div className="flex w-full bg-green-400">
				<HoursForm />
				<SummaryOutput />
			</div>
		</ShiftDataProvider>
	);
}

export default App;

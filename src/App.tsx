import HoursForm from './components/HoursForm';
import SummaryOutput from './components/SummaryOutput';
import { ShiftDataProvider } from './context/ShiftContext';

function App() {
	return (
		<ShiftDataProvider>
			<div className="flex w-full">
				<HoursForm />
				<SummaryOutput />
			</div>
		</ShiftDataProvider>
	);
}

export default App;

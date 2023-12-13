import { useState } from 'react';
import HoursForm from './components/HoursForm';
import SummaryOutput from './components/SummaryOutput';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex w-full bg-green-400">
			<HoursForm />
			<SummaryOutput />
		</div>
	);
}

export default App;

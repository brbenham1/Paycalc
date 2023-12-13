import { useState } from 'react';
import HoursForm from './HoursForm';
import SummaryOutput from './SummaryOutput';

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

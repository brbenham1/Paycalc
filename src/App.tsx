import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex w-full bg-green-400">
			<div className="flex-auto bg-blue-400 p-4">
				<h1 className="text-3xl font-bold">Work Hours</h1>
				<form className="p-2">
					<div className="mb-2">
						<label className="mr-2">Starting Time:</label>
						<input type="text" name="startTime" />
					</div>
					<div className="mb-2">
						<label className="mr-2">Finish Time:</label>
						<input type="text" name="finishTime" />
					</div>
					<div>
						<label className="mr-2">Day of the week: </label>
						<input type="text" name="dayOfWeek" />
					</div>
					<div>
						<label className="mr-2">Public Holiday </label>
						<input type="checkbox" name="publicHoliday" />
					</div>
				</form>
			</div>

			<div className="w-2/5 bg-red-400 p-4">
				<h1 className="text-3xl font-bold">Summary</h1>
				<p>This is summary area</p>
			</div>
		</div>
	);
}

export default App;

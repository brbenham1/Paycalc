import React from 'react';

export default function SummaryOutput() {
	return (
		<div className="w-2/5 bg-base-200 p-4">
			<h1 className="text-3xl font-bold">Summary</h1>

			<div className="mb-2">
				<p className="mr-2">Monday | 8 hours | $54.21</p>
			</div>
			<div className="mb-2">
				<p className="mr-2">Tuesday | 3 hours | $54.21</p>
			</div>
			<div className="mb-2">
				<p className="mr-2">Wednesday | 0 hours | $0.00</p>
			</div>
			<div className="mb-2">
				<p className="mr-2">Thursday | 0 hours | $0.00</p>
			</div>
			<div className="mb-2">
				<p className="mr-2">Friday | 0 hours | $0.00</p>
			</div>
			<div className="mb-2">
				<p className="mr-2">Saturday | 0 hours | $0.00</p>
			</div>
			<div className="mb-2">
				<p className="mr-2">Sunday | 0 hours | $0.00</p>
			</div>
		</div>
	);
}

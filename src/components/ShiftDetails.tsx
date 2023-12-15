import React from 'react';

export default function ShiftDetails() {
	return (
		<div className=" bg-base-300 shadow-base-content rounded-xl drop-shadow-md filter">
			<form className="p-2">
				<label className="form-control w-full max-w-xs pb-2">
					<div className="label">
						<span className="label-text font-medium">Day of the Week</span>
					</div>
					<select className="select select-bordered bg-primary-300 rounded-lg font-mono">
						<option selected>Monday</option>
						<option>Tuesday</option>
						<option>Wednesday</option>
						<option>Thursday</option>
						<option>Friday</option>
						<option>Saturday</option>
						<option>Sunday</option>
					</select>
				</label>

				<div className="mb-2 grid grid-cols-2 gap-2">
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text font-semibold">Start Time</span>
						</div>
						<input
							type="time"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs rounded-lg"
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text font-semibold">End Time</span>
						</div>
						<input
							type="time"
							className="input input-bordered w-full max-w-xs rounded-lg"
						/>
					</label>
				</div>
				<p className="divider divider-primary-100 label-text font-medium">
					Options
				</p>
				<div className="mb-2 flex items-center justify-between">
					<label className="label-text mr-2 font-semibold">
						Public Holiday{' '}
					</label>
					<input
						className="checkbox checkbox-primary checkbox-sm"
						type="checkbox"
						name="publicHoliday"
					/>
				</div>
			</form>
		</div>
	);
}

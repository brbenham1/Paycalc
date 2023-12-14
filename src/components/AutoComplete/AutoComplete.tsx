import classNames from 'classnames';
import { memo, useRef, useState } from 'react';

type Props = {
	items: string[];
	value: string;
	onChange: (value: string) => void;
};

const AutoComplete = (props: Props) => {
	const { items, value, onChange } = props;
	const ref = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

	// if items is empty, don't open the dropdown
	return (
		<div
			className={classNames({
				'dropdown w-full': true,
				'dropdown-open': open
			})}
			ref={ref}
		>
			<input
				type="text"
				className="input input-bordered w-full"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Select day"
				tabIndex={0}
			/>
			<div
				className="dropdown-content top-14 max-h-96 flex-col overflow-auto rounded-md bg-base-200"
				hidden={items.length === 0}
			>
				<ul className="menu-compact menu " style={{ width: ref.current?.clientWidth }}>
					{items.map((item, index) => {
						return (
							<li
								key={index}
								tabIndex={index + 1}
								onClick={() => {
									onChange(item);
									setOpen(false);
								}}
								className={classNames({
									// add border to all but last item
									'border-b border-b-base-content/10': index !== items.length - 1,
									'bg-base-100': value === item
								})}
							>
								<button
									onClick={(e) => {
										e.preventDefault();
									}}
								>
									{item}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default memo(AutoComplete);

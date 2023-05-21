import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	error?: any;
	register?: any;
	wrapperClass?: string;
	required?: boolean;
	className?: string;
}

const DateInput: FC<InputProps> = ({
		 register,
		 name,
		 error,
		 label,
		 wrapperClass,
		 required,
		 ...rest
	 }) => {


	return (
		<div className={wrapperClass}>
			{label ?
				<label htmlFor={name}>
					{label}
					{required ? <span>required</span> : ""}
				</label> : ""
			}
			<input
				type="date"
				{...register(name)}
				{...rest}
			/>
			{error ? <span role="alert">{error}</span> : ""}
		</div>
	);
};

export default DateInput;
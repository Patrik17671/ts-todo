import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	error?: string;
	register?: any;
	wrapperClass?: string;
	required: boolean;
	className?: string;
}

const Input: FC<InputProps> = ({
				 register,
				 name,
				 error,
				 label,
				 wrapperClass,
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
			<textarea
				{...register(name)}
				{...rest}
			/>
			{error ? <span role="alert">{error}</span> : ""}
		</div>
	);
};

export default Input;
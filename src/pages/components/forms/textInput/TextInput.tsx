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

const TextInput: FC<InputProps> = ({
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
				{...register(name)}
				{...rest}
			/>
			{error ? <span role="alert">{error}</span> : ""}
		</div>
	);
};

export default TextInput;
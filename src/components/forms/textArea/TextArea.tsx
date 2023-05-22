import React, { FC, InputHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	error?: any;
	register?: any;
	wrapperClass?: string;
	required?: boolean;
	className?: string;
}

const Input: FC<InputProps> = ({
				 register,
				 name,
				 error,
				 label,
				 wrapperClass,
					required,
				 ...rest
			 }) => {
	return (
		<div className={styles.areaWrapper  + " " + wrapperClass}>
			{label ?
				<label htmlFor={name}>
					{label}
					{required ? <span className={"required"}>*</span> : ""}
				</label> : ""
			}
			<textarea
				{...register(name)}
				{...rest}
			/>
			{error ? <span className="error">{error}</span> : ""}
		</div>
	);
};

export default Input;
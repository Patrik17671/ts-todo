import React, { FC } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/forms/textInput/TextInput";
import { UseFormRegisterReturn } from "react-hook-form";
import TextArea from "@/components/forms/textArea/TextArea";
import DateInput from "@/components/forms/dateInput/DateInput";
import { useMutation ,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import styles from "./AddTodoForm.module.scss";

export type classNameType = string;

export interface FormProps {
	defaultValues?: any;
	buttonLabel?: string;
	onSubmit?: any;
	handleSubmit?: any;
	register?: UseFormRegisterReturn ;
	className?: classNameType;
}

// validation
const formSchema = yup.object().shape({
	title: yup
		.string()
		.required("Title is required!"),
	text: yup
		.string()
		.required("Text is required!"),
	date: yup
		.string()
		.required("Date is required!"),
});

const AddTodoForm: FC<FormProps> = () => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(formSchema) });

	const queryClient = useQueryClient();

	//Sending new task
	const createTask = async (data: FormProps) => {
		const editedData = {...data, state: true}

		const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/todos`, editedData);
		return response.data;
	};

	//revalidate catched data
	const { mutate } = useMutation(createTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["todos"]);
		},
		onError: () => {
			alert("there was an error")
		},
	});

	const handleOnSubmit = (data: FormProps ) => {
		const task = {
			...data
		}
		mutate(task)
	}

	return (
		<form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form} >
			<TextInput
				name="title"
				type="text"
				label={"Title"}
				placeholder="title"
				error={errors.title?.message}
				autoFocus
				required={true}
				register={register}

			/>
			<TextArea
				name="text"
				placeholder="text"
				label={"Text"}
				error={errors.text?.message}
				required={true}
				register={register}

			/>
			<DateInput
				name="date"
				placeholder="date"
				label={"Deadline"}
				error={errors.date?.message}
				register={register}
				required={true}
			/>
			<button className={styles.button} type="submit">Add todo</button>
		</form>
	);
};

export default AddTodoForm;
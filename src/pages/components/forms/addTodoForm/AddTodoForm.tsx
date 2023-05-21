import React, { FC } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/pages/components/forms/textInput/TextInput";
import { UseFormRegisterReturn } from "react-hook-form";
import TextArea from "@/pages/components/forms/textArea/TextArea";
import DateInput from "@/pages/components/forms/dateInput/DateInput";
import { useMutation ,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

export type classNameType = string;

export interface FormProps {
	defaultValues?: any;
	buttonLabel?: string;
	onSubmit?: any;
	handleSubmit?: any;
	register?: UseFormRegisterReturn ;
	className?: classNameType;
}

interface Task {
	title: string;
	text: string;
	date: string;
};

// validation
const formSchema = yup.object().shape({
	title: yup
		.string()
		.required("Title is required"),
	text: yup
		.string()
		.required("Text is required"),
	date: yup
		.string()
		.required("Date is required"),
});

const AddTodoForm: FC<FormProps> = () => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(formSchema) });

	const queryClient = useQueryClient();

	const createTask = async (data: Task) => {
		const { data: response } = await axios.post('https://6469cb00183682d6144674c8.mockapi.io/api/v1/task', data);
		return response.data;
	};

	const { mutate, isLoading } = useMutation(createTask, {
		onSuccess: data => {
			const message = "success"
			alert(message)
		},
		onError: () => {
			alert("there was an error")
		},
		onSettled: () => {
			queryClient.invalidateQueries('task');
		}
	});

	const handleOnSubmit = (data: Task ) => {
		const task = {
			...data
		}
		mutate(task)
	}

	return (
		<form onSubmit={handleSubmit(handleOnSubmit)} >
			<div className="d-flex justify-content-center fields__email">
				<TextInput
					name="title"
					type="text"
					placeholder="title"
					error={errors.title?.message}
					autoFocus
					register={register}
					{...register("title")}
				/>
				<TextArea
					name="text"
					placeholder="text"
					error={errors.text?.message}
					register={register}
					{...register("text")}
				/>
				<DateInput
					name="date"
					placeholder="date"
					error={errors.date?.message}
					register={register}
					{...register("date")}
				/>
			</div>
			<button type="submit">Add todo</button>
		</form>
	);
};

export default AddTodoForm;
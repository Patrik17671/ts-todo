import React, {FC, useState} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/forms/textInput/TextInput";
import styles from "./Search.module.scss";
import Image from 'next/image';
import searchIcon from "../../../public/icons/search.svg";

interface FormProps {
	setSelectedSearch: SetSelectedSearch;
}

type FormData = {
	search: string;
}

type SetSelectedSearch = (val: string) => void;

// validation
const formSchema = yup.object().shape({
	search: yup
		.string()
		.min(3, 'Minimal lenght is 3 characters!')
});

const Search: FC<FormProps> = ({setSelectedSearch}) => {

	const [search,setSearch ] = useState<string>("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({ resolver: yupResolver(formSchema) });

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length >= 3) {
			setSelectedSearch(e.target.value);
			setSearch(e.target.value);
		} else {
			setSelectedSearch("");
			setSearch("");
		}
	}

	const handleOnSubmit = (data: FormData ) => {
		setSelectedSearch(data.search)
	}

	return (
		<div>
			<form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form} >
				<TextInput
					name="search"
					placeholder="search for something..."
					error={errors.search?.message}
					autoFocus
					required={false}
					register={register}
					onChange={(e) => handleOnChange(e)}
				/>
				<button className={styles.button} type="submit">
					<Image src={searchIcon} height={20} alt={"icon"} />
				</button>
			</form>
			{search ? (
				<span>
					<strong>Results for: {search}</strong>
				</span>
			) : ""}
		</div>
	);
};

export default Search;
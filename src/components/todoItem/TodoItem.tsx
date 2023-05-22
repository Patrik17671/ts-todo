import {TodosType} from "@/types";
import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "@/pages/api/deleteTask";
import {updateTask} from "@/pages/api/updateTask";
import styles from "./TodoItem.module.scss";
import { Switch } from '@headlessui/react'
import {formatDateTime} from "@/utils/functions";

const TodoItem = ({item}: {item: TodosType}) => {

	const {title,text,date,id,state} = item;

	const queryClient = useQueryClient();

	//Delete task
	const { mutateAsync: deleteMutation  } = useMutation(deleteTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["todos"]);
		},
		onError: (error) => {
			console.error(error)
		},
	});
	//Update state of task
	const { mutateAsync: updateMutation  } = useMutation(updateTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["todos"]);
		},
		onError: (error) => {
			console.error(error)
		},
	});

	//Remove task
	const handleRemoveTask = (id: string) => {
		deleteMutation(id);
	}
	//Toggle to active
	const handleToggleTask = () => {
		updateMutation({id: item.id,state: !state})
	}

	return(
		<li className={styles.item}>
			<div>
				<h4>{title}</h4>
				<p>{text}</p>
				<span className={styles.date}><strong>Deadline: </strong>{formatDateTime(date)}</span>
			</div>
			<div className={styles.buttons}>
				<Link className={`${styles.details} abs-link`} href={`/task/${id}`}>Details</Link>
				<span className={styles.delete} onClick={() => handleRemoveTask(id)}>Delete</span>
				<Switch
					onClick={handleToggleTask}
					checked={state}
					className={`${
						state ? styles.done : styles.active
					} ${styles.switch} relative inline-flex h-6 w-11 items-center rounded-full`}
				>
					<span className="sr-only">Active</span>
					<span
						className={`${
							state ? 'translate-x-6' : 'translate-x-1'
						} inline-block h-4 w-4 transform rounded-full bg-white transition`}
					/>
				</Switch>
			</div>
		</li>
	)
}
export default TodoItem;
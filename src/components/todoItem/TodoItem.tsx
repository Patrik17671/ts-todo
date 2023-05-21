import {TodosType} from "@/types";
import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "@/pages/api/deleteTask";
import {updateTask} from "@/pages/api/updateTask";

const TodoItem = ({item}: {item: TodosType}) => {

	const {title,text,date,id,state} = item;

	const queryClient = useQueryClient();

	const { mutateAsync: deleteMutation  } = useMutation(deleteTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["todos"]);
		},
		onError: (error) => {
			console.error(error)
		},
	});
	const { mutateAsync: updateMutation  } = useMutation(updateTask, {
		onSuccess: () => {
			queryClient.invalidateQueries(["todos"]);
		},
		onError: (error) => {
			console.error(error)
		},
	});

	const handleRemoveTask = (id: string) => {
		deleteMutation(id);
	}
	const handleToggleTask = () => {
		updateMutation({id: item.id,state: !state})
	}

	return(
		<li>
			<h4>{title}</h4>
			<p>{text}</p>
			<span>{date}</span>
			<Link href={`/task/${id}`}>Details</Link>
			<span onClick={() => handleRemoveTask(id)}>Delete</span>
			<span onClick={handleToggleTask}>{state ? "Set done" : "Set active"}</span>
		</li>
	)
}
export default TodoItem;
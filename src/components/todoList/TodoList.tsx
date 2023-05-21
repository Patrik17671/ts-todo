import map from "lodash/map";
import TodoItem from "@/components/todoItem/TodoItem";
import {TodosType} from "@/types";

type Item = {
	title: string;
	text: string;
	date: string
	id: string;
	state: boolean;
}
const TodoList = ({todoList}: {todoList: TodosType}) => {

	return(
		<ul>
			{map(todoList, (item: Item,index) => {
				return(
					<TodoItem key={index} item={item}  />
				)
			})}
		</ul>
	)
}
export default TodoList;
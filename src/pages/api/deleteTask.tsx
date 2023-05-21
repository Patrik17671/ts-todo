import axios from "axios";
export const deleteTask = async (taskId: string) => {
	await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/v1/todos/${taskId}`);
};

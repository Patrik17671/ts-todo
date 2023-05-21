import axios from "axios";
export const updateTask = async (updatedData: any) => {
	const { id, ...data } = updatedData;
	await axios.put(`${process.env.NEXT_PUBLIC_API_URL}api/v1/todos/${id}`, data);
};
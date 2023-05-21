import axios from "axios";
export const getTaskData = async (id: string | number) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/todos/${id}`);
	return response.data;
};
import axios from "axios";
export const getTodosData = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/todos`);
	return response.data;
};
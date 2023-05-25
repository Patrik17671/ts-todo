import axios from "axios";

export const getTodosData = async (filter: string , search: string) => {
	const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/v1/todos`;
	try {
		const response = await axios.get(apiUrl, {
			params: {
				filter: filter ? filter : {},
				search: search ? search : {}
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
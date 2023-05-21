import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TodosType} from "@/types";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTaskData} from "@/pages/api/getTaskData";
import { useRouter } from "next/router";

const Page = () => {
	const router = useRouter();
	const pageId = typeof router.query?.id === "string" ? router.query.id : "";

	const { isSuccess, data: task, isLoading } = useQuery(
		["task", pageId],
		() => getTaskData(pageId),
		{
			enabled: pageId.length > 0
		}
	);


	if(isLoading){
		return <h1>loading</h1>
	}

	const {title,date,text,state} = task

	return(
		<div className="container">
			<h1>task {title}</h1>
			<div>
				<p>{text}</p>
				<span>{date}</span>
				{state ? "Active" : "Done"}
			</div>
		</div>
	)
}
export default Page


export const getStaticProps: GetStaticProps = async (context) =>{
	const id = context.params?.id as string;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery<TodosType>({
		queryKey: ['task'], queryFn: () => getTaskData(id)
	});
	return{
		props:{
			dehydrateState: dehydrate(queryClient)
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking"
	};
};

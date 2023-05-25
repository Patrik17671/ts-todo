import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import {TodosType} from "@/types";
import {GetStaticPaths, GetStaticProps} from "next";
import {getTaskData} from "@/pages/api/getTaskData";
import { useRouter } from "next/router";
import styles from "./[id].module.scss";
import Link from "next/link";
import {formatDateTime} from "@/utils/functions";
import Image from 'next/image';
import backIcon from "../../../public/icons/arrow-back.svg";

const Page = () => {
	const router = useRouter();
	const pageId = typeof router.query?.id === "string" ? router.query.id : "";

	const {  data: task, isLoading } = useQuery(
		["task", pageId],
		() => getTaskData(pageId),
		{
			enabled: pageId.length > 0
		}
	);

	if(isLoading){
		return <h1>...loading</h1>
	}

	const {title, date, text, state} = task;

	return(
		<div className="container">
			<Link className={styles.backBtn} href={"/"} >
				<Image src={backIcon} height={14} alt={"icon"} />
				Back to home
			</Link>
			<h1>Task {task?.title}</h1>
			<div className={styles.wrapper}>
				<div className={styles.titleWrap}>
					<h3>{title}</h3>
					{state ? (
						<span className={styles.done}>Done</span>
					) : (
						<span className={styles.active}>Active</span>
					)}
				</div>
				<p>{text}</p>
				<span className={styles.date}><strong>Deadline: </strong>{formatDateTime(date)}</span>
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

//Generating paths on first open
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking"
	};
};

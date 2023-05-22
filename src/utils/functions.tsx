export const formatDateTime = (dateTimeString: string): string => {
	const date = new Date(dateTimeString);
	const formattedDateTime = `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
	return formattedDateTime;
}
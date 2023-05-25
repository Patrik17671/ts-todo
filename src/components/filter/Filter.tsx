import React, {useState} from "react";
import map from "lodash/map";
import styles from "./Filter.module.scss";
import Image from 'next/image';
import backIcon from "../../../public/icons/arrow-back.svg";

type FilterValueType = {
	id: number;
	text: string;
	value: string;
};

type Props = {
	selectedFilter: FilterValueType;
	setSelectedFilter: (val: FilterValueType) => void;
	filterValues: FilterValueType[];
};

const Filter: React.FC<Props> = ({selectedFilter,setSelectedFilter,filterValues}) => {

	const [active, setActive] = useState<boolean>(false);

	return(
		<div className={`${styles.filter} ${active ? styles.active : ""}`} onClick={() => setActive(!active)}>
			<span>
				{selectedFilter?.text}
				<Image src={backIcon} height={14} alt={"icon"} />
			</span>
			<ul>
				{map(filterValues,(filter) => {
					return(
						<li
							key={filter.id}
							value={filter.value}
							onClick={() => setSelectedFilter(filter)}
						>
							{filter.text}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
export default Filter;
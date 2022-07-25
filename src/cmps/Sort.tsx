import { ISort } from "../interfaces/filter.interface";
import clear_filters from '../assets/imgs/clear-filters.png'

interface Props{
    setSortBy:(sortBy:ISort)=>void;
    sortBy:ISort;
}

export const Sort = ({setSortBy,sortBy}:Props) => {
  
    return (
       <div className="sort-wrapper flex">
            <div className="select-container"> 
                <select 
                name="sort"  
                value={sortBy}
                onChange={ ((e: React.ChangeEvent<HTMLSelectElement>)=>setSortBy(e.target.value as ISort))} >
                    <option value="" selected disabled hidden >Sort list</option>
                    <option value="name">Name</option>
                    <option value="creationDate">CreationDate</option>
                </select>
            </div>
            <div className="clear-sort-btn flex place-center" onClick={()=>setSortBy('')}>
                <img src={clear_filters} alt="" />
            </div>
       </div>
    )
}
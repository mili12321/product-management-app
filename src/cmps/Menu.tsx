import { IFilter, ISort } from "../interfaces/filter.interface";
import { Filter } from "./Filter";
import { GenericButton } from "./GenericButton"
import { Sort } from "./Sort";

interface Props{
    setShouldShowForm:(shouldShowForm:boolean)=>void;
    setCurrProduct:(currProduct:{})=>void;
    setFilterBy:(filterBy: IFilter)=>void;
    filterBy:IFilter;
    setSortBy:(sortBy:ISort)=>void;
    sortBy:ISort;
}

export const Menu = ({setShouldShowForm,setCurrProduct,setFilterBy,filterBy,setSortBy,sortBy}:Props) => {
    const onHandleClick = () => {
        setShouldShowForm(true)
        setCurrProduct({name:'', description:'', price:''})
    }
    return (
        <div className='menu flex place-center'>
            <GenericButton name={'add'} handelClick={onHandleClick}/>
            <Filter 
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            /> 
            <Sort 
            setSortBy={setSortBy}
            sortBy={sortBy}
            />
        </div>
    )
}
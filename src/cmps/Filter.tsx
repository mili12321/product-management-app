import { useEffect, useState } from "react";
import { IFilter } from "../interfaces/filter.interface";

interface Props{
    setFilterBy:(filterBy: IFilter)=>void;
    filterBy:IFilter;
}
export const Filter = ({setFilterBy,filterBy}:Props) => {
    const [searchFilter, setSearchFilter] = useState<IFilter>({name:'', description:''})
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name
        const value = e.target.value
        setSearchFilter(((prevState: any) => {
            return {...prevState, ...{[field]: value , description: value}}
        }))
    }

    useEffect(() => {
        setFilterBy(searchFilter)
    }, [searchFilter,setFilterBy])
    

    return (
    <form>
        <div> 
            <input 
            className="input-field" 
            placeholder="Search Product" 
            name="name" 
            autoComplete="off" 
            value={ filterBy.name } 
            onChange={ handleChange } 
            type="text" 
            />
        </div> 
    </form>
    )
}
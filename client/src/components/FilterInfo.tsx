
import '../styles/FilterInfo.css'
import Dropdown from 'react-dropdown'
import React, {useState} from 'react'
interface filterInfoProps {
    categories: Array<Set<string>>
    setFilter: Function
}

export default function FilterInfo(props: filterInfoProps) {

    const category1 = 'Year'
    let options1 = new Array
    const category2 = 'Genre'
    let options2 = new Array
    
    if (props.categories.length != 0) {
        options1 = Array.from(props.categories[0])
        options2 = Array.from(props.categories[1])
    }

return (
    <div className="filter-info">
        <button className="reset-button" onClick ={() => props.setFilter(new Map)}>Reset Filters</button>
        <Dropdown options={options1} value={category1} onChange={(e) => {
            props.setFilter({"release_date" : e.value})
        }}/>
        <Dropdown options={options2} value = {category2} onChange={(e) => {
            props.setFilter({"genres" : e.value})
        }}/>
    </div>
)
}
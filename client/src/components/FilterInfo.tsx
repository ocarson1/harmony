import '../styles/FilterInfo.css'
import Dropdown from 'react-dropdown'
import React, {useState} from 'react'

interface filterInfoProps {
  categories: Array<Set<string>>
  setFilter: Function
}

export default function FilterInfo(props: filterInfoProps) {
  const [selectedCategory1, setSelectedCategory1] = useState('Year');
  const [selectedCategory2, setSelectedCategory2] = useState('Genre');

  const options1 = Array.from(props.categories[0]).sort(function(a: any,b: any){
    return a - b;
  });
  const options2 = Array.from(props.categories[1]).sort();

  function reset() {
    setSelectedCategory1('Year');
    setSelectedCategory2('Genre');
    props.setFilter([]);
  }

  return (
    <div className="filter-info">
      <button className="reset-button" onClick={() => reset()}>Reset Filters</button>
      <Dropdown options={options1} value={selectedCategory1} onChange={(e) => {
        setSelectedCategory1(e.value);
        props.setFilter({"release_date" : e.value});
      }}/>
      <Dropdown options={options2} value={selectedCategory2} onChange={(e) => {
        setSelectedCategory2(e.value);
        props.setFilter({"genres" : e.value});
      }}/>
    </div>
  )
}
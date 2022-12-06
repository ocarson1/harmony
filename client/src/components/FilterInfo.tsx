
import '../styles/FilterInfo.css'
import Dropdown from 'react-dropdown'

export default function FilterInfo() {


    //change this in the future to be a map of category to list of options? for scalability
    const category1 = 'Date added'
    const options1 = ['this week','this month','this year'];
    const category2 = 'Genre'
    const options2 = ['pop','rap','classical'];



return (
    <div className="filter-info">
        <Dropdown options={options1} value={category1} />
        <Dropdown options={options2} value = {category2} />
    </div>
)
}
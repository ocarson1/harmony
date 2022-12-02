// text constants for ReplInput's aria label and description
export const TEXT_redlining_accessible_name = "The redlining properties of the clicked area"
export const TEXT_redlining_text =  "This contains the state, city, and name of the clicked redlining area"

/**
 * Interface for the Redlining function to allow the passing in of properties for the React component
 */
interface RedliningProps {
    state: string
    city: string
    name: string
}

/**
 * Component for the redlining properties where after the user clicks on a redlining area on the map,
 * the area's corresponding State, City, and Name appear. This is accessible and readable by a screen reader
 * @returns HTML for component
 */
function Redlining({state, city, name}: RedliningProps) {
    const ariaLabel: string = TEXT_redlining_accessible_name
    const ariaDescription: string = TEXT_redlining_text

    return (
        <div className="redlining-properties" aria-label={ariaLabel} aria-description={ariaDescription}>
            <h2> Click on a redlining area to get its properties below </h2>
            <p style={{whiteSpace: 'pre-line'}}> State: {state} </p>
            <p style={{whiteSpace: 'pre-line'}}> City: {city} </p>
            <p style={{whiteSpace: 'pre-line'}}> Name: {name} </p>
        </div>
    );
}

export default Redlining;
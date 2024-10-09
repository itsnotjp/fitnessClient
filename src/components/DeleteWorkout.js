import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DeleteWorkout({workout, onDelete}) {

    return (
        <Link className='fs-2 pe-3 m-0' onClick={ (e) => onDelete(e , workout )}>
            <i className="fas fa-square-xmark text-danger"></i>
        </Link>
    )
}
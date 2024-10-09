import { Button } from "react-bootstrap";

export default function CompletedWorkout({status, workout, onDone}) {

    return (
        <Button className="py-2 px-4 fw-semibold " disabled={status === 'completed'} variant="success" size="sm" onClick={ (e) => onDone(e , workout )}>
                            Mark as Completed
        </Button>
    )
}
import { useContext, useEffect, useState } from "react"
import { Row, Col, Table, Badge, Button, Modal, Card } from "react-bootstrap"
import Swal from "sweetalert2"

import UserContext from '../UserContext';

import AddWorkout from "../components/AddWorkout"
import UpdateWorkout from "../components/UpdateWorkout"
import DeleteWorkout from "../components/DeleteWorkout"
import CompletedWorkout from "../components/CompletedWorkout"
import { useNavigate } from "react-router-dom";

export default function Workout() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const [workouts, setWorkouts] = useState([])

    const [addWorkoutModal, setAddWorkoutModal] = useState(false);

    const closeAddWorkoutModal = () => setAddWorkoutModal(false);
    const showAddWorkoutModal = () => setAddWorkoutModal(true);


    // -----
    // ADD
    // -----
    const addWorkout = (name, duration) => {

        fetch('https://fitnessapi-beltran.onrender.com/workouts/addWorkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.message !== "string") {
                    Swal.fire({
                        title: "Added Workout Successfully",
                        icon: "success"
                    });
                    closeAddWorkoutModal();
                } else {
                    Swal.fire({
                        title: "Failed to Add Workout",
                        icon: "error"
                    });
                }
            })

    }

    // -----
    // UPDATE
    // -----
    const updateWorkout = (name, duration, id, closeUpdate) => {

        fetch(`https://fitnessapi-beltran.onrender.com/workouts/updateWorkout/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Workout updated successfully") {
                    Swal.fire({
                        title: "Workout Updated Successfully",
                        icon: "success"
                    });
                    closeUpdate();
                } else {
                    Swal.fire({
                        title: "Failed to Update Workout",
                        icon: "error"
                    });
                }
            })
    }


    // -----
    // DELETE
    // -----
    const deleteWorkout = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://fitnessapi-beltran.onrender.com/workouts/deleteWorkout/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout deleted successfully") {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your workout has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Cannot Delete.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your workout is safe :)',
                    icon: 'info'
                });
            }
        });

    }


    // -----
    // Completed
    // -----

    const completedWorkout = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure you completed the workout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Yes, I've completed my workout!",
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://fitnessapi-beltran.onrender.com/workouts/completeWorkoutStatus/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout status updated successfully") {
                            Swal.fire({
                                title: "Congratulations!",
                                text: "Your workout has been completed.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Please complete your workout :)',
                    icon: 'info'
                });
            }
        });

    }







    const fetchWorkout = () => {

        fetch("https://fitnessapi-beltran.onrender.com/workouts/getMyWorkouts", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log("fetchWorkout", data);
                if (typeof data.message !== "string") {


                    // MAP
                    const workoutsArr = data.workouts.map(workout => {
                        return (

                            <>

                                <Card className="p-0 m-3 " key={workout._id} >

                                    <div className="wc-header d-flex justify-content-between ">
                                        <div className={` wc-status text-center px-3 bg-gradient d-flex align-items-center  ${workout.status === 'pending' ? 'bg-secondary' : 'bg-success'}`} >
                                            <span className='fw-semibold text-light' >
                                                {workout.status.charAt(0).toUpperCase() + workout.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="wc-options d-flex align-items-center">
                                            {<UpdateWorkout workoutName={workout.name} workoutDuration={workout.duration} workout={workout._id} onUpdate={updateWorkout} />}
                                            {<DeleteWorkout workout={workout._id} onDelete={deleteWorkout} />}
                                        </div>
                                    </div>

                                    <Card.Body>


                                        <Card.Title className="mb-2 text-center">{workout.name}</Card.Title>
                                        <Card.Text className="mb-2 text-center ">
                                            <i className="fas fa-clock text-black-50"></i> {workout.duration}
                                        </Card.Text>



                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-center">
                                        {<CompletedWorkout status={workout.status} workout={workout._id} onDone={completedWorkout} />}
                                    </Card.Footer>

                                </Card>


                            </>
                        )
                    })



                    setWorkouts(workoutsArr);

                } else {
                    setWorkouts([]);
                }

            });

    }

    useEffect(() => {

        if (!user.id) {
            navigate('/login');
        }


        fetchWorkout(); //
        // console.log("setWorkoutsArr:", workouts);

    }, [addWorkout, user.id, navigate])

    return (
        <>
            <Row className="justify-content-center">
                <Col className="col-md-10 col-lg-7  ">
                    <Row>
                        <Col className="p-4 text-center">
                            <h1>Workout Plans</h1>
                            <p></p>

                            <Button className="py-2 px-4 fw-semibold" variant="primary" onClick={showAddWorkoutModal}>
                                Add New Workout
                            </Button>
                        </Col>

                    </Row>



                    <Row>


                        <AddWorkout show={addWorkoutModal} handleClose={closeAddWorkoutModal} onAdd={addWorkout} />
                    </Row>


                    <Row>
                        <Col>
                            {workouts}
                        </Col>
                    </Row>

                </Col>
            </Row>




        </>
    )
}
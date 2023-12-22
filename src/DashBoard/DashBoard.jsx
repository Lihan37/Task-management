import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UseAxiosPublic from '../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';


const DashBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [toDoTasks, setToDoTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [draggedTask, setDraggedTask] = useState(null);
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosPublic.get('http://localhost:5000/tasks');
                setTasks(response.data);
                setToDoTasks(response.data.filter(task => task.status === 'to-do'));
                setOngoingTasks(response.data.filter(task => task.status === 'ongoing'));
                setCompletedTasks(response.data.filter(task => task.status === 'completed'));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };


        fetchTasks();


        const intervalId = setInterval(fetchTasks, 5000);


        return () => clearInterval(intervalId);
    }, []);


    const onDragStart = (event, task) => {
        event.dataTransfer.setData('text/plain', task._id);
        setDraggedTask(task);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDrop = async (event, targetList) => {
        event.preventDefault();
        const destinationTaskId = event.dataTransfer.getData('text/plain');
        const destinationIndex = tasks.findIndex((task) => task._id === destinationTaskId);

        if (destinationIndex !== -1 && draggedTask) {
            const updatedTasks = [...tasks];
            const draggedIndex = updatedTasks.findIndex((task) => task._id === draggedTask._id);

            updatedTasks.splice(draggedIndex, 1);

            let updatedTargetList = [];
            switch (targetList) {
                case 'toDo':
                    updatedTargetList = [...toDoTasks, draggedTask];
                    setToDoTasks(updatedTargetList);
                    break;
                case 'ongoing':
                    updatedTargetList = [...ongoingTasks, draggedTask];
                    setOngoingTasks(updatedTargetList);

                    Swal.fire({
                        icon: 'success',
                        title: 'Task Moved!',
                        text: 'Task moved from To-Do to Ongoing successfully.',
                    });
                    break;
                case 'completed':
                    updatedTargetList = [...completedTasks, draggedTask];
                    setCompletedTasks(updatedTargetList);

                    Swal.fire({
                        icon: 'success',
                        title: 'Task Completed!',
                        text: 'Task moved from Ongoing to Completed successfully.',
                    });
                    break;
                default:
                    break;
            }

            try {
                // Set the status based on the target list
                const statusMapping = {
                    toDo: 'to-do',
                    ongoing: 'ongoing',
                    completed: 'completed',
                };

                // Update the backend with the updated task data
                const response = await axiosPublic.patch(`http://localhost:5000/tasks/${draggedTask._id}`, {
                    status: statusMapping[targetList],
                });


                // Update the state with the modified task lists
                setTasks(updatedTasks);
                switch (targetList) {
                    case 'toDo':
                        setToDoTasks([...toDoTasks.filter(task => task._id !== draggedTask._id)]);
                        break;
                    case 'ongoing':
                        setOngoingTasks([...ongoingTasks.filter(task => task._id !== draggedTask._id), draggedTask]);
                        break;
                    case 'completed':
                        setCompletedTasks([...completedTasks.filter(task => task._id !== draggedTask._id), draggedTask]);
                        break;
                    default:
                        break;
                }

            } catch (error) {
                console.error('Error updating tasks:', error);
            }
        }

        setDraggedTask(null);
    };

    const onSubmit = async (data) => {
        try {
            const newTask = {
                title: data.title,
                description: data.description,
                deadline: data.deadline,
                priority: data.priority,
                status: 'to-do',
            };

            const response = await axiosPublic.post('http://localhost:5000/tasks', newTask);


            const insertedId = response.data.insertedTask._id;


            const insertedTaskResponse = await axiosPublic.get(`http://localhost:5000/tasks/${insertedId}`);


            setTasks([...tasks, insertedTaskResponse.data]);
            switch (insertedTaskResponse.data.status) {
                case 'to-do':
                    setToDoTasks([...toDoTasks, insertedTaskResponse.data]);
                    break;
                case 'ongoing':
                    setOngoingTasks([...ongoingTasks, insertedTaskResponse.data]);
                    break;
                case 'completed':
                    setCompletedTasks([...completedTasks, insertedTaskResponse.data]);
                    break;
                default:
                    break;
            }

            reset();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };


    const onDelete = async (taskId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            console.log('Delete Response:', response.data);

            const updatedTasks = tasks.filter((task) => task._id !== taskId);
            setTasks(updatedTasks);
            setToDoTasks(updatedTasks.filter(task => task.status === 'to-do'));
            setOngoingTasks(updatedTasks.filter(task => task.status === 'ongoing'));
            setCompletedTasks(updatedTasks.filter(task => task.status === 'completed'));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (

        <div>
            
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-semibold mb-4">Task Management Dashboard</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <label className="block mb-2">
                        Title:
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            className="border p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Description:
                        <textarea {...register('description')} className="border p-2"></textarea>
                    </label>
                    <label className="block mb-2">
                        Deadline:
                        <input
                            type="date"
                            {...register('deadline')}
                            className="border p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Priority:
                        <select {...register('priority')} className="border p-2">
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2">
                        Add Task
                    </button>
                </form>


                <div className="flex space-x-4">
                    {/* To-Do List */}
                    <div onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, 'toDo')} className="border p-4 flex-grow">
                        <h2 className="text-lg font-semibold mb-2">To-Do</h2>
                        {toDoTasks.map((task) => (
                            <div
                                key={task._id}
                                draggable
                                onDragStart={(event) => onDragStart(event, task)}
                                className="border p-4 mb-2"
                            >
                                <h3 className="text-xl font-semibold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <button
                                    onClick={() => onDelete(task._id)}
                                    className="mt-2 bg-red-500 text-white p-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Ongoing List */}
                    <div onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, 'ongoing')} className="border p-4 flex-grow">
                        <h2 className="text-lg font-semibold mb-2">Ongoing</h2>
                        {ongoingTasks.map((task) => (
                            <div
                                key={task._id}
                                draggable
                                onDragStart={(event) => onDragStart(event, task)}
                                className="border p-4 mb-2"
                            >
                                <h3 className="text-xl font-semibold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <button
                                    onClick={() => onDelete(task._id)}
                                    className="mt-2 bg-red-500 text-white p-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Completed List */}
                    <div onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, 'completed')} className="border p-4 flex-grow">
                        <h2 className="text-lg font-semibold mb-2">Completed</h2>
                        {completedTasks.map((task) => (
                            <div
                                key={task._id}
                                draggable
                                onDragStart={(event) => onDragStart(event, task)}
                                className="border p-4 mb-2"
                            >
                                <h3 className="text-xl font-semibold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <button
                                    onClick={() => onDelete(task._id)}
                                    className="mt-2 bg-red-500 text-white p-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;

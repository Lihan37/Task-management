// EditTask.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../hooks/UseAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditTask = () => {
  const { taskId } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosPublic.get(`http://localhost:5000/tasks/${taskId}`);
        setTask(response.data);

        // Set form values based on the fetched task
        setValue('title', response.data.title);
        setValue('description', response.data.description);
        setValue('deadline', response.data.deadline);
        setValue('priority', response.data.priority);
        setValue('status', response.data.status);

      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId, setValue, axiosPublic]);

  const onSubmit = async (data) => {
    try {
      const updatedTask = {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        priority: data.priority,
        status: task?.status || '', // Use optional chaining to handle null or undefined
      };

      console.log('Updated Task Payload:', updatedTask);

      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      // Check the response and log it
      console.log('Full Response:', response);

      if (response.ok) {
        const responseData = await response.json();

        // Update the status in the form based on the response
        setValue('status', responseData.updatedTask.status);

        // Show success modal with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Task Updated Successfully!',
          showConfirmButton: true,
          confirmButtonText: 'Go to Home',
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to /home
            navigate('/dashboard');
          }
        });
      } else {
        console.error('Invalid response:', response);

        // Show error modal if needed
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid response!',
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);

      // Show error modal if needed
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { value: confirmed } = await Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (confirmed) {
        const response = await axiosPublic.delete(`http://localhost:5000/tasks/${taskId}`);
        
        if (response.ok) {
          const responseData = await response.json();
  
          if (responseData.deletedCount === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Task Deleted Successfully!',
              showConfirmButton: true,
              confirmButtonText: 'Go to Dashboard',
            }).then(() => {
              navigate('/dashboard');
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error deleting task. Please try again.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error deleting task. Please try again.',
          });
        }
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while deleting the task.',
      });
    }
  };
  
  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title:</label>
        <input type="text" {...register('title')} />
        <label>Description:</label>
        <textarea {...register('description')}></textarea>
        <label>Deadline:</label>
        <input type="date" {...register('deadline')} />
        <label>Priority:</label>
        <select {...register('priority')}>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
        {/* Add a field for status if needed */}
        <label>Status:</label>
        <input type="text" {...register('status')} value={task?.status || ''} readOnly />
        <button type="submit">Update Task</button>
      </form>

      {/* Delete Button */}
      <button type="button" onClick={handleDelete}>
        Delete Task
      </button>
    </div>
  );
};

export default EditTask;

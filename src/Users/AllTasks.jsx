import React, { useState, useEffect } from 'react';
import UseAxiosPublic from '../hooks/UseAxiosPublic';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to fetch tasks only once on component mount

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.deadline}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTasks;

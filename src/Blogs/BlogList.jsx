// BlogList.js
import React from 'react';
import Blog from './Blog';

const BlogList = () => {
  // Sample data
  const blogs = [
    {
      title: 'React Fundamentals',
      content: 'Learn the basics of React programming.',
      author: 'John Doe',
    },
    {
      title: 'State Management in React',
      content: 'Explore different state management options in React.',
      author: 'Jane Doe',
    },
    {
      title: 'Building a Blog App with React',
      content: 'Create a simple blog app using React and Daisy UI.',
      author: 'Alice Smith',
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {blogs.map((blog, index) => (
        <Blog key={index} {...blog} />
      ))}
    </div>
  );
};

export default BlogList;

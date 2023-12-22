// Blog.js
import React from 'react';

const Blog = ({ title, content, author }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px', padding: '16px', width: '300px' }}>
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{content}</p>
      <p>Coming soon</p>
    </div>
  );
};

export default Blog;

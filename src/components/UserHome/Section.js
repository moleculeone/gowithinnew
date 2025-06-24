import React from 'react';

const Section = ({ posts, handleEdit, handleDelete }) => {
  return (
    <div>
      {posts ? (
        posts.map((post, i) => (
          <div key={post.id}>
            {post.title}
          </div>
        ))
      ) : (
        <div>

        </div>
      )}
    </div>
  );
};

export default Section;

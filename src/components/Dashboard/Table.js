import React from 'react';

const Table = ({ posts, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>

            <th>category</th>
            <th>contentType</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts ? (
            posts.map((post, i) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.description}</td>

                <td>{post.category}</td>
                <td>{post.contentType} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

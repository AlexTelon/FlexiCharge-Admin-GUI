import React from 'react';
import { Link } from 'react-router-dom';
class NotFoundPage extends React.Component {
  render() {
    return <div>
      <p style = { { textAlign: 'center', fontWeight: 'bold', marginTop: 200 } }>
        <h1> 404 | PAGE NOT FOUND </h1>
      </p>
      <p style = { { textAlign: 'center' } }>
        <Link to="/"> Go to home </Link>
      </p>
    </div>;
  }
}
export default NotFoundPage;
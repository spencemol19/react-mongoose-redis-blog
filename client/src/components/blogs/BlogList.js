import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, removeBlog } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props);
    console.log(nextProps);
    if (Object.keys(this.props.blogs).length && JSON.stringify(nextProps.blogs) !== JSON.stringify(this.props.blogs)) {
      console.log('hitting here');
      return true;
    }
    return false;
  }

  renderBlogs() {
    return map(this.props.blogs, blog => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`}>Read</Link>
            </div>
            <div className="card-action">
              <a href="#"
                style={{color: "red"}}
                onClick={e => {
                  e.preventDefault();
                  this.props.removeBlog(blog._id);
                  return false; 
                }}>Delete Permanently</a>
            </div>
          </div>
        </div>
      );
    });
  }

  render () {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs, removeBlog })(BlogList);

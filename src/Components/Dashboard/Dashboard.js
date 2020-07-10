//Dashboard is where users can view their posts, create new posts, and delete posts.
import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postImage: ""
    };
  }

  handleInput = (val) => {
    this.setState({ postImage: val });
  };

  getUserPosts = () => {
    axios
      .get(`/api/posts/${this.props.user.user_id}`)
      .then((res) => this.setState({ posts: res.data }))
      .catch((err) => console.log(err));
  };

  createPost = () => {
    axios
      .post("/api/post", { id: this.props.user.user_id, postImage: this.state.postImage })
      .then(() => {
        this.getUserPosts();
        this.setState({ postImage: "" });
      })
      .catch((err) => console.log(err));
  };

  deletePost = (id) => {
    axios
      .delete(`/api/post/${id}`)
      .then(() => {
        this.getUserPosts();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const mappedPosts = this.state.posts.map((post, i) => (
      <div className="post-box">
        <img key={i} src={post.post_url} alt="mememountain post" className="post-image" />
        <button onClick={() => this.deletePost(post.post_id)}>Delete</button>
      </div>
    ));
    return (
      <div className="dashboard">
        <input
          value={this.state.postImage}
          placeholder="Add Image URL"
          onChange={(e) => this.handleInput(e.target.value)}
        />
        <button onClick={this.createPost}>Post</button>
        <h1>Your Recent Posts</h1>
        <div className="post-flex">{mappedPosts}</div>
      </div>
    );
  }
}

export default Dashboard;

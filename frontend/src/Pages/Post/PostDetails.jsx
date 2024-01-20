import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import moment from "moment";

function PostDetails() {
  const { PostId } = useParams();
  const [postObject, setPostObejct] = useState({});
  const { authState, setAuthState } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const id = authState.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/byId/${PostId}`)
      .then((response) => {
        setPostObejct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios.get(`http://localhost:8080/comments/${postObject.id}`).then((response) => {
    //   setComments(response.data);
    //   const fetchComments = response.data;
    //   console.log(fetchComments);
    // });
  }, [PostId]);

  useEffect(() => {
    if (postObject.id) {
      fetchComments();
    }
  }, [postObject]);

  const fetchComments = () => {
    axios
      .get(`http://localhost:8080/comments/${postObject.id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addComment = () => {
    axios
      .post(
        "http://localhost:8080/comments",
        {
          commentBody: newComment,
          PostId: postObject.id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  // DISPLAY RELATED SHEESH
  const user = postObject.postuser || {};

  return (
    <>
      <Navbar />
      <div className="px-5 mt-5">
        <div className="mb-3">
          <Link path to="/home">
            <span>Back</span>
          </Link>
        </div>
        <div className="col-8 mb-3">
          <div className="card mb-3" key={postObject.id}>
            <img
              src={`http://localhost:8080/uploads/${postObject.media}`}
              className="card-img-top display-img"
              alt=""
            />
            <div className="card-body">
              <p>{postObject.id}</p>
              <h2 className="card-title">{postObject.message}</h2>
              <p className="card-subtitle mb-3">
                {moment(postObject.createdAt).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
              <p className="card-text">@{user.username}</p>
            </div>
          </div>
          <div className="card mb-3 p-3">
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Add a comment"
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
          <div className="mb-3">
            {comments
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment, key) => (
                <div className="card p-3 mb-3 bg-light" key={key}>
                  {comment.commentBody}
                  <label className="fs-6 fst-italic">@{comment.username}</label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;

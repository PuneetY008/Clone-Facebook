import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles/PostStyles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import useToggle from "./hooks/useToggle";
import AddCommentForm from "./AddCommentForm";
import { v4 as uuidv4 } from "uuid";

function Post(props) {
  const { classes, username, userImg, uploadTime, postContent, likedBy } =
    props;
  //console.log(props);

  const initialComments = [
    { id: uuidv4(), text: "Verry good man, keep it up" },
    { id: uuidv4(), text: "All thanks to you!" },
    { id: uuidv4(), text: "Hey!! That sounds interesting haha..." },
  ];

  const [isCommenting, toggleIsCommenting] = useToggle(false);
  const [comments, setComments] = useState(initialComments);

  const noOfComments = comments.length;

  const addComment = (newCommentText) => {
    setComments([...comments, { id: uuidv4(), text: newCommentText }]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <img src={userImg} width="40px" height="40px"></img>
          <div className={classes.headerUserDetails}>
            <span style={{ fontSize: "1rem" }}>
              <b>{username}</b>
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                marginLeft: "3px",
                color: "#898F9C",
              }}
            >
              {uploadTime}
            </span>
          </div>
        </div>
        <div>
          <span>
            <MoreHorizIcon style={{ color: "#898F9C" }} />
          </span>
        </div>
      </div>
      <div className={classes.content}>
        <p>{postContent.text}</p>
        {postContent.img ? (
          <div className={classes.postContentImgDiv}>
            <img className={classes.postContentImg} src={postContent.img} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.footerUpper}>
          <div className={classes.footerLikes}>
            <ThumbUpIcon fontSize="small" style={{ color: "#4267B2" }} />
            <span>{likedBy.length} likes</span>
          </div>
          <div className={classes.footerComments} onClick={toggleIsCommenting}>
            <span>{noOfComments} comments</span>
          </div>
        </div>
        <hr style={{ color: "#898F9C" }} />
        <div className={classes.footerLower}>
          <div>
            <ThumbUpOutlinedIcon
              fontSize="small"
              style={{ color: "#898F9C" }}
            />
            <span>Like</span>
          </div>
          <div onClick={toggleIsCommenting}>
            <ChatBubbleOutlineIcon
              fontSize="small"
              style={{ color: "#898F9C" }}
            />
            <span>Comment</span>
          </div>
          <div>
            <ShareIcon fontSize="small" style={{ color: "#898F9C" }} />
            <span>Share</span>
          </div>
        </div>
        {isCommenting ? (
          <div>
            <AddCommentForm comments={comments} addComment={addComment} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Post);

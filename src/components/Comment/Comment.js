import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styles from './Comment.module.scss';
import { createComment, deleteComment, findReplyComment } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

function Comment({
  comment,
  comment_parent_id,
  seeMore,
  handleShowMore = () => {},
  replyComment = [],
  replyCount = 0,
}) {
  const currentUser = useSelector((state) => state?.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const userThumb = currentUser?.metadata.user.thumb;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [reply, setReply] = useState(false);
  const [secondReply, setSecondReply] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);

  const [content, setContent] = useState('');

  const handleCreateComment = async (commentInfo) => {
    const data = {
      product_id: commentInfo.comment_product_id,
      user_id: userID,
      user_thumb: userThumb,
      user_name: currentUser?.metadata.user.name,
      parent_name: commentInfo.comment_user_name,
      content,
      parent_comment_id: commentInfo._id,
    };

    await createComment(accessToken, userID, 1, data, dispatch, axiosJWT);
    setReply(false);
    setSecondReply(false);
    setContent('');
    findReplyComment(comment.comment_product_id, comment._id, 1, dispatch, axiosJWT);
  };

  const handleDeleteComment = async (commentInfo) => {
    const data = {
      comment_id: commentInfo._id,
      product_id: commentInfo.comment_product_id,
    };
    await deleteComment(accessToken, userID, 1, data, dispatch, axiosJWT);
    findReplyComment(comment.comment_product_id, comment._id, 1, dispatch, axiosJWT);
  };

  return (
    <div className={cx('wrapper', comment_parent_id ? 'children' : '')}>
      <div className={cx('parent')}>
        <img className={cx('avatar')} src={comment.comment_user_thumb} alt="Avatar" />
        <div className={cx('content')}>
          {(seeMore || !comment_parent_id) && <span className={cx('name')}>{comment.comment_user_name}</span>}
          {!comment_parent_id && (
            <Container>
              <p className={cx('comment')}>{comment.comment_content}</p>
              <Row className={cx('actions')}>
                <Col md={2}>3 hours ago</Col>
                <Col
                  md={3}
                  className={cx('action')}
                  onClick={() => {
                    setReply(!reply);
                  }}
                >
                  Reply
                </Col>
                <Col
                  md={3}
                  className={cx('action')}
                  onClick={() => {
                    handleShowMore(comment);
                  }}
                >
                  {replyCount} replied
                </Col>
                {userID === comment.comment_user_id && (
                  <Col md={3} className={cx('action')} onClick={() => handleDeleteComment(comment)}>
                    Delete
                  </Col>
                )}
              </Row>
            </Container>
          )}
          {reply && (
            <div className={cx('reply')}>
              <Form.Group className={cx('form-group')} controlId="commentReply">
                <Form.Control
                  as="textarea"
                  placeholder={'Enter something...'}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={cx('form-control')}
                  name="commentReply"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCreateComment(comment);
                    }
                  }}
                />
              </Form.Group>
            </div>
          )}
        </div>
      </div>
      <div className={cx('child')}>
        {replyComment[0]?.comment_parent_id === comment._id &&
          seeMore &&
          replyComment?.map((reply, index) => (
            <div key={index} className={cx('reply-comment')}>
              <div className={cx('parent')}>
                <img className={cx('avatar')} src={reply.comment_user_thumb} alt="Avatar" />
                <div className={cx('content')}>
                  <span className={cx('name')}>{reply.comment_user_name || 'Lewis'}</span>
                  <Container>
                    <p className={cx('comment')}>
                      <span className={cx('username')}>@{reply?.comment_parent_name} </span>
                      {reply.comment_content}
                    </p>
                    <Row className={cx('actions')}>
                      <Col md={2}>3 hours ago</Col>
                      <Col
                        md={3}
                        className={cx('action')}
                        onClick={() => {
                          setReplyCommentId(reply._id);
                          setSecondReply(!secondReply);
                        }}
                      >
                        Reply
                      </Col>
                      {userID === reply.comment_user_id && (
                        <Col md={3} className={cx('action')} onClick={() => handleDeleteComment(reply)}>
                          Delete
                        </Col>
                      )}
                    </Row>
                  </Container>
                </div>
              </div>
              {secondReply && replyCommentId === reply._id && (
                <div className={cx('reply')}>
                  <Form.Group className={cx('form-group')} controlId="commentReply">
                    <Form.Control
                      as="textarea"
                      placeholder={'Enter something...'}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className={cx('form-control')}
                      name="commentReply"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleCreateComment(reply);
                        }
                      }}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;

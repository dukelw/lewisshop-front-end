import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import styles from './Comment.module.scss';
import { createComment } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

function Comment({ comment, comment_parent_id, seeMore, handleShowMore }) {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [reply, setReply] = useState(false);

  const [content, setContent] = useState('');

  const handleCreateComment = () => {
    const data = {
      product_id: comment.comment_product_id,
      user_id: userID,
      user_name: currentUser?.metadata.user.name,
      content,
      parent_comment_id: comment._id,
    };

    console.log('Comment create id::: ', comment._id);
    console.log(data, 'Clik');
    createComment(accessToken, userID, 1, data, dispatch, axiosJWT);
  };

  return (
    <div className={cx('wrapper', comment_parent_id ? 'children' : '')}>
      {(seeMore || !comment_parent_id) && <span className={cx('name')}>{comment.comment_user_name || 'Lewis'}</span>}
      {!comment_parent_id && (
        <div>
          <p className={cx('comment')}>{comment.comment_content}</p>
          <div className={cx('actions')}>
            <p
              className={cx('action')}
              onClick={() => {
                setReply(!reply);
              }}
            >
              Reply
            </p>
            <p className={cx('action')} onClick={handleShowMore}>
              Show more
            </p>
          </div>
        </div>
      )}
      {comment_parent_id && seeMore && (
        <div>
          <p className={cx('comment')}>{comment.comment_content}</p>
          <div className={cx('actions')}>
            <p className={cx('action', 'username')}>{comment.comment_user_name || 'Duke'}</p>
            <p
              className={cx('action')}
              onClick={() => {
                setReply(!reply);
              }}
            >
              Reply
            </p>
          </div>
        </div>
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
            />
          </Form.Group>
          <p onClick={handleCreateComment} className={cx('confirm')}>
            Oke
          </p>
        </div>
      )}
    </div>
  );
}

export default Comment;

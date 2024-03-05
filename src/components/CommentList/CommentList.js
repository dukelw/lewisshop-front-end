import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import styles from './CommentList.module.scss';
import { createComment } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

const CommentList = ({ comments, product_id }) => {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [seeMore, setSeeMore] = useState(false);

  const handleShowMore = () => {
    setSeeMore(!seeMore);
  };

  const [content, setContent] = useState('');

  const handleCreateComment = () => {
    const data = {
      product_id,
      user_id: userID,
      user_name: currentUser?.metadata.user.name,
      content,
      parent_comment_id: null,
    };

    createComment(accessToken, userID, 1, data, dispatch, axiosJWT);
  };

  return (
    <div>
      <div className={cx('new')}>
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
      {comments?.map((comment, index) => (
        <div className={cx('wrapper')} key={index}>
          {(seeMore || !comment.comment_parent_id) && (
            <div className={cx('inner')}>
              <Comment
                comment={comment}
                comment_parent_id={comment.comment_parent_id}
                seeMore={seeMore}
                handleShowMore={handleShowMore}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;

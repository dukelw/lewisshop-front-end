import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import styles from './CommentList.module.scss';
import { createComment, findReplyComment } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

const CommentList = ({ comments, product_id }) => {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const currentRelpy = useSelector((state) => state?.comment.findReply.foundComment);
  const replyComment = currentRelpy?.metadata;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [seeMore, setSeeMore] = useState(false);

  const handleShowMore = async (comment) => {
    await findReplyComment(comment.comment_product_id, comment._id, 1, dispatch, axiosJWT);
    setSeeMore((prevSeeMore) => ({
      ...prevSeeMore,
      [comment._id]: !prevSeeMore[comment._id],
    }));
  };

  const [content, setContent] = useState('');

  const handleCreateComment = async () => {
    const data = {
      product_id,
      user_id: userID,
      user_name: currentUser?.metadata.user.name,
      content,
      parent_comment_id: null,
    };
    setContent('');
    await createComment(accessToken, userID, 1, data, dispatch, axiosJWT);
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCreateComment();
              }
            }}
          />
        </Form.Group>
      </div>
      {comments?.map((comment, index) => (
        <div className={cx('wrapper')} key={index}>
          {(seeMore || !comment.comment_parent_id) && (
            <div className={cx('inner')}>
              <Comment
                comment={comment}
                comment_parent_id={comment.comment_parent_id}
                seeMore={seeMore[comment._id]}
                handleShowMore={handleShowMore}
                replyComment={replyComment}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;

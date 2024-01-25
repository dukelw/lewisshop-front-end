import React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HeartRating = ({ score, activeColor = '#ff3d47', inactiveColor }) => {
  return (
    <div>
      <Typography component="legend" style={{ color: score > 0 ? activeColor : inactiveColor }}>
        Rating score
      </Typography>{' '}
      <Rating
        value={score}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" style={{ color: activeColor }} />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{ color: inactiveColor }} />}
        readOnly
      />
    </div>
  );
};

export default HeartRating;

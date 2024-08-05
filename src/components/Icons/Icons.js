import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faAddressBook,
  faArrowLeft,
  faBackward,
  faBarcode,
  faCancel,
  faCheck,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faClipboardCheck,
  faCreditCard,
  faDongSign,
  faDotCircle,
  faEye,
  faEyeSlash,
  faFilter,
  faHeart,
  faHourglassEnd,
  faHourglassStart,
  faHouseFlag,
  faImage,
  faLandMineOn,
  faLayerGroup,
  faList,
  faMessage,
  faMoneyBill1Wave,
  faPaperPlane,
  faPercent,
  faPlus,
  faRightFromBracket,
  faSearch,
  faShop,
  faShoppingCart,
  faSort,
  faSpinner,
  faSquareMinus,
  faStar as faStartSolid,
  faSubtract,
  faTimeline,
  faTrashCan,
  faTriangleExclamation,
  faTruck,
  faUser,
  faUserXmark,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faMintbit, faProductHunt, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClockFour, faStar as faStarRegular, faBookmark } from '@fortawesome/free-regular-svg-icons';

export const BackwardIcon = ({ width = '1.6rem', height = '1.6rem', className, color, padding, onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faBackward}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ImageIcon = ({ width = '1.6rem', height = '1.6rem', className, color, padding, onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faImage}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const PaperPlanIcon = ({ width = '1.6rem', height = '1.6rem', className, color, padding, onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faPaperPlane}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const DotIcon = ({ width = '1.6rem', height = '1.6rem', className, color, padding, onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faDotCircle}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ErrorIcon = ({ width = '1.6rem', height = '1.6rem', className, color, padding, onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faTriangleExclamation}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const InfoIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCircleInfo}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const AddressBookIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faAddressBook}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const CreditCardIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCreditCard}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ClipboardCheckIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faClipboardCheck}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const TruckIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faTruck}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const CancelIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCancel}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const CheckIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCheck}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const SpinnerIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faSpinner}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const StarIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faStartSolid}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const LayerGroupIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faLayerGroup}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const LandMineOnIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faLandMineOn}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const MintBitIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faMintbit}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const TimeLineIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faTimeline}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const SquareMinusIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faSquareMinus}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const PlusIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faPlus}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const TrashCanIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faTrashCan}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const UsersIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faUsers}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const HourGlassStartIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faHourglassStart}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const BarCodeIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faBarcode}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ProductHuntIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faProductHunt}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const HourGlassEndIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faHourglassEnd}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const UserXmarkIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faUserXmark}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const PercentIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faPercent}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const MoneyBillIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faMoneyBill1Wave}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const TriangleExclamationIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faTriangleExclamation}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const CircleInfoIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCircleInfo}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const CircleXMarkIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCircleXmark}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const CircleCheckIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faCircleCheck}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ArrowLeftIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faArrowLeft}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const HouseFlagIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faHouseFlag}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const XMarkIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faXmark}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ClockIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faClockFour}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const BookmarkIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faBookmark}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const AuthenIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faRightFromBracket}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const ShopIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faShop}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const UserIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faUser}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const EyeSlashIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faEyeSlash}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const EyeIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faEye}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const SubtractIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  color,
  padding = '8px',
  onClick,
  style,
}) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faSubtract}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const AddIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={faAdd}
    className={className}
    style={{ width, height, color: color, padding: padding, ...style }}
  />
);

export const DongIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon icon={faDongSign} className={className} style={{ width, height, color: color, padding: padding }} />
);

export const StarIconRegular = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon
    icon={faStarRegular}
    className={className}
    style={{ width, height, color: color, padding: padding }}
  />
);

export const StarIconSolid = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon
    icon={faStartSolid}
    className={className}
    style={{ width, height, color: color, padding: padding }}
  />
);

export const SortIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon icon={faSort} className={className} style={{ width, height, color: color, padding: padding }} />
);

export const FilterIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon icon={faFilter} className={className} style={{ width, height, color: color, padding: padding }} />
);

export const FacebookIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon icon={faFacebook} className={className} style={{ width, height, color: color, padding: padding }} />
);

export const InstagramIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon icon={faInstagram} className={className} style={{ width, height, color: color, padding: padding }} />
);

export const TwitterIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px' }) => (
  <FontAwesomeIcon icon={faTwitter} className={className} style={{ width, height, color: color, padding: padding }} />
);

export const CartIcon = ({ width = '2rem', height = '2rem', className, color, padding = '8px', onClick, style }) => (
  <FontAwesomeIcon
    icon={faShoppingCart}
    onClick={onClick}
    className={className}
    style={{ width, height, padding, color, ...style }}
  />
);

export const FavouriteIcon = ({ width = '2rem', height = '2rem', className }) => (
  <FontAwesomeIcon icon={faHeart} className={className} style={{ width, height }} />
);

export const NotificationIcon = ({ width = '2rem', height = '2rem', className, padding = '8px' }) => (
  <FontAwesomeIcon icon={faMessage} className={className} style={{ width, height, padding }} />
);

export const SearchIcon = ({ width = '2rem', height = '2rem', className, display = 'block' }) => (
  <FontAwesomeIcon icon={faSearch} className={className} style={{ width, height, display: display }} />
);

export const ListIcon = ({
  width = '2rem',
  height = '2rem',
  className,
  display = 'block',
  color,
  padding = '8px',
  onClick,
  style,
}) => <FontAwesomeIcon icon={faList} className={className} style={{ width, height, display: display }} />;

export const LogoIconDark = ({ width = '16.2rem', height = '5.8rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width={width}
    height={height}
    viewBox="0 0 1024.000000 405.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="translate(0.000000,405.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
      <path d="M2213 3956 c-139 -96 -279 -147 -462 -167 -176 -19 -685 -16 -948 6 -46 4 -83 3 -83 -2 0 -4 31 -21 68 -38 53 -24 89 -52 175 -135 59 -58 123 -113 141 -122 28 -14 76 -17 338 -20 169 -2 309 -6 312 -9 4 -3 6 -557 6 -1231 0 -1315 0 -1310 -50 -1412 -11 -22 -17 -42 -14 -45 3 -3 33 23 67 59 234 248 305 315 405 379 48 30 51 35 38 50 -45 50 -46 58 -46 665 l0 576 77 1 c141 2 298 -2 303 -8 10 -10 0 -1158 -11 -1228 -11 -76 -62 -253 -86 -298 -8 -16 -12 -31 -9 -34 3 -3 38 24 78 61 134 121 261 204 376 244 l32 11 1 98 c5 687 10 1147 12 1149 2 3 240 6 341 4 l38 0 -5 -377 c-4 -290 -8 -390 -19 -428 -39 -133 -160 -308 -269 -392 -27 -20 -49 -40 -49 -43 0 -4 28 -2 63 3 34 5 123 10 197 10 154 2 219 -13 288 -63 44 -32 106 -118 118 -164 9 -39 19 -32 38 32 29 91 83 186 148 256 63 69 183 156 242 176 20 6 36 15 36 19 0 10 -127 37 -240 51 -47 6 -100 13 -117 16 l-33 5 0 595 0 595 -387 -3 -388 -3 -3 78 -3 77 58 1 c32 0 161 1 287 1 255 0 303 8 348 57 42 47 59 123 67 306 8 152 10 168 37 220 35 71 134 173 198 204 26 13 44 27 39 31 -4 4 -35 4 -68 -1 -159 -23 -422 -39 -641 -39 l-242 0 -26 53 c-69 142 -176 192 -396 185 l-105 -3 49 -24 c26 -13 64 -40 83 -59 36 -36 90 -138 79 -149 -3 -3 -93 -6 -201 -5 -139 0 -197 -3 -202 -11 -8 -13 -72 -290 -68 -295 1 -1 30 5 64 14 34 8 104 17 156 18 l95 3 0 -59 c0 -68 24 -61 -208 -62 -148 -1 -163 1 -168 17 -10 31 -1 328 12 404 13 74 36 128 86 201 16 23 25 42 21 42 -4 0 -36 -20 -70 -44z m1075 -540 c7 -84 15 -81 -183 -83 l-175 -2 0 58 c0 32 3 61 7 64 3 4 83 6 177 5 l171 -3 3 -39z m-767 -225 c18 -1 20 -7 17 -48 l-3 -48 -185 0 -185 0 0 45 0 45 110 5 c96 4 170 5 246 1z m749 -61 l-11 -40 -164 0 -165 0 0 50 0 50 168 2 c124 2 169 0 175 -9 4 -7 3 -31 -3 -53z m-730 -252 l0 -78 -42 -1 c-24 -1 -108 -2 -188 -2 l-145 -1 -3 76 -3 77 58 3 c32 2 118 3 190 3 l133 0 0 -77z" />
      <path d="M3980 3975 c0 -4 16 -26 35 -49 62 -76 69 -108 69 -321 0 -156 -4 -209 -22 -297 -50 -242 -133 -424 -249 -548 l-33 -36 107 -74 c200 -140 254 -160 321 -120 64 39 167 232 225 420 53 175 69 295 74 568 l5 253 -33 12 c-19 6 -98 44 -176 84 -78 39 -162 78 -185 86 -51 17 -138 31 -138 22z" />
      <path d="M7849 3877 c-86 -56 -153 -77 -245 -77 -41 0 -74 -2 -74 -5 0 -3 18 -22 41 -42 52 -47 108 -120 200 -259 79 -120 115 -164 137 -164 8 0 37 21 65 46 63 56 119 89 222 131 44 18 81 36 83 41 1 4 -17 17 -40 29 -65 31 -177 141 -252 247 -38 53 -69 96 -70 96 0 0 -31 -20 -67 -43z" />
      <path d="M5346 3856 c-30 -103 1 -96 -412 -97 l-361 -1 8 -47 c12 -70 9 -236 -5 -329 -12 -80 -12 -82 8 -76 47 15 372 22 705 15 l54 -1 -7 -46 c-16 -121 -137 -418 -246 -604 -126 -216 -373 -483 -572 -618 -184 -125 -320 -181 -498 -205 l-95 -13 51 -27 c71 -36 194 -137 245 -200 69 -86 93 -149 94 -242 0 -62 -5 -91 -22 -127 -12 -27 -18 -48 -12 -48 5 0 42 34 82 76 39 42 148 138 241 213 347 278 525 455 711 706 165 222 282 435 422 770 86 208 155 325 205 354 15 9 28 19 28 22 0 3 -47 17 -105 31 -57 15 -138 42 -179 62 l-74 36 12 53 c17 74 54 143 104 194 23 24 42 45 42 47 0 2 -17 7 -37 10 -85 15 -213 60 -290 102 l-82 44 -15 -54z" />
      <path d="M8620 3835 c0 -46 -46 -131 -107 -196 -36 -38 -72 -69 -79 -69 -8 0 -14 -4 -14 -8 0 -5 71 -30 158 -56 180 -55 171 -53 237 -61 27 -3 51 -8 52 -9 2 -2 4 -405 4 -897 0 -1025 11 -917 -103 -938 -129 -24 -311 -29 -1048 -29 -415 0 -814 -1 -886 -1 l-131 -1 -5 -74 c-4 -55 -13 -90 -33 -133 -28 -56 -134 -175 -165 -185 -8 -3 -12 -8 -9 -12 4 -4 43 -2 89 3 68 9 852 13 2133 11 103 0 137 -3 137 -13 0 -6 -13 -53 -29 -102 -17 -49 -28 -91 -26 -93 5 -5 63 61 166 188 173 215 333 374 438 436 17 10 31 22 31 26 0 5 -29 6 -64 2 l-64 -7 1 854 c0 470 4 890 7 934 5 54 16 98 34 136 34 70 117 173 179 219 51 39 59 53 24 45 -89 -23 -566 -26 -717 -5 -47 6 -110 20 -140 31 -65 23 -70 23 -70 4z" />
      <path d="M7423 3515 c-67 -70 -220 -114 -342 -99 l-54 7 59 -53 c168 -152 301 -332 367 -500 51 -130 60 -207 62 -555 3 -361 -6 -500 -35 -597 -11 -36 -20 -68 -20 -71 0 -2 91 -3 203 -1 111 2 217 4 235 4 l32 0 0 383 c0 210 3 399 6 419 l6 37 37 -24 c106 -73 226 13 379 267 44 73 78 135 76 137 -2 2 -30 -5 -61 -15 -43 -14 -87 -19 -173 -19 -106 0 -120 2 -172 28 -78 38 -134 103 -257 298 -107 170 -232 334 -281 369 -15 11 -30 20 -32 19 -1 0 -17 -15 -35 -34z" />
      <path d="M6850 3450 c-47 -4 -212 -6 -368 -5 -251 1 -282 -1 -276 -15 29 -68 35 -99 30 -150 -10 -79 -40 -134 -125 -224 -42 -43 -69 -76 -61 -73 8 3 51 17 95 31 207 66 549 75 718 20 27 -9 51 -14 53 -11 3 3 -2 29 -10 58 -31 105 -12 261 43 337 26 36 26 42 4 40 -10 -1 -56 -4 -103 -8z" />
      <path d="M1295 3183 c-23 -157 -146 -303 -330 -394 -113 -56 -202 -72 -346 -65 -64 3 -124 9 -133 12 -11 4 -16 1 -16 -10 0 -9 4 -16 9 -16 18 0 123 -104 165 -164 24 -34 65 -103 90 -154 54 -108 37 -104 196 -45 146 54 307 136 409 209 83 59 371 327 371 345 0 4 -26 22 -57 39 -93 53 -162 108 -253 202 -48 48 -89 88 -92 88 -3 0 -9 -21 -13 -47z" />
      <path d="M4703 2856 c-23 -30 -71 -76 -107 -103 -36 -26 -65 -51 -66 -54 0 -4 17 -18 38 -32 46 -31 97 -79 143 -136 l36 -44 71 74 c38 41 88 88 111 104 22 17 41 32 41 35 0 3 -26 23 -57 45 -31 22 -78 67 -106 100 -27 33 -53 61 -56 62 -3 2 -25 -22 -48 -51z" />
      <path d="M5950 2741 c0 -2 18 -20 40 -39 81 -68 98 -134 104 -377 2 -93 7 -185 11 -202 8 -33 25 -46 25 -18 0 8 12 44 26 81 47 115 142 192 285 229 55 15 119 17 465 16 317 0 414 -4 464 -15 35 -9 66 -13 68 -11 2 2 -1 35 -8 72 -6 37 -10 113 -9 168 l3 100 -737 0 c-405 0 -737 -2 -737 -4z" />
      <path d="M6807 2153 c-6 -204 -23 -302 -73 -418 -19 -45 -34 -83 -34 -86 0 -3 19 -5 43 -4 23 1 128 2 233 3 l191 2 11 58 c7 31 28 172 47 312 20 140 38 267 41 283 l6 27 -230 0 -229 0 -6 -177z" />
      <path d="M1610 2304 c-81 -16 -265 -22 -387 -11 l-93 8 25 -48 c37 -71 48 -150 42 -298 -6 -143 -25 -222 -76 -310 -67 -117 -209 -234 -326 -269 -33 -10 -71 -21 -85 -26 l-25 -8 29 -11 c46 -19 140 -122 171 -190 16 -33 33 -61 39 -61 21 0 212 97 301 153 76 47 315 229 379 288 16 16 17 23 7 66 -16 65 -17 471 -2 543 12 60 63 158 86 167 21 7 19 23 -2 22 -10 -1 -47 -7 -83 -15z" />
      <path d="M5513 2081 c36 -73 39 -84 33 -133 -4 -30 -16 -69 -26 -86 -28 -45 -94 -90 -146 -98 -24 -3 -44 -9 -44 -13 0 -3 36 -25 79 -49 86 -47 267 -181 400 -295 95 -81 156 -165 165 -229 8 -51 -15 -148 -45 -189 -28 -40 -7 -36 43 8 98 87 301 274 408 377 63 61 143 136 178 167 34 31 62 59 62 62 0 4 -34 7 -76 7 -230 0 -492 110 -739 310 -204 166 -231 187 -270 213 -22 15 -44 27 -50 27 -6 0 7 -36 28 -79z" />
      <path d="M4800 855 c-164 -53 -169 -250 -8 -298 29 -8 73 -21 97 -29 57 -17 72 -39 47 -67 -30 -33 -87 -28 -164 14 -35 20 -65 35 -66 33 -1 -2 -14 -20 -29 -40 -15 -20 -27 -41 -27 -47 0 -19 76 -72 124 -86 142 -43 273 11 307 125 10 33 9 46 -5 85 -21 54 -52 78 -131 99 -33 9 -77 21 -97 27 -58 15 -50 58 14 74 20 5 45 -1 92 -23 l64 -30 36 44 36 43 -32 24 c-81 60 -174 79 -258 52z" />
      <path d="M5536 851 c-59 -24 -85 -46 -102 -88 -29 -69 -8 -146 49 -182 19 -12 70 -30 112 -41 85 -22 105 -33 105 -61 0 -49 -85 -51 -174 -5 l-65 34 -37 -45 -38 -46 35 -28 c121 -101 328 -87 395 27 22 37 26 54 22 95 -7 65 -43 104 -115 124 -29 8 -78 22 -108 30 -47 13 -55 19 -55 39 0 17 9 27 30 36 26 11 39 10 93 -9 103 -36 102 -36 116 -3 7 17 20 33 28 37 14 5 13 9 -6 29 -62 66 -195 93 -285 57z" />
      <path d="M6784 852 c-114 -40 -184 -137 -184 -256 0 -108 46 -187 138 -239 137 -77 309 -26 387 114 26 47 30 64 30 129 -1 91 -22 138 -91 199 -78 68 -180 87 -280 53z m176 -138 c62 -52 75 -115 40 -184 -68 -134 -260 -87 -260 64 0 90 54 146 142 146 36 0 54 -6 78 -26z" />
      <path d="M2540 840 c-15 -29 -13 -483 3 -504 10 -13 34 -14 177 -8 l165 7 3 34 c2 19 1 44 -2 57 -6 23 -9 24 -111 24 l-105 0 0 193 c0 137 -3 196 -12 205 -7 7 -33 12 -60 12 -37 0 -50 -4 -58 -20z" />
      <path d="M3052 848 c-9 -9 -12 -77 -12 -254 0 -208 2 -245 16 -258 13 -14 38 -15 171 -11 86 3 160 8 165 11 4 3 8 27 8 55 l0 49 -109 0 c-120 0 -121 0 -121 73 l0 27 95 0 c106 0 119 9 113 73 l-3 32 -100 5 -100 5 0 40 0 40 110 5 110 5 0 55 0 55 -165 3 c-120 2 -169 -1 -178 -10z" />
      <path d="M3575 850 c-6 -10 45 -206 114 -435 l27 -90 44 -2 c25 -1 52 1 62 3 18 5 37 48 63 146 10 37 21 65 25 63 5 -3 14 -29 20 -57 7 -29 21 -76 32 -105 l19 -52 54 2 c30 1 59 7 64 12 5 6 35 100 66 210 31 110 63 220 70 245 18 58 8 70 -62 70 -52 0 -55 -1 -67 -32 -7 -18 -24 -79 -36 -135 -13 -57 -26 -103 -29 -103 -3 0 -20 60 -36 133 l-30 132 -59 0 -60 0 -34 -139 c-22 -86 -38 -133 -43 -124 -4 7 -21 67 -38 132 -16 66 -35 123 -43 127 -19 12 -116 11 -123 -1z" />
      <path d="M4392 848 c-18 -18 -17 -501 2 -517 15 -13 92 -9 107 6 5 5 8 113 7 264 l-3 254 -50 3 c-30 2 -55 -2 -63 -10z" />
      <path d="M6017 854 c-13 -13 -8 -509 5 -522 14 -14 77 -16 97 -3 10 6 13 28 12 76 -1 36 1 82 5 101 l6 34 79 0 79 0 0 -98 c0 -63 4 -102 12 -110 16 -16 93 -15 107 2 8 9 11 88 9 267 l-3 254 -60 0 -60 0 -3 -97 -3 -98 -79 0 -79 0 -3 98 -3 97 -55 3 c-31 2 -59 0 -63 -4z" />
      <path d="M7305 850 c-11 -18 -10 -509 2 -521 6 -6 32 -9 59 -7 l49 3 5 95 5 95 65 6 c109 9 166 48 187 129 19 73 -12 146 -78 185 -28 16 -56 21 -160 23 -88 3 -129 0 -134 -8z m229 -126 c37 -36 2 -84 -67 -91 l-47 -6 0 57 0 56 49 0 c32 0 55 -6 65 -16z" />
      <path d="M2190 673 c-42 -13 -62 -30 -77 -65 l-17 -38 -580 -1 c-320 -1 -585 -1 -590 0 -30 6 -49 -52 -20 -63 9 -3 282 -6 608 -6 l593 0 23 -25 c47 -50 145 -40 181 19 39 64 17 146 -48 172 -34 15 -48 16 -73 7z" />
      <path d="M7912 663 c-58 -28 -79 -102 -47 -163 20 -38 43 -50 101 -50 36 0 54 6 72 23 l24 22 595 5 c542 5 597 7 606 22 8 12 7 21 -2 32 -12 14 -77 16 -595 16 l-581 1 -18 38 c-11 25 -30 45 -51 55 -42 20 -62 20 -104 -1z" />
    </g>
  </svg>
);

export const LogoIconLight = ({ width = '16.2rem', height = '5.8rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width={width}
    height={height}
    viewBox="0 0 1024.000000 405.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="translate(0.000000,405.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
      <path d="M2213 3956 c-139 -96 -279 -147 -462 -167 -176 -19 -685 -16 -948 6 -46 4 -83 3 -83 -2 0 -4 31 -21 68 -38 53 -24 89 -52 175 -135 59 -58 123 -113 141 -122 28 -14 76 -17 338 -20 169 -2 309 -6 312 -9 4 -3 6 -557 6 -1231 0 -1315 0 -1310 -50 -1412 -11 -22 -17 -42 -14 -45 3 -3 33 23 67 59 234 248 305 315 405 379 48 30 51 35 38 50 -45 50 -46 58 -46 665 l0 576 77 1 c141 2 298 -2 303 -8 10 -10 0 -1158 -11 -1228 -11 -76 -62 -253 -86 -298 -8 -16 -12 -31 -9 -34 3 -3 38 24 78 61 134 121 261 204 376 244 l32 11 1 98 c5 687 10 1147 12 1149 2 3 240 6 341 4 l38 0 -5 -377 c-4 -290 -8 -390 -19 -428 -39 -133 -160 -308 -269 -392 -27 -20 -49 -40 -49 -43 0 -4 28 -2 63 3 34 5 123 10 197 10 154 2 219 -13 288 -63 44 -32 106 -118 118 -164 9 -39 19 -32 38 32 29 91 83 186 148 256 63 69 183 156 242 176 20 6 36 15 36 19 0 10 -127 37 -240 51 -47 6 -100 13 -117 16 l-33 5 0 595 0 595 -387 -3 -388 -3 -3 78 -3 77 58 1 c32 0 161 1 287 1 255 0 303 8 348 57 42 47 59 123 67 306 8 152 10 168 37 220 35 71 134 173 198 204 26 13 44 27 39 31 -4 4 -35 4 -68 -1 -159 -23 -422 -39 -641 -39 l-242 0 -26 53 c-69 142 -176 192 -396 185 l-105 -3 49 -24 c26 -13 64 -40 83 -59 36 -36 90 -138 79 -149 -3 -3 -93 -6 -201 -5 -139 0 -197 -3 -202 -11 -8 -13 -72 -290 -68 -295 1 -1 30 5 64 14 34 8 104 17 156 18 l95 3 0 -59 c0 -68 24 -61 -208 -62 -148 -1 -163 1 -168 17 -10 31 -1 328 12 404 13 74 36 128 86 201 16 23 25 42 21 42 -4 0 -36 -20 -70 -44z m1075 -540 c7 -84 15 -81 -183 -83 l-175 -2 0 58 c0 32 3 61 7 64 3 4 83 6 177 5 l171 -3 3 -39z m-767 -225 c18 -1 20 -7 17 -48 l-3 -48 -185 0 -185 0 0 45 0 45 110 5 c96 4 170 5 246 1z m749 -61 l-11 -40 -164 0 -165 0 0 50 0 50 168 2 c124 2 169 0 175 -9 4 -7 3 -31 -3 -53z m-730 -252 l0 -78 -42 -1 c-24 -1 -108 -2 -188 -2 l-145 -1 -3 76 -3 77 58 3 c32 2 118 3 190 3 l133 0 0 -77z" />
      <path d="M3980 3975 c0 -4 16 -26 35 -49 62 -76 69 -108 69 -321 0 -156 -4 -209 -22 -297 -50 -242 -133 -424 -249 -548 l-33 -36 107 -74 c200 -140 254 -160 321 -120 64 39 167 232 225 420 53 175 69 295 74 568 l5 253 -33 12 c-19 6 -98 44 -176 84 -78 39 -162 78 -185 86 -51 17 -138 31 -138 22z" />
      <path d="M7849 3877 c-86 -56 -153 -77 -245 -77 -41 0 -74 -2 -74 -5 0 -3 18 -22 41 -42 52 -47 108 -120 200 -259 79 -120 115 -164 137 -164 8 0 37 21 65 46 63 56 119 89 222 131 44 18 81 36 83 41 1 4 -17 17 -40 29 -65 31 -177 141 -252 247 -38 53 -69 96 -70 96 0 0 -31 -20 -67 -43z" />
      <path d="M5346 3856 c-30 -103 1 -96 -412 -97 l-361 -1 8 -47 c12 -70 9 -236 -5 -329 -12 -80 -12 -82 8 -76 47 15 372 22 705 15 l54 -1 -7 -46 c-16 -121 -137 -418 -246 -604 -126 -216 -373 -483 -572 -618 -184 -125 -320 -181 -498 -205 l-95 -13 51 -27 c71 -36 194 -137 245 -200 69 -86 93 -149 94 -242 0 -62 -5 -91 -22 -127 -12 -27 -18 -48 -12 -48 5 0 42 34 82 76 39 42 148 138 241 213 347 278 525 455 711 706 165 222 282 435 422 770 86 208 155 325 205 354 15 9 28 19 28 22 0 3 -47 17 -105 31 -57 15 -138 42 -179 62 l-74 36 12 53 c17 74 54 143 104 194 23 24 42 45 42 47 0 2 -17 7 -37 10 -85 15 -213 60 -290 102 l-82 44 -15 -54z" />
      <path d="M8620 3835 c0 -46 -46 -131 -107 -196 -36 -38 -72 -69 -79 -69 -8 0 -14 -4 -14 -8 0 -5 71 -30 158 -56 180 -55 171 -53 237 -61 27 -3 51 -8 52 -9 2 -2 4 -405 4 -897 0 -1025 11 -917 -103 -938 -129 -24 -311 -29 -1048 -29 -415 0 -814 -1 -886 -1 l-131 -1 -5 -74 c-4 -55 -13 -90 -33 -133 -28 -56 -134 -175 -165 -185 -8 -3 -12 -8 -9 -12 4 -4 43 -2 89 3 68 9 852 13 2133 11 103 0 137 -3 137 -13 0 -6 -13 -53 -29 -102 -17 -49 -28 -91 -26 -93 5 -5 63 61 166 188 173 215 333 374 438 436 17 10 31 22 31 26 0 5 -29 6 -64 2 l-64 -7 1 854 c0 470 4 890 7 934 5 54 16 98 34 136 34 70 117 173 179 219 51 39 59 53 24 45 -89 -23 -566 -26 -717 -5 -47 6 -110 20 -140 31 -65 23 -70 23 -70 4z" />
      <path d="M7423 3515 c-67 -70 -220 -114 -342 -99 l-54 7 59 -53 c168 -152 301 -332 367 -500 51 -130 60 -207 62 -555 3 -361 -6 -500 -35 -597 -11 -36 -20 -68 -20 -71 0 -2 91 -3 203 -1 111 2 217 4 235 4 l32 0 0 383 c0 210 3 399 6 419 l6 37 37 -24 c106 -73 226 13 379 267 44 73 78 135 76 137 -2 2 -30 -5 -61 -15 -43 -14 -87 -19 -173 -19 -106 0 -120 2 -172 28 -78 38 -134 103 -257 298 -107 170 -232 334 -281 369 -15 11 -30 20 -32 19 -1 0 -17 -15 -35 -34z" />
      <path d="M6850 3450 c-47 -4 -212 -6 -368 -5 -251 1 -282 -1 -276 -15 29 -68 35 -99 30 -150 -10 -79 -40 -134 -125 -224 -42 -43 -69 -76 -61 -73 8 3 51 17 95 31 207 66 549 75 718 20 27 -9 51 -14 53 -11 3 3 -2 29 -10 58 -31 105 -12 261 43 337 26 36 26 42 4 40 -10 -1 -56 -4 -103 -8z" />
      <path d="M1295 3183 c-23 -157 -146 -303 -330 -394 -113 -56 -202 -72 -346 -65 -64 3 -124 9 -133 12 -11 4 -16 1 -16 -10 0 -9 4 -16 9 -16 18 0 123 -104 165 -164 24 -34 65 -103 90 -154 54 -108 37 -104 196 -45 146 54 307 136 409 209 83 59 371 327 371 345 0 4 -26 22 -57 39 -93 53 -162 108 -253 202 -48 48 -89 88 -92 88 -3 0 -9 -21 -13 -47z" />
      <path d="M4703 2856 c-23 -30 -71 -76 -107 -103 -36 -26 -65 -51 -66 -54 0 -4 17 -18 38 -32 46 -31 97 -79 143 -136 l36 -44 71 74 c38 41 88 88 111 104 22 17 41 32 41 35 0 3 -26 23 -57 45 -31 22 -78 67 -106 100 -27 33 -53 61 -56 62 -3 2 -25 -22 -48 -51z" />
      <path d="M5950 2741 c0 -2 18 -20 40 -39 81 -68 98 -134 104 -377 2 -93 7 -185 11 -202 8 -33 25 -46 25 -18 0 8 12 44 26 81 47 115 142 192 285 229 55 15 119 17 465 16 317 0 414 -4 464 -15 35 -9 66 -13 68 -11 2 2 -1 35 -8 72 -6 37 -10 113 -9 168 l3 100 -737 0 c-405 0 -737 -2 -737 -4z" />
      <path d="M6807 2153 c-6 -204 -23 -302 -73 -418 -19 -45 -34 -83 -34 -86 0 -3 19 -5 43 -4 23 1 128 2 233 3 l191 2 11 58 c7 31 28 172 47 312 20 140 38 267 41 283 l6 27 -230 0 -229 0 -6 -177z" />
      <path d="M1610 2304 c-81 -16 -265 -22 -387 -11 l-93 8 25 -48 c37 -71 48 -150 42 -298 -6 -143 -25 -222 -76 -310 -67 -117 -209 -234 -326 -269 -33 -10 -71 -21 -85 -26 l-25 -8 29 -11 c46 -19 140 -122 171 -190 16 -33 33 -61 39 -61 21 0 212 97 301 153 76 47 315 229 379 288 16 16 17 23 7 66 -16 65 -17 471 -2 543 12 60 63 158 86 167 21 7 19 23 -2 22 -10 -1 -47 -7 -83 -15z" />
      <path d="M5513 2081 c36 -73 39 -84 33 -133 -4 -30 -16 -69 -26 -86 -28 -45 -94 -90 -146 -98 -24 -3 -44 -9 -44 -13 0 -3 36 -25 79 -49 86 -47 267 -181 400 -295 95 -81 156 -165 165 -229 8 -51 -15 -148 -45 -189 -28 -40 -7 -36 43 8 98 87 301 274 408 377 63 61 143 136 178 167 34 31 62 59 62 62 0 4 -34 7 -76 7 -230 0 -492 110 -739 310 -204 166 -231 187 -270 213 -22 15 -44 27 -50 27 -6 0 7 -36 28 -79z" />
      <path d="M4800 855 c-164 -53 -169 -250 -8 -298 29 -8 73 -21 97 -29 57 -17 72 -39 47 -67 -30 -33 -87 -28 -164 14 -35 20 -65 35 -66 33 -1 -2 -14 -20 -29 -40 -15 -20 -27 -41 -27 -47 0 -19 76 -72 124 -86 142 -43 273 11 307 125 10 33 9 46 -5 85 -21 54 -52 78 -131 99 -33 9 -77 21 -97 27 -58 15 -50 58 14 74 20 5 45 -1 92 -23 l64 -30 36 44 36 43 -32 24 c-81 60 -174 79 -258 52z" />
      <path d="M5536 851 c-59 -24 -85 -46 -102 -88 -29 -69 -8 -146 49 -182 19 -12 70 -30 112 -41 85 -22 105 -33 105 -61 0 -49 -85 -51 -174 -5 l-65 34 -37 -45 -38 -46 35 -28 c121 -101 328 -87 395 27 22 37 26 54 22 95 -7 65 -43 104 -115 124 -29 8 -78 22 -108 30 -47 13 -55 19 -55 39 0 17 9 27 30 36 26 11 39 10 93 -9 103 -36 102 -36 116 -3 7 17 20 33 28 37 14 5 13 9 -6 29 -62 66 -195 93 -285 57z" />
      <path d="M6784 852 c-114 -40 -184 -137 -184 -256 0 -108 46 -187 138 -239 137 -77 309 -26 387 114 26 47 30 64 30 129 -1 91 -22 138 -91 199 -78 68 -180 87 -280 53z m176 -138 c62 -52 75 -115 40 -184 -68 -134 -260 -87 -260 64 0 90 54 146 142 146 36 0 54 -6 78 -26z" />
      <path d="M2540 840 c-15 -29 -13 -483 3 -504 10 -13 34 -14 177 -8 l165 7 3 34 c2 19 1 44 -2 57 -6 23 -9 24 -111 24 l-105 0 0 193 c0 137 -3 196 -12 205 -7 7 -33 12 -60 12 -37 0 -50 -4 -58 -20z" />
      <path d="M3052 848 c-9 -9 -12 -77 -12 -254 0 -208 2 -245 16 -258 13 -14 38 -15 171 -11 86 3 160 8 165 11 4 3 8 27 8 55 l0 49 -109 0 c-120 0 -121 0 -121 73 l0 27 95 0 c106 0 119 9 113 73 l-3 32 -100 5 -100 5 0 40 0 40 110 5 110 5 0 55 0 55 -165 3 c-120 2 -169 -1 -178 -10z" />
      <path d="M3575 850 c-6 -10 45 -206 114 -435 l27 -90 44 -2 c25 -1 52 1 62 3 18 5 37 48 63 146 10 37 21 65 25 63 5 -3 14 -29 20 -57 7 -29 21 -76 32 -105 l19 -52 54 2 c30 1 59 7 64 12 5 6 35 100 66 210 31 110 63 220 70 245 18 58 8 70 -62 70 -52 0 -55 -1 -67 -32 -7 -18 -24 -79 -36 -135 -13 -57 -26 -103 -29 -103 -3 0 -20 60 -36 133 l-30 132 -59 0 -60 0 -34 -139 c-22 -86 -38 -133 -43 -124 -4 7 -21 67 -38 132 -16 66 -35 123 -43 127 -19 12 -116 11 -123 -1z" />
      <path d="M4392 848 c-18 -18 -17 -501 2 -517 15 -13 92 -9 107 6 5 5 8 113 7 264 l-3 254 -50 3 c-30 2 -55 -2 -63 -10z" />
      <path d="M6017 854 c-13 -13 -8 -509 5 -522 14 -14 77 -16 97 -3 10 6 13 28 12 76 -1 36 1 82 5 101 l6 34 79 0 79 0 0 -98 c0 -63 4 -102 12 -110 16 -16 93 -15 107 2 8 9 11 88 9 267 l-3 254 -60 0 -60 0 -3 -97 -3 -98 -79 0 -79 0 -3 98 -3 97 -55 3 c-31 2 -59 0 -63 -4z" />
      <path d="M7305 850 c-11 -18 -10 -509 2 -521 6 -6 32 -9 59 -7 l49 3 5 95 5 95 65 6 c109 9 166 48 187 129 19 73 -12 146 -78 185 -28 16 -56 21 -160 23 -88 3 -129 0 -134 -8z m229 -126 c37 -36 2 -84 -67 -91 l-47 -6 0 57 0 56 49 0 c32 0 55 -6 65 -16z" />
      <path d="M2190 673 c-42 -13 -62 -30 -77 -65 l-17 -38 -580 -1 c-320 -1 -585 -1 -590 0 -30 6 -49 -52 -20 -63 9 -3 282 -6 608 -6 l593 0 23 -25 c47 -50 145 -40 181 19 39 64 17 146 -48 172 -34 15 -48 16 -73 7z" />
      <path d="M7912 663 c-58 -28 -79 -102 -47 -163 20 -38 43 -50 101 -50 36 0 54 6 72 23 l24 22 595 5 c542 5 597 7 606 22 8 12 7 21 -2 32 -12 14 -77 16 -595 16 l-581 1 -18 38 c-11 25 -30 45 -51 55 -42 20 -62 20 -104 -1z" />
    </g>
  </svg>
);

export const CartBlankIcon = ({ width = '2rem', height = '3.2rem', className }) => (
  <svg width={width} height={height} viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="vuesax/linear/bag-2">
      <g id="bag-2">
        <path
          id="Vector"
          d="M20 20.9534V18.3667C20 12.3667 24.8267 6.47336 30.8267 5.91336C37.9733 5.22002 44 10.8467 44 17.86V21.54"
          stroke="#05422C"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M24 59.1663H40C50.72 59.1663 52.64 54.873 53.2 49.6463L55.2 33.6463C55.92 27.1397 54.0534 21.833 42.6667 21.833H21.3334C9.94669 21.833 8.08003 27.1397 8.80003 33.6463L10.8 49.6463C11.36 54.873 13.28 59.1663 24 59.1663Z"
          stroke="#05422C"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M41.3211 32.5003H41.3451"
          stroke="#05422C"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M22.6522 32.5003H22.6761"
          stroke="#05422C"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const UploadIcon = ({ width = '2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.1571 13.8359L21.9247 12.3786C21.4686 9.51917 18.9876 7.3335 16 7.3335C12.6863 7.3335 10 10.0197 9.99996 13.3334L10.0011 15.2304L8.11578 15.3398C6.19293 15.4513 4.66663 17.0482 4.66663 19.0002C4.66663 21.0252 6.30825 22.6668 8.33329 22.6668H15.3333V17.0813L14.1785 18.236C13.9182 18.4964 13.4961 18.4964 13.2357 18.236L12.7643 17.7646C12.504 17.5043 12.504 17.0822 12.7643 16.8218L15.862 13.7242C16.1223 13.4638 16.5444 13.4638 16.8048 13.7242L19.9024 16.8218C20.1628 17.0822 20.1628 17.5043 19.9024 17.7646L19.431 18.236C19.1706 18.4964 18.7485 18.4964 18.4882 18.236L17.3333 17.0811V22.6668H23C25.3932 22.6668 27.3333 20.7267 27.3333 18.3335C27.3333 16.151 25.7179 14.3423 23.6181 14.0437L22.1571 13.8359ZM8.33329 24.6668H15.3333H17.3333H23C26.4978 24.6668 29.3333 21.8313 29.3333 18.3335C29.3333 15.1411 26.9714 12.5005 23.8997 12.0636C23.2913 8.24881 19.9861 5.3335 16 5.3335C11.5817 5.3335 7.99996 8.91522 7.99996 13.3335L7.99996 13.3431C5.0255 13.5157 2.66663 15.9824 2.66663 19.0002C2.66663 22.1298 5.20368 24.6668 8.33329 24.6668Z"
    ></path>
  </svg>
);

export const MessageIcon = ({ width = '2.6rem', height = '2.6rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.17877 7.17357C2.50304 6.45894 3.21528 6 4.00003 6H44C44.713 6 45.372 6.37952 45.7299 6.99615C46.0877 7.61278 46.0902 8.37327 45.7365 8.99228L25.7365 43.9923C25.3423 44.6821 24.5772 45.0732 23.7872 44.9886C22.9972 44.9041 22.3321 44.3599 22.0929 43.6023L16.219 25.0017L2.49488 9.31701C1.97811 8.72642 1.85449 7.88819 2.17877 7.17357ZM20.377 24.8856L24.531 38.0397L40.5537 10H8.40757L18.3918 21.4106L30.1002 14.2054C30.5705 13.9159 31.1865 14.0626 31.4759 14.533L32.5241 16.2363C32.8136 16.7066 32.6669 17.3226 32.1966 17.612L20.377 24.8856Z"
    ></path>
  </svg>
);

export const InboxIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z"
    ></path>
  </svg>
);

// export const SearchIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
//   <svg
//     className={className}
//     width={width}
//     height={height}
//     viewBox="0 0 48 48"
//     fill="currentColor"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
//     ></path>
//   </svg>
// );

export const ProfileIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"
    ></path>
  </svg>
);

export const CoinIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0002 2.49992C5.85803 2.49992 2.50016 5.85778 2.50016 9.99992C2.50016 14.1421 5.85803 17.4999 10.0002 17.4999C14.1423 17.4999 17.5002 14.1421 17.5002 9.99992C17.5002 5.85778 14.1423 2.49992 10.0002 2.49992ZM0.833496 9.99992C0.833496 4.93731 4.93755 0.833252 10.0002 0.833252C15.0628 0.833252 19.1668 4.93731 19.1668 9.99992C19.1668 15.0625 15.0628 19.1666 10.0002 19.1666C4.93755 19.1666 0.833496 15.0625 0.833496 9.99992Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.141 4.99992C12.141 6.27424 13.2115 7.3484 14.5835 7.3484V9.01507C13.6736 9.01507 12.8267 8.72389 12.141 8.22854V11.4961C12.141 13.2238 10.7059 14.5833 8.98723 14.5833C7.26852 14.5833 5.8335 13.2238 5.8335 11.4961C5.8335 9.76845 7.26852 8.40901 8.98723 8.40901V10.0757C8.1429 10.0757 7.50016 10.7343 7.50016 11.4961C7.50016 12.2579 8.1429 12.9166 8.98723 12.9166C9.83156 12.9166 10.4743 12.2579 10.4743 11.4961V4.99992H12.141Z"
    ></path>
  </svg>
);

export const SettingsIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.375 44.2391C21.375 44.6593 21.7157 45 22.1359 45H25.8641C26.2843 45 26.625 44.6593 26.625 44.2391V41.3044C29.4979 40.8723 32.1421 39.7417 34.3792 38.0912L36.4554 40.1674C36.7525 40.4646 37.2343 40.4646 37.5314 40.1674L40.1677 37.5311C40.4648 37.234 40.4648 36.7522 40.1677 36.4551L38.0915 34.3789C39.7419 32.1418 40.8723 29.4978 41.3044 26.625H44.2391C44.6593 26.625 45 26.2843 45 25.8641V22.1359C45 21.7157 44.6593 21.375 44.2391 21.375H41.3044C40.8723 18.5021 39.7418 15.858 38.0913 13.6209L40.1673 11.5449C40.4644 11.2478 40.4644 10.766 40.1673 10.4689L37.531 7.83262C37.2339 7.53548 36.7521 7.53548 36.455 7.83262L34.379 9.90863C32.1419 8.25818 29.4978 7.1277 26.625 6.69556V3.76087C26.625 3.34065 26.2843 3 25.8641 3H22.1359C21.7156 3 21.375 3.34065 21.375 3.76087V6.69556C18.5022 7.1277 15.8582 8.25815 13.6211 9.90854L11.5452 7.83265C11.2481 7.53551 10.7664 7.53551 10.4692 7.83265L7.83294 10.4689C7.5358 10.7661 7.5358 11.2478 7.83294 11.545L9.90878 13.6208C8.25826 15.8579 7.12772 18.5021 6.69556 21.375H3.76087C3.34065 21.375 3 21.7157 3 22.1359V25.8641C3 26.2843 3.34065 26.625 3.76087 26.625H6.69556C7.1277 29.4978 8.25819 32.1419 9.90863 34.379L7.83255 36.4551C7.53541 36.7522 7.53541 37.234 7.83255 37.5311L10.4688 40.1674C10.766 40.4645 11.2477 40.4645 11.5449 40.1674L13.6209 38.0913C15.858 39.7418 18.5021 40.8723 21.375 41.3044V44.2391ZM24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38Z"
    ></path>
  </svg>
);

export const LanguageIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 2C7.68629 2 5 4.68629 5 8V40C5 43.3137 7.68629 46 11 46H37C40.3137 46 43 43.3137 43 40V8C43 4.68629 40.3137 2 37 2H11ZM9 8C9 6.89543 9.89543 6 11 6H37C38.1046 6 39 6.89543 39 8V40C39 41.1046 38.1046 42 37 42H11C9.89543 42 9 41.1046 9 40V8ZM26.063 14.1175C25.7306 13.4415 25.0465 13.0096 24.2933 13.0002C23.54 12.9907 22.8453 13.4054 22.4961 14.0729L15.6945 27.0746L12.4672 33.1814C12.2092 33.6697 12.3958 34.2747 12.8841 34.5328L14.6524 35.4672C15.1407 35.7253 15.7457 35.5386 16.0038 35.0503L18.6718 30.0017H29.4421L32.0324 35.0274C32.2854 35.5183 32.8885 35.7112 33.3794 35.4581L35.1572 34.5419C35.6481 34.2888 35.8409 33.6858 35.5879 33.1948L32.4477 27.1022L26.063 14.1175ZM27.4492 26.0017H20.77L24.213 19.4202L27.4492 26.0017Z"
    ></path>
  </svg>
);

export const HelpIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM24.0909 15C22.172 15 20.3433 16.2292 19.2617 18.61C19.0332 19.1128 18.4726 19.4 17.9487 19.2253L16.0513 18.5929C15.5274 18.4182 15.2406 17.8497 15.4542 17.3405C16.9801 13.7031 20.0581 11 24.0909 11C28.459 11 32 14.541 32 18.9091C32 21.2138 30.7884 23.4606 29.2167 25.074C27.8157 26.5121 25.5807 27.702 22.9988 27.9518C22.4491 28.0049 22.0001 27.5523 22.0001 27V25C22.0001 24.4477 22.4504 24.0057 22.9955 23.9167C24.2296 23.7153 25.5034 23.1533 26.3515 22.2828C27.4389 21.1666 28 19.8679 28 18.9091C28 16.7502 26.2498 15 24.0909 15ZM24 36C22.3431 36 21 34.6569 21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33C27 34.6569 25.6569 36 24 36Z"
    ></path>
  </svg>
);

export const ShortcutsIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24ZM24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2ZM15 14C14.4477 14 14 14.4477 14 15V17C14 17.5523 14.4477 18 15 18H17C17.5523 18 18 17.5523 18 17V15C18 14.4477 17.5523 14 17 14H15ZM14 31C14 30.4477 14.4477 30 15 30H33C33.5523 30 34 30.4477 34 31V33C34 33.5523 33.5523 34 33 34H15C14.4477 34 14 33.5523 14 33V31ZM15 22C14.4477 22 14 22.4477 14 23V25C14 25.5523 14.4477 26 15 26H17C17.5523 26 18 25.5523 18 25V23C18 22.4477 17.5523 22 17 22H15ZM22 15C22 14.4477 22.4477 14 23 14H25C25.5523 14 26 14.4477 26 15V17C26 17.5523 25.5523 18 25 18H23C22.4477 18 22 17.5523 22 17V15ZM23 22C22.4477 22 22 22.4477 22 23V25C22 25.5523 22.4477 26 23 26H25C25.5523 26 26 25.5523 26 25V23C26 22.4477 25.5523 22 25 22H23ZM30 15C30 14.4477 30.4477 14 31 14H33C33.5523 14 34 14.4477 34 15V17C34 17.5523 33.5523 18 33 18H31C30.4477 18 30 17.5523 30 17V15ZM31 22C30.4477 22 30 22.4477 30 23V25C30 25.5523 30.4477 26 31 26H33C33.5523 26 34 25.5523 34 25V23C34 22.4477 33.5523 22 33 22H31Z"
    ></path>
  </svg>
);

export const LogoutIcon = ({ width = '2rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.1716 26L7 26C6.44771 26 6 25.5523 6 25L6 23C6 22.4477 6.44771 22 7 22L24.1716 22L20.2929 18.1213C19.9024 17.7308 19.9024 17.0976 20.2929 16.7071L21.7071 15.2929C22.0976 14.9024 22.7308 14.9024 23.1213 15.2929L30.4142 22.5858C31.1953 23.3668 31.1953 24.6332 30.4142 25.4142L23.1213 32.7071C22.7308 33.0976 22.0976 33.0976 21.7071 32.7071L20.2929 31.2929C19.9024 30.9024 19.9024 30.2692 20.2929 29.8787L24.1716 26ZM36 43L27 43C26.4477 43 26 42.5523 26 42L26 40C26 39.4477 26.4477 39 27 39L36 39C37.1046 39 38 38.1046 38 37L38 11C38 9.89543 37.1046 9 36 9L27 9C26.4477 9 26 8.55228 26 8L26 6C26 5.44771 26.4477 5 27 5L36 5C39.3137 5 42 7.68629 42 11L42 37C42 40.3137 39.3137 43 36 43Z"
    ></path>
  </svg>
);

export const HomeIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    width={width}
    data-e2e=""
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.0484 7.84003C23.6014 7.38666 24.3975 7.38666 24.9504 7.84001L41.051 21.04C41.5411 21.4418 41.7258 22.1082 41.5125 22.705C41.2991 23.3017 40.7338 23.7 40.1 23.7H37.769L36.5769 36.7278C36.4592 38.0149 35.3798 39 34.0873 39H13.9127C12.6202 39 11.5409 38.0149 11.4231 36.7278L10.231 23.7H7.89943C7.2657 23.7 6.70035 23.3017 6.487 22.705C6.27364 22.1083 6.45833 21.4418 6.9484 21.04L23.0484 7.84003ZM23.9995 10.9397L12.0948 20.7H12.969L14.369 36H22.4994V28.3138C22.4994 27.7616 22.9471 27.3138 23.4994 27.3138H24.4994C25.0517 27.3138 25.4994 27.7616 25.4994 28.3138V36H33.631L35.031 20.7H35.9045L23.9995 10.9397Z"
    ></path>
  </svg>
);

export const HomeActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    className={className}
    width={width}
    data-e2e=""
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"
    ></path>
  </svg>
);

export const UserGroupIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    width={width}
    data-e2e=""
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 12.5C15.5897 12.5 13.5849 14.5018 13.5849 17.0345C13.5849 19.5672 15.5897 21.569 18 21.569C20.4103 21.569 22.4151 19.5672 22.4151 17.0345C22.4151 14.5018 20.4103 12.5 18 12.5ZM10.5849 17.0345C10.5849 12.9017 13.8766 9.5 18 9.5C22.1234 9.5 25.4151 12.9017 25.4151 17.0345C25.4151 21.1673 22.1234 24.569 18 24.569C13.8766 24.569 10.5849 21.1673 10.5849 17.0345ZM18 29.8793C14.0801 29.8793 10.7403 32.5616 9.69697 36.2673C9.5473 36.7989 9.03833 37.1708 8.49337 37.0811L7.50662 36.9189C6.96166 36.8292 6.58837 36.3131 6.72325 35.7776C8.00732 30.6788 12.5509 26.8793 18 26.8793C23.449 26.8793 27.9927 30.6788 29.2767 35.7776C29.4116 36.3131 29.0383 36.8292 28.4934 36.9189L27.5066 37.0811C26.9617 37.1708 26.4527 36.7989 26.303 36.2673C25.2597 32.5616 21.9199 29.8793 18 29.8793Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 31.5371C32.2445 31.5371 31.5198 31.668 30.8447 31.9093C30.3246 32.0951 29.7189 31.9243 29.4549 31.4392L28.9769 30.5608C28.713 30.0757 28.8907 29.463 29.4009 29.2516C30.513 28.791 31.7285 28.5371 33 28.5371C37.4554 28.5371 41.1594 31.6303 42.2706 35.7812C42.4135 36.3147 42.0386 36.8308 41.4935 36.9196L40.5065 37.0804C39.9614 37.1692 39.4546 36.7956 39.2894 36.2686C38.4217 33.5 35.91 31.5371 33 31.5371Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 18.5C31.6193 18.5 30.5 19.6193 30.5 21C30.5 22.3807 31.6193 23.5 33 23.5C34.3807 23.5 35.5 22.3807 35.5 21C35.5 19.6193 34.3807 18.5 33 18.5ZM27.5 21C27.5 17.9624 29.9624 15.5 33 15.5C36.0376 15.5 38.5 17.9624 38.5 21C38.5 24.0376 36.0376 26.5 33 26.5C29.9624 26.5 27.5 24.0376 27.5 21Z"
    ></path>
  </svg>
);

export const UserGroupActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    width={width}
    data-e2e=""
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z"></path>
    <path d="M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z"></path>
    <path d="M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z"></path>
    <path d="M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z"></path>
  </svg>
);

export const LiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    width={width}
    data-e2e=""
    height={height}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.78511 10.3334C6.95518 10.3334 6.33301 10.9792 6.33301 11.7143V20.2858C6.33301 21.0209 6.95518 21.6667 7.78511 21.6667H18.5744C19.4043 21.6667 20.0265 21.0209 20.0265 20.2858V17.5602C20.0265 17.1826 20.2392 16.8372 20.5763 16.6672C20.9135 16.4973 21.3177 16.5317 21.6212 16.7563L25.6663 19.7488V12.2513L21.6212 15.2439C21.3177 15.4684 20.9135 15.5029 20.5763 15.3329C20.2392 15.1629 20.0265 14.8175 20.0265 14.4399V11.7143C20.0265 10.9792 19.4043 10.3334 18.5744 10.3334H7.78511ZM25.6855 12.2371C25.6831 12.2388 25.6839 12.2383 25.6839 12.2383L25.6855 12.2371ZM25.6716 12.2177C25.673 12.2212 25.6746 12.2243 25.6763 12.2269C25.6798 12.2324 25.6834 12.2355 25.6855 12.2371L25.6874 12.2383C25.6874 12.2383 25.6865 12.238 25.6839 12.2383M4.33301 11.7143C4.33301 9.81952 5.90653 8.33337 7.78511 8.33337H18.5744C20.453 8.33337 22.0265 9.81953 22.0265 11.7143V12.4562L24.4963 10.629C25.0929 10.1877 25.8879 10.1155 26.5542 10.4359C27.224 10.758 27.6663 11.4325 27.6663 12.1905V19.8096C27.6663 20.5676 27.224 21.2421 26.5542 21.5642C25.888 21.8846 25.0929 21.8124 24.4963 21.371L22.0265 19.5439V20.2858C22.0265 22.1806 20.453 23.6667 18.5744 23.6667H7.78511C5.90653 23.6667 4.33301 22.1806 4.33301 20.2858V11.7143Z"
    ></path>
    <path d="M15 15.134C15.6667 15.5189 15.6667 16.4811 15 16.866L12 18.5981C11.3333 18.983 10.5 18.5019 10.5 17.7321L10.5 14.2679C10.5 13.4981 11.3333 13.017 12 13.4019L15 15.134Z"></path>
  </svg>
);

export const LiveActiveIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
  <svg
    width={width}
    data-e2e=""
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.5 17.5714C6.5 14.7292 8.86029 12.5 11.6782 12.5H27.8621C30.6799 12.5 33.0402 14.7292 33.0402 17.5714V18.6843L36.745 15.9435C37.6399 15.2815 38.8324 15.1731 39.8318 15.6537C40.8365 16.1369 41.5 17.1486 41.5 18.2857V29.7143C41.5 30.8514 40.8365 31.8631 39.8318 32.3463C38.8324 32.8269 37.6399 32.7185 36.745 32.0565L33.0402 29.3158V30.4286C33.0402 33.2708 30.6799 35.5 27.8621 35.5H11.6782C8.86029 35.5 6.5 33.2708 6.5 30.4286V17.5714Z"></path>
    <path
      d="M23.25 23.134C23.9167 23.5189 23.9167 24.4811 23.25 24.866L17.25 28.3301C16.5833 28.715 15.75 28.2339 15.75 27.4641L15.75 20.5359C15.75 19.7661 16.5833 19.285 17.25 19.6699L23.25 23.134Z"
      fill="white"
    ></path>
  </svg>
);

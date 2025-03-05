// 'use client';

// import React from 'react';
// import PropTypes from 'prop-types';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';

// function LatestProducts({ podObj, onUpdate, podcastUser }) {
//   const { user } = useAuth();

//   const deleteThisPodcast = () => {
//     if (window.confirm(`Delete ${podObj.title}?`)) {
//       deletePod(podObj.id).then(() => onUpdate());
//     }
//   };

//   return (
//     <Card className="productCards" style={{ width: '18rem', margin: '10px' }}>
//       <Card.Img variant="top" src={podObj.imageUrl} alt={podObj.title} style={{ height: '400px' }} />
//       <Card.Body>
//         <Card.Title>{podObj.title}</Card.Title>
//         <Card.Title>{podObj.genre.name}</Card.Title>
//         <div className="showdownVotes">
//           <div className="upvotes">
//             <Card.Title>↑</Card.Title>
//           </div>
//           <Card.Title>{podObj.showdownWins}</Card.Title>
//           <div className="downvotes">
//             <Card.Title>↓</Card.Title>
//           </div>
//           <Card.Title>{podObj.showdownLosses}</Card.Title>
//         </div>
//         <div className="userPodBtns">
//           <div className="userPodTopBtns">
//             <Link href={`view-page/${podObj.id}`} passHref>
//               <Button variant="primary" className="m-2">
//                 VIEW
//               </Button>
//             </Link>
//             <Button variant={podObj.favorite ? 'danger' : 'outline-danger'} onClick={doFav}>
//               {podObj.favorite ? '⭐' : '❌'}
//             </Button>
//           </div>
//           <div className="userPodBottomBtns">
//             {user.id === podcastUser && (
//               <>
//                 <Link href={`pod/edit/${podObj.id}`} passHref>
//                   <Button variant="primary" className="m-2">
//                     EDIT
//                   </Button>
//                 </Link>
//                 <Button variant="danger" onClick={deleteThisPodcast}>
//                   DELETE
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// PodCard.propTypes = {
//   podcast: PropTypes.shape({
//     imageUrl: PropTypes.string,
//   }),

//   podObj: PropTypes.shape({
//     showdownWins: PropTypes.number,
//     showdownLosses: PropTypes.number,
//     imageUrl: PropTypes.string,
//     favorite: PropTypes.bool,
//     title: PropTypes.string,
//     userId: PropTypes.string,
//     id: PropTypes.number,
//     genre: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//       }),
//     ),
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   podcastUser: PropTypes.number.isRequired,
// };

// export default PodCard;

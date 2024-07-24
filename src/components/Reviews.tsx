import React from 'react';
import './styles/review.scss';

// Interface for the Review object
interface Review {
  id: string;
  userName: string;
  userImage: string;
  date: string;
  comment: string;
  rating: number; // New property for star rating
}

const Review: React.FC = () => {
  // Array of reviews
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'John Doe',
      userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: 'July 14, 2024',
      comment: 'Great experience! Highly recommended. The service was excellent, and the car was in great condition.',
      rating: 5, // Example rating (out of 5)
    },
    {
      id: '2',
      userName: 'Jane Smith',
      userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      date: 'July 12, 2024',
      comment: 'Excellent service and friendly staff. Will definitely rent from here again!',
      rating: 4,
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      userImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      date: 'July 10, 2024',
      comment: 'Smooth process from start to finish. The booking was easy, and the car pickup was quick.',
      rating: 4.5,
    },
    {
      id: '4',
      userName: 'Emily Brown',
      userImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      date: 'July 8, 2024',
      comment: 'Will definitely rent again! The car selection was good, and the prices were reasonable.',
      rating: 5,
    },
    {
      id: '5',
      userName: 'David Lee',
      userImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      date: 'July 6, 2024',
      comment: 'Had a fantastic experience. Customer service was top-notch, and the car was clean and comfortable.',
      rating: 4.5,
    },
    {
      id: '6',
      userName: 'Sarah Miller',
      userImage: 'https://randomuser.me/api/portraits/women/6.jpg',
      date: 'July 4, 2024',
      comment: 'Great value for money. The rental process was straightforward, and the car was exactly as described.',
      rating: 4,
    },
    {
      id: '7',
      userName: 'Chris Wilson',
      userImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      date: 'July 2, 2024',
      comment: 'Highly satisfied with the service. The staff was helpful, and the car performed well throughout the trip.',
      rating: 4.5,
    },
    {
      id: '8',
      userName: 'Jessica Garcia',
      userImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      date: 'June 30, 2024',
      comment: 'Smooth rental experience. The car was clean, and the return process was quick and efficient.',
      rating: 5,
    },
    {
      id: '9',
      userName: 'Kevin Martinez',
      userImage: 'https://randomuser.me/api/portraits/women/9.jpg',
      date: 'June 28, 2024',
      comment: 'Great customer service and competitive prices. Will definitely use this rental company again.',
      rating: 4,
    },
    {
      id: '10',
      userName: 'Amanda Robinson',
      userImage: 'https://randomuser.me/api/portraits/men/10.jpg',
      date: 'June 26, 2024',
      comment: 'Excellent experience overall. The car was reliable, and the staff was friendly and professional.',
      rating: 4.5,
    },
  ];

  // Function to render star icons based on rating
  const renderStars = (rating: number): React.ReactNode => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="#FFD700" d="M12 2l2.59 6.64H22l-5.3 4.14 2.18 6.56L12 17.27 5.12 19.34l2.18-6.56L2 8.64h7.41L12 2z"/>
        </svg>
      );
    }

    // Half star
    if (halfStar) {
      stars.push(
        <svg key="half" className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="#FFD700" d="M12 2l2.59 6.64H22l-5.3 4.14 2.18 6.56L12 17.27V2z"/>
        </svg>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="#CCCCCC" d="M12 2l2.59 6.64H22l-5.3 4.14 2.18 6.56L12 17.27 5.12 19.34l2.18-6.56L2 8.64h7.41L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="review-container">
      <h1 className="review-title">Customer Reviews</h1>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-content">
              <div className="review-header">
                <img
                  className="review-user-image"
                  src={review.userImage}
                  alt={review.userName}
                />
                <div className="review-user-details">
                  <p className="review-user-name">{review.userName}</p>
                  <p className="review-date">{review.date}</p>
                </div>
              </div>
              <div className="review-stars">
                {renderStars(review.rating)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;

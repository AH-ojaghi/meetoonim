// // src/Card.test.js
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Card from './Card';

// const mockProps = {
//   description: "Sample description",
//   created_at: "2024-07-24",
//   f_name: "John",
//   l_name: "Doe",
//   open_to_image: "sample.jpg",
//   thumbnail: "sample1.jpg,sample2.jpg",
//   comments_count: "5",
//   likes_count: 10,
//   comment: "Sample comment",
//   likes_countComments: 2,
//   open_to_imageComments: "comment.jpg",
//   id_user: 1,
//   id_comments: [1, 2, 3]
// };

// test('renders Card component and checks for elements', () => {
//   render(<Card {...mockProps} />);

//   // Check if user information is rendered
//   expect(screen.getByText(/John/i)).toBeInTheDocument();
//   expect(screen.getByText(/Doe/i)).toBeInTheDocument();
//   expect(screen.getByText(/Sample description/i)).toBeInTheDocument();

//   // Check if images are displayed
//   expect(screen.getAllByAltText(/sample/i)).toHaveLength(3);

//   // Check for dropdown button and menu
//   const dropdownButton = screen.getByRole('button', { name: /three dots/i });
//   expect(dropdownButton).toBeInTheDocument();
  
//   // Simulate click to open dropdown menu
//   fireEvent.click(dropdownButton);
//   const dropdownMenu = screen.getByRole('list');
//   expect(dropdownMenu).toBeVisible();
  
//   // Check for interaction elements (like button, comment button)
//   const likeButton = screen.getByText(/بسندیدن/i);
//   expect(likeButton).toBeInTheDocument();
//   fireEvent.click(likeButton);
//   // Expectation for toggle effect should be added here

//   // Check for comment section
//   const commentSection = screen.getByText(/Sample comment/i);
//   expect(commentSection).toBeInTheDocument();
// });

// test('dropdown menu opens and closes correctly', () => {
//   render(<Card {...mockProps} />);

//   // Open dropdown
//   const dropdownButton = screen.getByRole('button', { name: /three dots/i });
//   fireEvent.click(dropdownButton);
//   expect(screen.getByRole('list')).toHaveClass('max-h-60 opacity-100');

//   // Close dropdown
//   fireEvent.click(document.body);
//   expect(screen.queryByRole('list')).not.toBeVisible();
// });

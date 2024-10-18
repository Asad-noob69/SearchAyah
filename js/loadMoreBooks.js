// const sectionsPerLoad = 2; // Number of sections to show each time
// let currentSection = 2;

// function loadMoreBooks() {
//   const bookContainer = document.getElementById('book-container');
//   const loadMoreButton = document.getElementById('load-more-button');
//   const allSections = Array.from(bookContainer.querySelectorAll('.book-section'));
  
//   const startIndex = (currentSection - 1) * sectionsPerLoad;
//   const endIndex = startIndex + sectionsPerLoad;
//   const sectionsToShow = allSections.slice(startIndex, endIndex);

//   sectionsToShow.forEach(section => {
//     section.style.display = 'block';
//   });

//   currentSection += sectionsPerLoad;

//   // Hide the "Load More" button if all sections have been displayed
//   if (endIndex >= allSections.length) {
//     loadMoreButton.style.display = 'none';
//   }
// }

// // Initial setup
// document.addEventListener('DOMContentLoaded', () => {
//   const bookContainer = document.getElementById('book-container');
//   const allSections = Array.from(bookContainer.querySelectorAll('.book-section'));
  
//   // Hide all sections initially except the first one
//   allSections.forEach((section, index) => {
//     if (index >= sectionsPerLoad) {
//       section.style.display = 'none';
//     }
//   });

//   // Show the "Load More" button if there are more sections to display
//   const loadMoreButton = document.getElementById('load-more-button');
//   if (allSections.length > sectionsPerLoad) {
//     loadMoreButton.style.display = 'block';
//   } else {
//     loadMoreButton.style.display = 'none';
//   }

//   loadMoreButton.addEventListener('click', loadMoreBooks);
// });
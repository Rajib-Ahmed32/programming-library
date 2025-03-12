# Book Upload and Management App

This is a simple React application for uploading and managing books in PDF format. The app allows users to upload books with metadata (title, author), view book details, and download books.

## Features

- **Upload Book**: Users can upload a book (PDF format), along with its title and author.
- **Book Card**: Each uploaded book is displayed as a card with:
  - Title
  - Author
  - Book cover image
  - View button to read the book
  - Download button to download the PDF
  - Trash button (functionality not implemented yet)
- **Download PDF**: Download the uploaded book by clicking the download button.
- **Local Storage**: All books are stored in the browser's local storage.

## Components

- **BookCard**: Displays individual book details, including the option to view and download the book.
- **UploadForm**: A form to upload a new book, including fields for the book title, author, and PDF file.

## Tech Stack

- React
- TypeScript
- Lucide Icons (for icons)
- React Router (for navigation)
- Tailwind CSS (for styling)

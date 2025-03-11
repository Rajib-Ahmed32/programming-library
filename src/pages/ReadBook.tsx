import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Book {
  id: string;
  title: string;
  author: string;
  fileData: string;
  fileName: string;
  createdAt: string;
}

export function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const foundBook = books.find((b: Book) => b.id === id);
    if (!foundBook) {
      navigate('/');
      return;
    }
    setBook(foundBook);
  }, [id, navigate]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl border border-zinc-800">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">{book.title}</h1>
            <p className="text-blue-400">{book.author}</p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            <span className="text-zinc-300">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex justify-center bg-black rounded-lg p-4">
            <Document
              file={book.fileData}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="max-w-full"
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
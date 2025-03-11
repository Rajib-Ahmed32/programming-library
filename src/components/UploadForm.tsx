import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UploadForm() {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      
      const reader = new FileReader();
      reader.onload = async () => {
        const books = JSON.parse(localStorage.getItem('books') || '[]');
        const newBook = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          author,
          fileData: reader.result,
          fileName: file.name,
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('books', JSON.stringify([...books, newBook]));
        navigate('/');
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Error uploading book');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Book Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="e.g., Clean Code"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="e.g., Robert C. Martin"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">PDF File</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-800 border-dashed rounded-lg hover:border-blue-500 transition-colors bg-black">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-zinc-500" />
            <div className="flex text-sm text-zinc-400">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                <span>Upload a file</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="sr-only"
                  required
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-zinc-500">
              PDF up to 10MB
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Upload Book
          </>
        )}
      </button>
    </form>
  );
}
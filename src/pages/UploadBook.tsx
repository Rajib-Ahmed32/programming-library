import React from 'react';
import { UploadForm } from '../components/UploadForm';
import { Upload } from 'lucide-react';

export function UploadBook() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Upload New Book</h1>
          <p className="text-zinc-400">Share your programming knowledge with the library</p>
        </div>
        <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl border border-zinc-800">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
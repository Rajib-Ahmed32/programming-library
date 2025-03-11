import React, { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import { sampleBooks } from "../utils/sampleBooks";
import icon from "../../asset/icon.png";

export function Home() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-10 lg:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img src={icon} alt="icon" className="h-14" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Programming Library
          </h1>
          <p className="text-zinc-400 text-lg">
            Your personal collection of programming knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 lg:gap-28 gap-10 justify-items-center">
          {sampleBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.cover}
              fileData={book.fileData}
              fileName={book.fileName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Download, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  fileData?: string;
  fileName?: string;
}

export function BookCard({
  id,
  title,
  author,
  coverUrl,
  fileData,
  fileName,
}: BookCardProps) {
  const handleDownload = () => {
    if (!fileData || !fileName) return;

    const link = document.createElement("a");
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group w-[300px] h-[520px] p-2 relative bg-zinc-900 rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl border border-zinc-800">
      <div className="relative h-[350px]">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-[#19DE8B] mb-4">{author}</p>
        <div className="flex gap-5 items-center">
          <Link
            to={`/read/${id}`}
            className="flex items-center gap-2 text-black-400 hover:text-black-300 transition-colors"
          >
            <Eye size={20} className="text-[#19DE8B]" />
          </Link>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Download size={20} className="text-[#00C66C]" />
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-gay-300 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// components/Sidebar.tsx
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { X, BookOpen, Book, BookText, Library, BookMarked, Bookmark } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-[url('/images/darkwood.webp')] text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-amber-300">Book Categories</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 hover:bg-amber-800 rounded-full transition-all"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-amber-300" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <ul className="space-y-2">
            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/books"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <BookOpen size={18} className="mr-2" />
                <span>HomePage</span>
              </Link>
            </li>

            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/books/philosophy"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Book size={18} className="mr-2" />
                <span>Philosophy</span>
              </Link>
            </li>

            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/books/islamic-history"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Library size={18} className="mr-2" />
                <span>Islamic History</span>
              </Link>
            </li>
            
            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/books/islamic-jurisprudence"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <BookMarked size={18} className="mr-2" />
                <span>Islamic Jurisprudence</span>
              </Link>
            </li>

            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/books/theologynmysticism"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <BookOpen size={18} className="mr-2" />
                <span>Theology/Mysticism</span>
              </Link>
            </li>

            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/books/iqbal"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <BookText size={18} className="mr-2" />
                <span>Iqbal</span>
              </Link>
            </li>


            <li className="py-2 border-b border-amber-800/30">
              <Link
                href="/contact"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Bookmark size={18} className="mr-2" />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

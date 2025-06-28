'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { X, BookOpen, Book, BookText, Library, BookMarked, Bookmark, Loader2 } from 'lucide-react';
import { bookApi } from '@/utils/api';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define the categories you want to render inside the component
  const selectedCategories = ['Islamic Jurisprudence', 'Philosophy', 'Islamic-history', 'Iqbal', 'Theologynmysticism', 'Sahaba Books'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await bookApi.getCategories();
        if (response.success) {
          // Filter categories to include only those in selectedCategories
          const filteredCategories = response.data.filter((category: string) =>
            selectedCategories.includes(category)
          );
          // Sort filtered categories to match the order of selectedCategories
          const sortedCategories = selectedCategories.filter((category) =>
            filteredCategories.includes(category)
          );
          setCategories(sortedCategories);
        } else {
          setError('Failed to load categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

            {isLoading ? (
              <li className="py-4 flex justify-center">
                <Loader2 size={24} className="animate-spin text-amber-300" />
              </li>
            ) : error ? (
              <li className="py-2 text-red-400 text-center">{error}</li>
            ) : categories.length === 0 ? (
              <li className="py-2 text-amber-300 text-center">No matching categories found</li>
            ) : (
              categories.map((category, index) => (
                <li key={index} className="py-2 border-b border-amber-800/30">
                  <Link
                    href={`/books/${category.toLowerCase().replace(/[\s&]+/g, '-')}`}
                    className="flex items-center w-full hover:text-amber-300 transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {category.toLowerCase().includes('philosophy') ? (
                      <Book size={18} className="mr-2" />
                    ) : category.toLowerCase().includes('history') ? (
                      <Library size={18} className="mr-2" />
                    ) : category.toLowerCase().includes('jurisprudence') ? (
                      <BookMarked size={18} className="mr-2" />
                    ) : category.toLowerCase().includes('theology') || category.toLowerCase().includes('mysticism') ? (
                      <BookOpen size={18} className="mr-2" />
                    ) : category.toLowerCase() === 'iqbal' ? (
                      <BookText size={18} className="mr-2" />
                    ) : (
                      <BookOpen size={18} className="mr-2" />
                    )}
                    <span>{category}</span>
                  </Link>
                </li>
              ))
            )}

            <li className="py-2 border-b border-amber-800/30">
              <a
                href="https://wa.me/923705764856"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full hover:text-amber-300 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Bookmark size={18} className="mr-2" />
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Upload, Book, Image as ImageIcon, X, Pencil, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bookApi } from "@/utils/api";

// Interfaces to match backend
interface Volume {
  volumeNumber: number;
  downloadUrl: string;
}

interface BookType {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  keywords: string[];
  volumes: Volume[];
  createdAt: Date;
}

export default function AdminDashboard() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    newCategory: "",
    keywords: "",
    imageUrl: "",
  });
  const [volumes, setVolumes] = useState<Volume[]>([{ volumeNumber: 1, downloadUrl: "" }]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUsername, setAuthUsername] = useState("");
  const [authPasscode, setAuthPasscode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Check localStorage for authentication on mount
  useEffect(() => {
    const authToken = localStorage.getItem("adminAuth");
    if (authToken === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle authentication submission
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUsername.trim()) {
      setAuthError("Username is required");
      return;
    }
    if (authPasscode !== "ASAD_BILAL_SEARCHAYAH") {
      setAuthError("Invalid passcode");
      return;
    }
    setIsAuthenticated(true);
    localStorage.setItem("adminAuth", "authenticated");
    setAuthError(null);
    setAuthUsername("");
    setAuthPasscode("");
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  // Fetch books and categories on mount (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const booksResponse = await bookApi.getBooks();
        if (booksResponse.success) {
          setBooks(
            booksResponse.data.map((book: BookType) => ({
              ...book,
              createdAt: new Date(book.createdAt),
            }))
          );
        } else {
          setError(booksResponse.error || "Failed to fetch books");
        }

        const categoriesResponse = await bookApi.getCategories();
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        } else {
          setError(categoriesResponse.error || "Failed to fetch categories");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  // Populate form with book data for editing
  const handleEditBook = (book: BookType) => {
    setEditingBookId(book._id);
    setFormData({
      title: book.title,
      description: book.description,
      category: book.category,
      newCategory: "",
      keywords: book.keywords.join(", "),
      imageUrl: book.imageUrl,
    });
    setVolumes(
      book.volumes.length > 0
        ? book.volumes
        : [{ volumeNumber: 1, downloadUrl: "" }]
    );
    setImagePreview(book.imageUrl);
    setUploadedImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addVolume = () => {
    const newVolumeNumber = volumes.length + 1;
    setVolumes([...volumes, { volumeNumber: newVolumeNumber, downloadUrl: "" }]);
  };

  const removeVolume = (volumeNumber: number) => {
    if (volumes.length > 1) {
      setVolumes(volumes.filter((vol) => vol.volumeNumber !== volumeNumber));
    }
  };

  const updateVolumeLink = (volumeNumber: number, downloadUrl: string) => {
    setVolumes(
      volumes.map((vol) =>
        vol.volumeNumber === volumeNumber ? { ...vol, downloadUrl } : vol
      )
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setUploadedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);

      try {
        const response = await bookApi.uploadFile(file, "image");
        if (response.success) {
          setFormData({ ...formData, imageUrl: response.url });
        } else {
          alert(response.error || "Failed to upload image");
        }
      } catch (err) {
        alert("An error occurred while uploading the image");
      }
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setUploadedImage(null);
    setFormData({ ...formData, imageUrl: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.description || !formData.imageUrl) {
      alert("Please fill in all required fields (title, description, image)");
      return;
    }

    // Validate category
    if (!formData.category && !formData.newCategory) {
      alert("Please select a category or enter a new one");
      return;
    }

    if (formData.newCategory && formData.newCategory.trim().length < 2) {
      alert("New category name must be at least 2 characters long");
      return;
    }

    // Validate keywords
    const keywordsArray = formData.keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);
    if (keywordsArray.length === 0) {
      alert("Please provide at least one keyword");
      return;
    }

    if (volumes.every((vol) => !vol.downloadUrl)) {
      alert("Please add at least one volume with a valid download URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const selectedCategory = formData.newCategory.trim() || formData.category;
      const bookData = {
        title: formData.title,
        description: formData.description,
        category: selectedCategory,
        imageUrl: formData.imageUrl,
        keywords: keywordsArray,
        volumes: volumes.filter((vol) => vol.downloadUrl),
      };

      let response;
      if (editingBookId) {
        response = await bookApi.updateBook(editingBookId, bookData);
        if (response.success) {
          setBooks(
            books.map((book) =>
              book._id === editingBookId
                ? { ...response.data, createdAt: new Date(response.data.createdAt) }
                : book
            )
          );
        }
      } else {
        response = await bookApi.createBook(bookData);
        if (response.success) {
          setBooks([...books, { ...response.data, createdAt: new Date(response.data.createdAt) }]);
        }
      }

      if (response.success) {
        if (formData.newCategory && !categories.includes(selectedCategory)) {
          setCategories([...categories, selectedCategory].sort());
        }
        setFormData({
          title: "",
          description: "",
          category: "",
          newCategory: "",
          keywords: "",
          imageUrl: "",
        });
        setVolumes([{ volumeNumber: 1, downloadUrl: "" }]);
        setImagePreview("");
        setUploadedImage(null);
        setEditingBookId(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setError(response.error || `Failed to ${editingBookId ? "update" : "create"} book`);
      }
    } catch (err) {
      setError(`An error occurred while ${editingBookId ? "updating" : "creating"} the book`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookApi.deleteBook(id);
      if (response.success) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        setError(response.error || "Failed to delete book");
      }
    } catch (err) {
      setError("An error occurred while deleting the book");
    } finally {
      setIsLoading(false);
    }
  };

  // Authentication form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="shadow-lg max-w-md w-full" style={{ border: "1px solid #8cc5c7" }}>
          <CardHeader
            className="text-white rounded-t-lg"
            style={{ background: "linear-gradient(135deg, #67b2b4 0%, #5a9fa1 100%)" }}
          >
            <CardTitle className="flex items-center gap-2 font-[Josefin_Sans]">
              <Book className="h-5 w-5" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-white/90">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authError && (
                <div className="text-red-600 text-center p-2 bg-red-100 rounded-lg">
                  {authError}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="font-medium" style={{ color: "#4d8c8e" }}>
                  Username *
                </Label>
                <Input
                  id="username"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="focus:ring-2"
                  style={
                    {
                      border: "1px solid #8cc5c7",
                      "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                    } as React.CSSProperties
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                  onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passcode" className="font-medium" style={{ color: "#4d8c8e" }}>
                  Passcode *
                </Label>
                <Input
                  id="passcode"
                  type="password"
                  value={authPasscode}
                  onChange={(e) => setAuthPasscode(e.target.value)}
                  placeholder="Enter your passcode"
                  required
                  className="focus:ring-2"
                  style={
                    {
                      border: "1px solid #8cc5c7",
                      "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                    } as React.CSSProperties
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                  onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                />
              </div>
              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium font-[Josefin_Sans] text-white transition-colors"
                style={{ backgroundColor: "#67b2b4" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a9fa1")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#67b2b4")}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-between bg-white rounded-2xl px-8 py-4 shadow-lg w-full"
            style={{ border: "1px solid #8cc5c7" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: "#67b2b4" }}>
                <Book className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900 font-[Josefin_Sans]">
                  Books Admin Dashboard
                </h1>
                <p className="mt-1" style={{ color: "#67b2b4" }}>
                  Manage your book collection
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
              style={{ borderColor: "#67b2b4", color: "#67b2b4" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e6f2f3";
                e.currentTarget.style.borderColor = "#5a9fa1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#67b2b4";
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Upload/Update Section */}
        <Card className="shadow-lg" style={{ border: "1px solid #8cc5c7" }}>
          <CardHeader
            className="text-white rounded-t-lg"
            style={{ background: "linear-gradient(135deg, #67b2b4 0%, #5a9fa1 100%)" }}
          >
            <CardTitle className="flex items-center gap-2 font-[Josefin_Sans]">
              <Upload className="h-5 w-5" />
              {editingBookId ? "Update Book" : "Upload New Book"}
            </CardTitle>
            <CardDescription className="text-white/90">
              {editingBookId
                ? "Edit the details of the selected book"
                : "Add a new book with volumes and links"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-medium" style={{ color: "#4d8c8e" }}>
                    Book Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter book title"
                    required
                    className="focus:ring-2"
                    style={
                      {
                        border: "1px solid #8cc5c7",
                        "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                      } as React.CSSProperties
                    }
                    onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                    onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-medium" style={{ color: "#4d8c8e" }}>
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value, newCategory: "" })
                    }
                    disabled={!!formData.newCategory}
                  >
                    <SelectTrigger
                      className="focus:ring-2"
                      style={
                        {
                          border: "1px solid #8cc5c7",
                          "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                        } as React.CSSProperties
                      }
                      onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                      onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="font-medium" style={{ color: "#4d8c8e" }}>
                    Keywords *
                  </Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="Enter keywords (comma-separated, e.g., fantasy, adventure)"
                    required
                    className="focus:ring-2"
                    style={
                      {
                        border: "1px solid #8cc5c7",
                        "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                      } as React.CSSProperties
                    }
                    onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                    onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-category" className="font-medium" style={{ color: "#4d8c8e" }}>
                    New Category
                  </Label>
                  <Input
                    id="new-category"
                    value={formData.newCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, newCategory: e.target.value, category: "" })
                    }
                    placeholder="Or enter a new category"
                    className="mt-2 focus:ring-2"
                    style={
                      {
                        border: "1px solid #8cc5c7",
                        "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                      } as React.CSSProperties
                    }
                    onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                    onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="font-medium" style={{ color: "#4d8c8e" }}>
                    Book Cover Image *
                  </Label>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full h-9 flex items-center gap-2 transition-colors"
                      style={{
                        border: "1px solid #8cc5c7",
                        color: "#67b2b4",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e6f2f3";
                        e.currentTarget.style.borderColor = "#67b2b4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "#8cc5c7";
                      }}
                    >
                      <ImageIcon className="h-5 w-5" />
                      {uploadedImage || imagePreview ? "Change Image" : "Upload Image"}
                    </Button>

                    {imagePreview && (
                      <div className="relative mt-4">
                        <div
                          className="w-full h-32 rounded-lg overflow-hidden flex items-center justify-center"
                          style={{ border: "2px solid #8cc5c7", backgroundColor: "#f8fffe" }}
                        >
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={removeImage}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 p-1 h-6 w-6"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {uploadedImage && (
                          <p className="text-xs text-gray-500 mt-1">
                            {uploadedImage.name} (
                            {((uploadedImage.size || 0) / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium" style={{ color: "#4d8c8e" }}>
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter book description"
                  rows={3}
                  required
                  className="focus:ring-2"
                  style={
                    {
                      border: "1px solid #8cc5c7",
                      "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                    } as React.CSSProperties
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                  onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                />
              </div>

              {/* Volumes Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium" style={{ color: "#4d8c8e" }}>
                    Volumes
                  </Label>
                  <Button
                    type="button"
                    onClick={addVolume}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 transition-colors"
                    style={{
                      border: "1px solid #67b2b4",
                      color: "#67b2b4",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#67b2b4";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#67b2b4";
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Volume
                  </Button>
                </div>

                <div className="space-y-3">
                  {volumes.map((volume) => (
                    <div
                      key={volume.volumeNumber}
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{
                        border: "1px solid #8cc5c7",
                        backgroundColor: "#e6f2f3",
                      }}
                    >
                      <Badge
                        className="min-w-fit text-white transition-colors"
                        style={{ backgroundColor: "#67b2b4" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a9fa1")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#67b2b4")}
                      >
                        Volume {volume.volumeNumber}
                      </Badge>
                      <Input
                        value={volume.downloadUrl}
                        onChange={(e) => updateVolumeLink(volume.volumeNumber, e.target.value)}
                        placeholder="Enter volume download URL"
                        className="flex-1 bg-white focus:ring-2"
                        style={
                          {
                            border: "1px solid #8cc5c7",
                            "--tw-ring-color": "rgba(103, 178, 180, 0.2)",
                          } as React.CSSProperties
                        }
                        onFocus={(e) => (e.target.style.borderColor = "#67b2b4")}
                        onBlur={(e) => (e.target.style.borderColor = "#8cc5c7")}
                      />
                      {volumes.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeVolume(volume.volumeNumber)}
                          size="sm"
                          variant="destructive"
                          className="p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 text-lg font-medium font-[Josefin_Sans] text-white transition-colors"
                  style={{ backgroundColor: "#67b2b4" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a9fa1")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#67b2b4")}
                >
                  {isLoading ? (
                    editingBookId ? "Updating..." : "Uploading..."
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      {editingBookId ? "Update Book" : "Upload Book"}
                    </>
                  )}
                </Button>
                {editingBookId && (
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData({
                        title: "",
                        description: "",
                        category: "",
                        newCategory: "",
                        keywords: "",
                        imageUrl: "",
                      });
                      setVolumes([{ volumeNumber: 1, downloadUrl: "" }]);
                      setImagePreview("");
                      setUploadedImage(null);
                      setEditingBookId(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    variant="outline"
                    className="flex-1 py-3 text-lg font-medium font-[Josefin_Sans] transition-colors"
                    style={{ borderColor: "#67b2b4", color: "#67b2b4" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e6f2f3";
                      e.currentTarget.style.borderColor = "#5a9fa1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "#67b2b4";
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Books Table */}
        <Card className="shadow-lg" style={{ border: "1px solid #8cc5c7" }}>
          <CardHeader
            className="text-white rounded-t-lg"
            style={{ background: "linear-gradient(135deg, #67b2b4 0%, #5a9fa1 100%)" }}
          >
            <CardTitle className="flex items-center justify-between font-[Josefin_Sans]">
              <span>All Books</span>
              <Badge
                className="text-lg px-4 py-2 border-0"
                style={{
                  backgroundColor: "white",
                  color: "#67b2b4",
                }}
              >
                Total: {books.length}
              </Badge>
            </CardTitle>
            <CardDescription className="text-white/90">Manage your uploaded books</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-12" style={{ color: "#67b2b4" }}>
                <p className="text-lg font-medium font-[Josefin_Sans]">Loading books...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-12" style={{ color: "#67b2b4" }}>
                <div
                  className="p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: "#e6f2f3" }}
                >
                  <Book className="h-12 w-12" style={{ color: "#67b2b4" }} />
                </div>
                <p className="text-lg font-medium font-[Josefin_Sans]">No books uploaded yet</p>
                <p className="text-sm mt-2">Upload your first book using the form above</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: "#b3d6d8" }}>
                      <TableHead className="w-20 font-semibold" style={{ color: "#4d8c8e" }}>
                        Image
                      </TableHead>
                      <TableHead className="font-semibold" style={{ color: "#4d8c8e" }}>
                        Title
                      </TableHead>
                      <TableHead className="font-semibold" style={{ color: "#4d8c8e" }}>
                        Description
                      </TableHead>
                      <TableHead className="font-semibold" style={{ color: "#4d8c8e" }}>
                        Category
                      </TableHead>
                      <TableHead className="font-semibold" style={{ color: "#4d8c8e" }}>
                        Keywords
                      </TableHead>
                      <TableHead className="font-semibold" style={{ color: "#4d8c8e" }}>
                        Volumes
                      </TableHead>
                      <TableHead className="font-semibold" style={{ color: "#4d8c8e" }}>
                        Upload Date
                      </TableHead>
                      <TableHead className="w-32 font-semibold" style={{ color: "#4d8c8e" }}>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow
                        key={book._id}
                        className="transition-colors"
                        style={{ borderColor: "#b3d6d8" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6f2f3")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <TableCell>
                          <div
                            className="w-12 h-12 rounded-lg overflow-hidden"
                            style={{ border: "1px solid #8cc5c7" }}
                          >
                            <img
                              src={book.imageUrl || "/placeholder.svg"}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium" style={{ color: "#4d8c8e" }}>
                          {book.title}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate text-gray-600" title={book.description}>
                            {book.description}
                          </p>
                        </TableCell>
                        <TableCell className="font-medium" style={{ color: "#4d8c8e" }}>
                          {book.category}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {(book.keywords || []).map((keyword) => (
                              <Badge
                                key={keyword}
                                className="text-xs transition-colors"
                                style={{
                                  backgroundColor: "#b3d6d8",
                                  color: "#4d8c8e",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor = "#8cc5c7")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor = "#b3d6d8")
                                }
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {book.volumes.map((volume) => (
                              <Badge
                                key={volume.volumeNumber}
                                className="text-xs transition-colors"
                                style={{
                                  backgroundColor: "#b3d6d8",
                                  color: "#4d8c8e",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor = "#8cc5c7")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor = "#b3d6d8")
                                }
                              >
                                Volume {volume.volumeNumber}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(book.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleEditBook(book)}
                              size="sm"
                              variant="outline"
                              className="p-2"
                              disabled={isLoading}
                              style={{ borderColor: "#67b2b4", color: "#67b2b4" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#e6f2f3";
                                e.currentTarget.style.borderColor = "#5a9fa1";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.borderColor = "#67b2b4";
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => deleteBook(book._id)}
                              size="sm"
                              variant="destructive"
                              className="p-2"
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { BOOKS } from "@consumet/extensions";

const Books = () => {
  const [booksData, setBooksData] = useState([]);
  const [error, setError] = useState(null);

  const fetchBookData = async () => {
    const books = new BOOKS.Libgen();
    try {
      const data = await books.search("One Hundred Years of Solitude");
      setBooksData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching the books data:", error.message, error.response);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {booksData.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;

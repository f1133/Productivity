'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes?category=humor",
          {
            headers: {
              'X-Api-Key': process.env.NEXT_PUBLIC_QUOTE_API_KEY
            }
          }
        );

        if (response.data && response.data[0]) {
          setQuote(response.data[0].quote);
          setAuthor(response.data[0].author);
        } else {
          setError("No quotes available");
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{quote}</p>
          <p>{author}</p>
        </>
      )}
    </div>
  );
};

export default Quote;


import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost.js";
import MoreDetails from "./MoreDetails.js";
import LoadingSpinner from "./LoadingSpinner.js";
import ErrorMessage from "./ErrorMessage.js";
import "./blog.css";

const BlogPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [more, setMore] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const apiKey = "AIzaSyAJaJ8einz7bLYKbInYolSOS9MtchYoZHo";
        const response = await fetch(
          `https://www.googleapis.com/blogger/v3/blogs/3908422654159649151/posts?key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.items);
        console.log(data.items.length);
        setPosts(data.items);
        setImagesLoaded(true);
      } catch (error) {
        setImagesLoaded(true);
        setError("Error fetching posts. Please try again later.");
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const handleLoadMoreClick = () => {
    setVisiblePosts((prevVisiblePosts) =>
      Math.min(posts.length, prevVisiblePosts + 3)
    );
  };

  const handleMoreDetails = (post) => {
    setMore(post);
  };

  const handleBackToBlog = () => {
    setMore(null);
  };

  return (
    <>
      <div className="blog-posts">
        <h1>{props.name}</h1>
        {!imagesLoaded && !error && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        <ul className="gal-1">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <BlogPost
              key={post.id}
              post={post}
              index={index}
              onMoreDetails={handleMoreDetails}
            />
          ))}
        </ul>
        {visiblePosts < posts.length && (
          <button onClick={handleLoadMoreClick} className="gal-5 center">
            Load More
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        )}
      </div>

      {more && <MoreDetails post={more} onBackToBlog={handleBackToBlog} />}
    </>
  );
};

export default BlogPosts;

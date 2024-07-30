import React from "react";
import { shopifyImages } from "./DataImage";
import DOMPurify from "dompurify";
import htmlTruncate from "html-truncate";

// Function to truncate HTML content
const truncateHtmlContent = (html, maxLength) => {
  return htmlTruncate(html, maxLength, {
    ellipsis: "...",
  });
};

// BlogPost Component
const BlogPost = ({ post, onMoreDetails, index }) => {
  const sanitizeHtml = (html) => DOMPurify.sanitize(html);

  return (
    <li key={post.id} className="gal-2">
      <img
        src={
          post.images && post.images.length > 0
            ? post.images[0].url
            : shopifyImages[index % shopifyImages.length]
        }
        alt={post.title}
        className="gal-8"
      />
      <div className="gal-3">
        <h2>{post.title}</h2>
        <p className="tag">
          Tag: <span>#{post.labels ? post.labels[0] : "No tag"}</span>
        </p>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(truncateHtmlContent(post.content, 50)),
          }}
        ></p>
        <p className="tag">
          Published on:{" "}
          <span>{new Date(post.published).toLocaleDateString()}</span>
        </p>
        <button className="gal-5" onClick={() => onMoreDetails(post)}>
          Read More
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
      </div>
    </li>
  );
};

export default BlogPost;

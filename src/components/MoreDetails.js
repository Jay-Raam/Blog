import React from "react";
import { CgClose } from "react-icons/cg";
import DOMPurify from "dompurify";

const MoreDetails = ({ post, onBackToBlog }) => {
  const sanitizeHtml = (html) => DOMPurify.sanitize(html);

  return (
    <div className="more-details">
      <div className="close">
        <span onClick={onBackToBlog}>
          <CgClose />
        </span>
      </div>
      <div className="author">
        <img src={post.author.image.url} alt={post.author.displayName} />
        <h2>{post.author.displayName}</h2>
      </div>
      <h2>{post.title}</h2>
      <p
        className="content"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(post.content),
        }}
      ></p>
      <p className="tag">
        Published on:{" "}
        <span>{new Date(post.published).toLocaleDateString()}</span>
      </p>
      <p className="tag">
        Tag: <span>#{post.labels ? post.labels[0] : "No tag"}</span>
      </p>
      <button className="gal-5 center" onClick={onBackToBlog}>
        Back to Blog
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>
    </div>
  );
};

export default MoreDetails;

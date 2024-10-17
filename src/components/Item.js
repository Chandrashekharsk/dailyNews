import React from "react";
import not_found from "./nf.jpg"; // Ensure this path is correct

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, source } = props;

  // Function to truncate text by character length
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Define the max length for title and description
  const truncatedTitle = truncateText(title, 80); 
  const truncatedDescription = truncateText(description, 150); 

  return (
    <>
      <div className="my-3">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={imgUrl || not_found}  
            className="card-img-top"
            alt="news"
          />
          
          <div className="card-body">
            <h5 className="card-title">{truncatedTitle}</h5>
            <p className="card-text">{truncatedDescription}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on <b>{new Date(date).toGMTString()}</b>
              </small>
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;

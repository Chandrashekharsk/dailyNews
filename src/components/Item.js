import React from "react";

const NewsItem =(props)=>{
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <>
        <div className="my-3">
          <div className="card">
            <div style={{display:"flex",justifyContent:"flex-end",position: "absolute",right:"0"}}>
              <span className="badge rounded-pill bg-danger">
                {source}
              </span>
            </div>
            <img
              src={
                !imgUrl
                  ? "https://images.moneycontrol.com/static-mcnews/2023/09/stocks_in_news-770x433.jpg?impolicy=website&width=770&height=431":imgUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}....</p>
              <p className="card-text ">
                <small className="text-muted">
                  By {!author ?"Unknown":author} on{" "}
                  <b>{new Date(date).toGMTString()}</b>
                </small>
              </p>
              <a
                href={newsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-dark"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
}
export default NewsItem;

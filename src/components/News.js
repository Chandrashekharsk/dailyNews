import React, {useEffect, useState} from 'react'
import NewsItem from './Item'
import Spinner from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const apiKey = process.env.REACT_APP_NEWS_API; // Use environment variable for security
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async () => {
        const cachedData = sessionStorage.getItem(`newsData-${props.category}`);
        if (cachedData) {
            const { articles, totalResults } = JSON.parse(cachedData);
            setArticles(articles);
            setTotalResults(totalResults);
            setLoading(false);
            return;
        }
    
        props.setProgress(10);
        // const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;

        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${props.country}&category=${props.category}`;
        setLoading(true);
        try {
            let res = await fetch(url);
            if (res.status === 429) {
                console.warn("Rate limit exceeded. Retrying in 1 minute...");
                setTimeout(updateNews, 60000);
                return;
            }
            props.setProgress(30);
            let parsedData = await res.json();
            props.setProgress(70);
            setArticles(parsedData.results);
            setTotalResults(parsedData.totalResults);
            sessionStorage.setItem(`newsData-${props.category}`, JSON.stringify({ articles: parsedData.results, totalResults: parsedData.totalResults }));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching the news:", error);
        }
        props.setProgress(100);
    };

    const fetchMoreData = async () => {
        const nextPage = page + 1; 
        setPage(nextPage);
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${props.country}&category=${props.category}`; 
        let res = await fetch(url);
        let parsedData = await res.json();
        setArticles(articles.concat(parsedData.results)); // Concatenate new results with previous ones
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - Daily News`;
        updateNews();
        // eslint-disable-next-line
    }, [props.category]); // Ensures news is fetched when category changes

    return (
        <>
            <h3 className="text-center" style={{ margin: '35px 0px', marginTop: '80px' }}>
                DailyNews - {capitalizeFirstLetter(props.category)} News
            </h3>
            {loading && <Spinner />}
            {articles.length > 0 && 
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData} // Correct: Triggering the fetchMoreData function
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                > 
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.link}>  {/* Fixed key */}
                                        <NewsItem
                                            title={element.title || "No Title"} 
                                            description={element.description || "No Description"}
                                            imgUrl={element.image_url || "default_image_url"} // Use default fallback image if missing
                                            newsUrl={element.link} 
                                            author={element.creator ? element.creator[0] : "Unknown"}  // Fix potential errors
                                            date={element.pubDate || "Unknown Date"} 
                                            source={element.source_id || "Unknown Source"}  // Use source_id if source_name is missing
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            }
        </>
    );
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;

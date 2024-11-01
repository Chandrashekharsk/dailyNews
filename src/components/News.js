// News.jsx
import React, { useEffect, useState } from 'react';
import NewsItem from './Item';
import Spinner from './Spin';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Aid from './Aid';

const News = (props) => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [showAid, setShowAid] = useState(false); // State to control aid visibility

    // Capitalize the first letter of category
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

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
            sessionStorage.setItem(
                `newsData-${props.category}`,
                JSON.stringify({ articles: parsedData.results, totalResults: parsedData.totalResults })
            );
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
        setArticles(articles.concat(parsedData.results));
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - Daily News`;
        updateNews();

        // Show the aid message every 15 seconds
        const interval = setInterval(() => {
            setShowAid(true);
        }, 60000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [props.category]);

    const closeAid = () => setShowAid(false); // Function to close aid message

    return (
        <>
            <h3 className="text-center" style={{ margin: '35px 0px', marginTop: '80px' }}>
                DailyNews - {capitalizeFirstLetter(props.category)} News
            </h3>
            {loading && <Spinner />}
            {articles.length > 0 && 
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                > 
                    <div className="container" style={{ filter: showAid ? 'blur(5px)' : 'none' }}>
                        <div className="row">
                            {articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.link}>
                                        <NewsItem
                                            title={element.title || "No Title"} 
                                            description={element.description || "No Description"}
                                            imgUrl={element.image_url || "default_image_url"} 
                                            newsUrl={element.link} 
                                            author={element.creator ? element.creator[0] : "Unknown"}  
                                            date={element.pubDate || "Unknown Date"} 
                                            source={element.source_id || "Unknown Source"}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            }

            {/* Aid Modal */}
            {showAid && <Aid setShowAid={setShowAid} closeAid={closeAid} />}
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-dropdown/style.css";
import { Paginate } from "../utilty.js/Paginate";
import Pagination from "react-bootstrap/Pagination";

function Post() {
  const [postData, setPostData] = useState([]);
  const [afterPostData, setAfterPostData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPostData(res.data);
      setAfterPostData(res.data);
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchInput(value);
    if (value.length > 0) {
      const data = postData.filter((post) => {
        return post.title.includes(value);
      });
      setAfterPostData(data);
      setSelectedPage(1);
    } else {
      setAfterPostData(postData);
    }
  };

  const nPages = Math.ceil(postData.length / recordsPerPage);
  const nPageNum = [];
  for (let i = 0; i < nPages; i++) {
    nPageNum[i] = i + 1;
  }

  const btnHandler = (pageNum) => {
    console.log(pageNum);
    setSelectedPage(pageNum);
  };
  const data = Paginate(selectedPage, recordsPerPage, afterPostData);
  const items = nPageNum.map((pageNum) => (
    <Pagination.Item
      onClick={() => btnHandler(pageNum)}
      key={pageNum}
      active={pageNum === selectedPage}
    >
      {pageNum}
    </Pagination.Item>
  ));
  return (
    <React.Fragment>
      <div>
        <h1>{`Total Post Count is ${data.length}`}</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div>
        <Pagination>{items}</Pagination>
      </div>
      <ol>
        {data.map((post, index) => {
          return (
            <ul
              className={
                index % 2 === 0 ? "post0-container" : "post1-container"
              }
              key={post.id}
              style={{}}
            >
              <li>{`ID :     ${post.id}`}</li>
              <li>{`Title:   ${post.title}`}</li>
              <li>{`Body:    ${post.body}`}</li>
            </ul>
          );
        })}
      </ol>
    </React.Fragment>
  );
}

export default Post;

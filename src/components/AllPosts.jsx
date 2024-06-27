//Goal is to render a page that displays a list of the title of posts.

import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../services/PostServices"
import "./AllPosts.css"
import { getTopics } from "../services/TopicServices"


//Next to them the topic of the post and the amount of likes.
export const AllPostList = () => {
    const [posts, setPosts] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("All")
    const [theTopics, setTheTopics] = useState([])
    const [searchQue, setSearchQue] = useState("")


    useEffect(() => {
        getAllPosts().then(postArray => {
            setPosts(postArray)
        })
    }, [])

    useEffect(() => {
        getTopics().then(topicArray => {
            setTheTopics(topicArray)
        })
    }, [])

    const handleDropChange = (event) => {
        setSelectedTopic(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchQue(event.target.value)
    }

    const filteredPosts = posts.filter(post => {
        const topicMatch = selectedTopic === "All" || parseInt(post.topic.id) === parseInt(selectedTopic)
        const titleMatch = post.title.toLowerCase().includes(searchQue.toLowerCase())
        return topicMatch && titleMatch
    })
    // const filteredPosts = 
    // selectedTopic === "All" ? posts : posts.filter(post => parseInt(post.topic.id) === parseInt(selectedTopic))

    return (
        <div className="allposts">
            <h2>All Posts</h2>
            <div className="dropdown"><select value={selectedTopic} onChange={handleDropChange}>
                <option value="All">All</option>
                {theTopics.map((topic) => {
                    return (
                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                    )
                })

                }


            </select>
            </div>

            <div className="search">
                <input
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                    placeholder="Search for Title" />
            </div>

            <article className="posts">
                {filteredPosts.map((post) => {
                    return (
                        <section className="post" key={post.id}>
                            <div className="title">
                                {post.title}
                            </div>
                            <div className="topic">
                                {post.topic.name}
                            </div>
                            <div className="likes">
                                {post.likes.length} users like this post
                            </div>
                        </section>
                    )
                })}
            </article>
        </div>
    )

}






//In the return statement we are going to create an h2 header letting us know that this is all the posts.

//In an article tag we will map the state containing our posts

//In the posts we will get the posts with the embed/expanded info of our topics as well as our likes

//For the likes we must filter through them to find all the ones that contain the same id as our posts

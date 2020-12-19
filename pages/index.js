import React from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-fetch'
import Error from 'next/error'
import StoryList from '../components/StoryList'
import Layout from '../components/Layout'
import Link from 'next/link'



export default class Index extends React.Component {
  static async getInitialProps({query}){
    let stories;
    let page;

    try{
      page = Number(query.page) || 1;
      const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
      stories = await res.json()
      
    }catch(err){
      console.log(err)
      stories = []
    }
    return { stories, page }
  }

  render(){
    const { stories, page } = this.props;
    const hasStories = stories.length > 0;
    const pageDesc = "a hacker news clone built with next.js"
    if(!hasStories){
      return <Error statusCode={503} />
    }
    return (
      <Layout title="Hacker News" description={pageDesc} >
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page+1}`}><a>Next page ({page + 1})</a></Link>
        </footer>

        <style jsx>
          {`
            footer {
              padding: 1em;
            }

            footer a{
              font-weight: bold;
              color: black;
            }
          `}
        </style>
      </Layout>
    )
  }
}
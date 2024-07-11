import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    

  static defaultProps= {
    country:"in",
    pageSize:"15",
    category:"general",
    totalResults:0
  }
   static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
   }
   cappitaliseFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase()+string.slice(1);
   }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1

        };
        document.title=`${this.cappitaliseFirstLetter(this.props.category)} -NewsApp`;

    }

    async updateNews(pageNo){
      this.props.setProgress(10)
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ddb9822b86c4845994215f94c226af8&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data=await fetch(url) ;
        this.props.setProgress(30)
        let parseData = await data.json();
        this.props.setProgress(60)
        this.setState({ articles: parseData.articles,
           loading: false, 
           totalResults:parseData.totalResults });
           this.props.setProgress(100)
    }

     async componentDidMount(){
        // console.log("cdm");
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ddb9822b86c4845994215f94c226af8&page=1&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data=await fetch(url) 
        // let parseData = await data.json();
        // this.setState({ articles: parseData.articles, loading: false, totalResults:parseData.totalResults });
        this.updateNews()
      }
      // handlePrevClick= async ()=>{
      //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ddb9822b86c4845994215f94c226af8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      //   // this.setState({loading:true})
      //   // let data=await fetch(url)
      //   // let parseData=await data.json()
      //   // this.setState({
      //   //   page:this.state.page-1,
      //   //   articles:parseData.articles ,
      //   //   loading:false
      //   // })
      //   // console.log("previous");
      //   this.setState({page:this.state.page-1})
      //   // console.log("prev");
      //   this.updateNews()
      //   }
        
    //     handleNextClick= async ()=>{
          
    //       //   console.log("next");
    //       // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ddb9822b86c4845994215f94c226af8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    //       // this.setState({loading:true})
    //       // let data=await fetch(url)
    //       // let parseData=await data.json()
          
    //       // this.setState({
    //         //   page:this.state.page+1,
    //         //   articles:parseData.articles,
    //         //   loading:false
    //         // })
    //         // console.log("next");
    //         this.setState({page:this.state.page+1});
    //     this.updateNews()
      
    // }
    fetchMoreData = async () => {
      this.setState({page:this.state.page + 1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ddb9822b86c4845994215f94c226af8&page=${this.state.page}&pageSize=${this.props.pageSize}`
       
        let data=await fetch(url) 
        let parseData = await data.json();
        this.setState({ articles: this.state.articles.concat(parseData.articles),
          
           totalResults:parseData.totalResults });
      
    };

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center mb-5'>NewsApp - Top  {this.cappitaliseFirstLetter(this.props.category)} headlines</h1>
        {this.state.loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={this.state.loading &&<Spinner/>}
        />

        <div className='row'>
            {this.state.articles.map((element) =>{
                // console.log(element);
             return   <div className='col-md-4 mb-4' key={element.url}>
                <NewsItem title={element.title?element.title.slice(0.45):""} description={element.description?element.description.slice(0,88):""}
                urlToImage={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
           </div>
            })}
        </div>
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous </button>
        <button disabled={Math.ceil(this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next	&rarr;</button>

        </div> */}
      </div>
    )
  }
}

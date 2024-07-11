import React, { Component } from 'react'

export default class NewsItem extends Component {
    
  render() {
   let {title,description,urlToImage,newsUrl,author,date,source}=this.props;
    return (
        <div className='my-3'>
            <div className="card" style={{width: "18rem"}}>
                <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                <span className=' badge rounded-pill bg-danger'>{source}</span>

                </div>
                <img src={!urlToImage?"https:i.ytimg.com/vi/VsKrQHJqGa4/maxresdefault.jpg":urlToImage} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}..</h5>
                    <p className="card-text">{description}..</p>
                    <p className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</p>
                    <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-dark btn-sm">Read more</a>
                </div>
            </div>
        </div>
    )
  }
}

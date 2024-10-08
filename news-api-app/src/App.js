
import './App.css';

import React, { Component } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=5;
  state={
    progress:0
  }
  setProgress=(progress) =>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar/>
          <LoadingBar
          height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
            {/* <Routes>
              <Route exact path='/' element={<News pageSize={9} key={'general'} country='in' category='general'  />}></Route>
              <Route exact path='/business' element={<News pageSize={9} key={'business'} country='in' category='business'  />}></Route>
              <Route exact path='/entertainment' element={<News pageSize={9} key={'entertainment'} country='in' category='entertainment'  />}></Route>
              <Route exact path='/general' element={<News pageSize={9} key={'general'} country='in' category='general'  />}></Route>
              <Route exact path='/health' element={<News pageSize={9} key={'health'} country='in' category='health'  />}></Route>
              <Route exact path='/science' element={<News pageSize={9} key={'science'} country='in' category='science'  />}></Route>
              <Route exact path='/sports' element={<News pageSize={9} key={'sports'} country='in' category='sports'  />}></Route>
              <Route exact path='/technology' element={<News pageSize={9} key={'technology'} country='in' category='technology'  />}></Route>
            </Routes> */}
            <Routes>
              <Route exact path='/' element={<News setProgress={this.setProgress} key={'general'} country='in' category='general'  />}></Route>
              <Route exact path='/business' element={<News setProgress={this.setProgress} key={'business'} country='in' category='business'  />}></Route>
              <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key={'entertainment'} country='in' category='entertainment'  />}></Route>
              <Route exact path='/general' element={<News setProgress={this.setProgress} key={'general'} country='in' category='general'  />}></Route>
              <Route exact path='/health' element={<News setProgress={this.setProgress} key={'health'} country='in' category='health'  />}></Route>
              <Route exact path='/science' element={<News setProgress={this.setProgress}key={'science'} country='in' category='science'  />}></Route>
              <Route exact path='/sports' element={<News setProgress={this.setProgress} key={'sports'} country='in' category='sports'  />}></Route>
              <Route exact path='/technology' element={<News setProgress={this.setProgress} key={'technology'} country='in' category='technology'  />}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}





import React, { Component } from 'react';
import './Headlines.css';
import Headline from '../components/Headline';
import { getCountryHeadlines } from '../apis/news';
import { getSourceHeadlines } from '../apis/news';
import Filter from '../components/Filter';
import Spinner from 'react-spinkit';

class Headlines extends Component {
  constructor(props) {
    super(props);
    this.filterByCountry = this.filterByCountry.bind(this);
    this.filterBySource = this.filterBySource.bind(this);
    this.state = {
      articles: [],
      loaded: '',
    }
  }

  componentDidMount() {
    this.filterByCountry('ng');
  }

  filterByCountry(country) {
    this.setState({loaded: false})
    getCountryHeadlines(country).then(response => {
      let articles = response;
      this.loadArticles(articles);
    }).catch(error => {
      console.log(error);
    })
  }

  filterBySource(source) {
    this.setState({loaded: false})
    getSourceHeadlines(source).then(response => {
      let articles = response;
      this.loadArticles(articles);
    }).catch(error => {
      console.log(error);
    })
  }

  loadArticles(articles) {
    this.setState({ articles: articles.articles });
    this.setState({ loaded: true });
  }

  static hasHeadlines() {
    return this.state.articles.length > 0;
  }

  render() {
    return (
      <div className = "headlines">
        <Spinner name = "three-bounce" hidden={this.state.loaded}/>
        <Filter countryFilter={this.filterByCountry} sourceFilter={this.filterBySource}/>
        {this.state.articles.map(article => <Headline article={article} /> )}
      </div>
    );
  }
}

export default Headlines;
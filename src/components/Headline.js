import React, {Component} from 'react';
import moment from 'moment';
import './Headline.css';

class Headline extends Component {
  render() {
    return(
        <article className="headline card">
          <div className="news-image-container">
            <img className="news-image"
              src={this.props.article.urlToImage}
              sizes="(min-width: 800px) 765px,
               (min-width: 600px) calc(100vw - 32px),
               calc(100vw - 16px)"  
              alt=""
            />
          </div>
          <div className="news">
            <div className="news-content">
              <div className="news-title">
              <a target="_blank" href={this.props.article.url}><h1 className="news-heading">{this.props.article.title}</h1></a>
              </div>
              <p>
                {this.props.article.description}<span>...</span>
              </p>
              <div className="news-extra">
                <div className="news-source"><em>Source: {this.props.article.source.name}</em></div>
                <span className="news-time">{moment(this.props.article.publishedAt).fromNow()}</span>
              </div>
            </div>
          </div>
        </article>
    );
  }
}

export default Headline;

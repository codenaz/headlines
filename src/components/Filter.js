import React, {Component} from 'react';
import './filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeSource = this.changeSource.bind(this);
  }
  
  changeCountry(e) {
    let country = e.target.value;
    this.props.countryFilter(country);
  }

  changeSource(e) {
    let source = e.target.value;
    this.props.sourceFilter(source)
  }

  render() {
    return (
      <div className="filter">
        <div className = "select-filter">
          <select className="select" defaultValue="ng" onChange={this.changeCountry} >
            <option value="ng">Nigeria</option>
            <option value="us">USA</option>
            <option value="gb">United Kingdom</option>
            <option value="ch">China</option>
            <option value="ru">Russia</option>
            <option value="fr">France </option>
            <option value="za">South Africa </option>
            <option value="in">India </option>
          </select>
          <span className="select-icon entypo-arrow-combo"></span>
        </div>
        
        <div className="select-filter">
          <select className="select" onChange={this.changeSource} >
            <option>Filter By Source </option>
            <option value="bbc-news">BBC News</option>
            <option value="al-jazeera-english">Al Jazeera</option>
            <option value="bbc-sport">BBC Sport</option>
            <option value="bleacher-report">Bleacher Report</option>
            <option value="cnn">CNN</option>
            <option value="bloomberg">Bloomberg</option>
            <option value="cbc-news">CBC News </option>
            <option value="espn">ESPN </option>
          </select>
          <span className="select-icon entypo-arrow-combo"></span>
        </div>
      </div>
    );
  }
}

export default Filter;
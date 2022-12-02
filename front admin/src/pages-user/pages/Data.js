import { Component } from 'react';
import './css/Data.css';
import * as Icons from "react-icons/md";
import Card_Data from './Card-Data';

class Data extends Component {

  render() {

    return (
      <>
        <div className="download-container">
          <h3 className="title">last ...</h3>
          <div className="buttons">
            <button className="classification">Classification</button>
            <button className="sorting">Sorting</button>
          </div>
          <div className="produits" >

            <Card_Data />

          </div>
        </div>

      </>
    )
  }

}
export default Data;

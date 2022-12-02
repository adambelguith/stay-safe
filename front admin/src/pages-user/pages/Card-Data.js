import { Component } from "react";

class Card_Data extends Component {
  render() {
    return (
      <>
        <div className="produit" >
          <pre className="name">Pomme</pre>
          <hr></hr>
          <pre>15/05/2022</pre>
          <pre>120</pre>
          <pre>80%</pre>
          <pre>20%</pre>
          <div className="btn">
            <button >download</button>
          </div>
        </div>

        <div className="produit" >
          <pre className="name">Fraise</pre>
          <hr></hr>
          <pre>10/09/2020</pre>
          <pre>150</pre>
          <pre>63%</pre>
          <pre>37%</pre>
          <div className="btn">
            <button >download</button>
          </div>
        </div>

        <div className="produit" >
          <pre className="name">Banane</pre>
          <hr></hr>
          <pre>30/01/2018</pre>
          <pre>136</pre>
          <pre>85%</pre>
          <pre>15%</pre>
          <div className="btn">
            <button >download</button>
          </div>
        </div>


      </>
    )
  }
}

export default Card_Data;
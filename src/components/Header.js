import React from 'react'
import './Header.css'
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1
        }
    }

    sendValue = () => {
        this.props.onValueChange(this.state.value);

    }
    render() {
      return(
        <div className="topnav">

            <div className="topnav-centered">
                <a href="#home" className="active" onClick={ this.sendValue }>SAVE</a>
            </div>
        
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            
            <div className="topnav-right">
                <a href="#search">Search</a>
                <a href="#about">About</a>
        </div>
        
        </div>
      )};
}
export default Header;

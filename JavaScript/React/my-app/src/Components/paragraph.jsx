import {Component} from "react";

class Paragraph extends Component{
    render(){
        return(
            <div>
                <p className="App-intro">
                    To get started edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={() => this.props.shMsg('Hello')}>Click here</button>
            </div>
        )
    }
}

export default Paragraph;
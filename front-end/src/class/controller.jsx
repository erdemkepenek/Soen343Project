import {Component,React} from "react";

class Controller extends Component {
    constructor(props) {
        super(props);
        console.log("from controller")
    }
    hello=()=>{
        console.log("HELLO")
    }
}
export default Controller
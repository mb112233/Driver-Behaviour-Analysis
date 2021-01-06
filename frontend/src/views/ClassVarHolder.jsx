import React, {Component} from 'react';

class ClassVarHolder extends Component {

    constructor(props) {
        super(props);
        this.currentDriver = undefined;
        this.currentDriverId = 0;
        //this.childFunction=this.childFunction.bind(this);
        this.state = {
            currentDriverId:undefined
        };
    }

    childFunction=()=> {
        //console.log('In ClassVarHolder , in childFunction, the id is ', this.props.driverId);
        this.props.parentCallBack();
    };


    componentDidMount() {
        this.setState({ currentDriverId: this.props.driverId});
    }

    render() {

        console.log('In ClassVarHolder , the current driverId is ', this.props.driverId);
        return (
            <div >
                <button className={"btn btn-primary"} >Show Driver Log</button>

            </div>
        );
    }
}


export default ClassVarHolder;
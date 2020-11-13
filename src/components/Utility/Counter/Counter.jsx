import React from 'react'

let ret = 0
export  default  class Counter extends React.Component{
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.setState({count: this.props.count});
    }


    increment(count){
        count++
        ret = count
        this.setState({count: count});
    }

    returnCount(){
        console.log(ret)
        debugger
        return ret
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    -
                </div>
                <div className="col-4">{this.state.count}</div>
                <div className="col-4" onClick={() => {
                    this.increment(this.state.count)
                }}>
                    +
                </div>
            </div>
        )
    }
}
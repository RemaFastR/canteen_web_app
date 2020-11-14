import React from 'react'
import './Counter.module.css'

let ret = 0
class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.setState({count: this.props.count});
    }

    decrement(count){
        if (count > 1){
            count--
            ret = count
            this.setState({count: count});
        }
    }

    increment(count) {
        count++
        ret = count
        this.setState({count: count});
    }

    returnCount() {
        console.log(ret)
        return ret
    }

    render() {
        return (
            <div className="row  counter ">
                <div className="col-3 dec_btn">
                    <button type="button" className="btn btn-success col-3" onClick={() => {
                        this.decrement(this.state.count)
                    }}>-</button>
                </div>
                <div className="col-3">{this.state.count}</div>
                <div className="col-3 inc_btn">
                    <button type="button" className="btn btn-success col-3" onClick={() => {
                        this.increment(this.state.count)
                    }}>+</button>
                </div>
            </div>
        )
    }
}

export default Counter;
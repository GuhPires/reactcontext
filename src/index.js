import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext();

class MyProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Jhon',
            age: 20
        }
    }

    render(){
        return (
            <MyContext.Provider value={{
                state: this.state,
                getOlder: () => this.setState({ age: this.state.age + 1})
                }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

const InfoComponent = (props) => {
    return (
        <MyContext.Consumer>
            {(context) => (
                <React.Fragment>
                    <p>My name is {context.state.name}, and I am {context.state.age}</p>
                    <button onClick={context.getOlder}>Birthday</button>
                </React.Fragment>
            )}
        </MyContext.Consumer>
    )
}

const AgeComponent = (props) => {
    return (
        <MyContext.Consumer>
            {(context) => (
                <p>My age: {context.state.age}</p>
            )}
        </MyContext.Consumer>
    )
}

export default class App extends Component {
    render(){
        return (
            <MyProvider>
                <InfoComponent />
                <AgeComponent />
            </MyProvider>
            );
    }

}

ReactDOM.render(<App />, document.getElementById('root'))
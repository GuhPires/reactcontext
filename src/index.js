/***********************************************/
//      Basic usage of React Context API       //
//                                             //
//   THIS EXAMPLE WAS DEVELOPED BY: GuhPires   //
/***********************************************/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Creating the Context: 
const MyContext = React.createContext();

// Class to wrapp all application:
class MyProvider extends Component {
    constructor(props){
        super(props);

        // Global state:
        this.state = {
            name: 'Jhon',
            age: 20
        }

        // Context values that will be passed to the components:
        this.contextValues = {
            state: this.state, // The Global State
            getOlder: () => this.setState({ age: this.state.age + 1}) // Function that increases the age value
        }
    }

    render(){
        return (
            // Provider with an object as a value
            // This 'value'(this.contextValues) can be accessed from ANY component wrapped into the 'MyContext.Consumer'
            <MyContext.Provider value={this.contextValues}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

// Stateless component that make use of the Global State:
const InfoComponent = (props) => {
    return (
        // Wrapp all the component with 'MyContext.Consumer' in order to use the global values
        // This wrapper MUST HAVE A FUNCTION AS A CHILD, like the following:
        <MyContext.Consumer>
            {(context) => (
                // Making use of the Global State and the Function passed from the Context:
                <React.Fragment>
                    <p>My name is {context.state.name}, and I am {context.state.age}</p>
                    <button onClick={context.getOlder}>Birthday</button>
                </React.Fragment>
            )}
        </MyContext.Consumer>
    )
}

// Other stateless component that make use of the Global State:
const AgeComponent = (props) => {
    return (
        // Wrapp everything inside of 'MyContext.Consumer': 
        <MyContext.Consumer>
            {(context) => (
                // Making use of the Global State:
                <p>My age: {context.state.age}</p>
            )}
        </MyContext.Consumer>
    )
}

// Main App Component: 
export default class App extends Component {
    render(){
        return (
            // Wrapp all the application with the 'MyProvider' component, in order to use Context
            // Notice that the components are SIBLINGS and DO NOT receive any props from this Component
            <MyProvider>
                <InfoComponent />
                <AgeComponent />
            </MyProvider>
            );
    }

}

/* 

    By running it, you should see that BOTH components update the 'age' value by clicking at the 'Birthday' button.
    You can also use Context with non-stateless components normally.

*/

ReactDOM.render(<App />, document.getElementById('root'))
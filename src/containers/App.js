import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import {robots} from './robots';
import './App.css';


// 2 states, robots & searchField... 
// because App.js owns the state, any component that has state uses the class syntax so 
// they can use the constructor() function  to create this.state = {}  
// state is what changes in an app  , what describes the app
// renders and pass down as props to these components
// these components are pure functions that just render
// we manage this state in here, the app is the only thing that can change this state
// but it can pass down props:
//     -We pass down onSearchChange to this SearchBox 
//     -Everytime theres an onchange on the input of SearchBox, it lets the app know hey theres a change so run this function -> onSearchChange()
//     -updates the state to searchfield to whatever we type
//     -with information from the SearchBox we can communicate to the CardList
//     -filter the robots state to only now what it includes in the searchField
//     -and instead of passing this.state.robots, we just pass the filteredRobots

//app component is a smart component unlike searchbox(pure functions)
//app.js actually has state: A piece of data that describes our app
//because it has state , we call it SMART COMPONENTS, they tend to have this class syntax --> class  App extends Component{

// inside Component we have Lifecycle methods/hooks
// What they do:
// -if we run these methods , it will automatically trigger when this app gets loaded on the website
//  3 sections:
//  -Mounting (start of the app)
//  * when i click refresh , the app Component gets mounted into the document with the id of root
//  * index.html, our div is nothing but an id of root 
//  * when we say we MOUNT a Component, we're replacing this and adding our entire entire app
//  * first thing it checks :
//  * 1. Does app have a constructor()? yes then run this piece of code underneath it
//  * 2. Does it have componentWillMount()? no it doesnt, ignore it
//  * 3. Does it have render()? yes, run this at the bottom
//  * 4. Does it have componentDidMount()? no , ignore this

//  -Updating(whenever a component changes)
//  * when we had the list, everytime i type something , the cardlist component gets rerendered because we get new info, the function receives new inputs
//  * 

//  -Unmounting(when a component is removed from a page)
//  * if we change to a different page, the component will unmount(the app component will get deleted from the page)
class  App extends Component{

    constructor(){
        super()
        this.state = { 
            robots: [],
            searchField: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: users}));        
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value }) 
    }
    render(){
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return !robots.length ?
            <h1>Loading</h1> :
       (
            <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <CardList robots={filteredRobots}/>
            </Scroll>
            </div>
        );}
    }
    


export default App;
// let's go!
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount(){
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
			context: this,
			state: 'fishes'
		});
		//check localstorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState){
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
	}

	addFish(fish){
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		this.setState({
			fishes: fishes
		})
	}

	updateFish(key,updatedFish){
		const fishes = {...this.state.fishes}
		fishes[key] = updatedFish;
		this.setState({fishes: fishes})

	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		//cannot use delete[key] with firebase
		fishes[key] = null;
		this.setState({
			fishes: fishes
		})
	}

	addToOrder(key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({
			order: order
		})
	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({
			order: order
		})
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}
	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object.keys(this.state.fishes)
							.map(key => <Fish key={key} addToOrder={this.addToOrder} index={key} details={this.state.fishes[key]} />)
						}
					</ul>
				</div>
				<Order params={this.props.params} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order} />
				<Inventory storeId={this.props.params.storeId} addFish={this.addFish} removeFish={this.removeFish} updateFish={this.updateFish} loadSamples={this.loadSamples} fishes={this.state.fishes}/>
			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}


export default App;
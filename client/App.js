import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
	componentWillMount() {

		this.setState({
			hello: 'world'
		}, function() {});
	}
	render() {
		return (<div>
			<h1>这是标题</h1>
			<div>{this.state.hello}</div>
		</div>)
	}
}


ReactDOM.render(<App />, document.getElementById('root'));
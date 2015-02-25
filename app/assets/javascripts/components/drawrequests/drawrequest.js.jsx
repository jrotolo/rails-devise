var DrawRequestItem = React.createClass({
    render: function () {
        return (
            <div className="drawrequest-item">
                <span className="item-show-price">
                    ${this.props.request.price}
                 </span>
                <p className="drawrequest-text">{this.props.request.text}</p>
            </div>
        );
    }
});

var DrawRequestList = React.createClass({
    render: function () {
        var requests = this.props.requests.map(function(item) {
            return (
                <DrawRequestItem key={item.id} request={item}>
                 
                </DrawRequestItem>
            );
        });
        
        return (
            <div className="request-list">
                {requests}
            </div>                
        );
    }
});

var DrawRequestBox = React.createClass({
    getInitialState: function () {
        return { requests: [] };
    },
    
    componentDidMount: function () {
        this.loadRequests();
    },
    
    loadRequests: function () {
        this.setState({requests: items});
    },
    
    handleRequestSubmit: function (request) {
        var requests = this.state.requests;
        var newRequests = requests.concat([request]);
        this.setState({requests: newRequests});
    },
    
    render: function () {
        return (
            <div className="request-box">
                <h3>Draw This</h3>
                <DrawRequestForm onRequestSubmit={this.handleRequestSubmit} />
                <h4>Draw Request Postings</h4>
                <DrawRequestList requests={this.state.requests} />              
            </div>
        );
    }
});

var DrawRequestForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var text = this.refs.request.getDOMNode().value.trim();
        var price = this.refs.price.getDOMNode().value;
        this.props.onRequestSubmit({id: this.uniqueID(), text: text, votes: 0, price: price});
        this.refs.request.getDOMNode().value = '';
    },
    
    uniqueID: function () {
        return Math.random();
    },
    
    render: function() {
        return ( 
            <form className="draw-form" onSubmit={this.handleSubmit}>
                <textarea className="draw-textbox" ref="request" placeholder="Draw This:" /> <br />
                <select className="prices" id="price" onchange="changeddl(this)" ref="price">
                  <option>Pick a price</option>
                  <option value="1">$1</option>
                  <option value="5">$5</option>
                  <option value="10">$10</option>
                  <option value="15">$15</option>
                  <option value="5">$20-30</option>
                  <option value="10">$30-50</option>
                  <option value="15">$50+</option>
                </select>
                <input className="button" type="submit" value="Submit" />
            </form>
        );
    }
});

var items = [
    { id: 1, text: 'Draw a baby riding on a shark bird', votes: 15, price: 5},
    { id: 2, text: 'Draw a jedi in battle', votes: 4, price: 25},
    { id: 3, text: 'Draw my pet cat', votes: 9, price: 5}
];

var ready = function () {
	React.render(
			<DrawRequestBox />, 
			document.getElementById('drawrequests')
	);
};

$(document).ready(ready);

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

	constructor(props){
		super(props);
	}

	renderSelectedDish(dish) {
		return (
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	}

	renderDishComment(comments) {
		return (
			comments.map((comments) => {
				return(
				<div key={comments.id}>
					<ul className="list-unstyled">
						<li>{comments.comment}</li>
						<li>-- {comments.author}, {comments.date}</li>
					</ul>
				</div>
				);
			})			
		);
	}

	render() {
		if(this.props.selectedDish != null) {
			return (
				<div className="row">

					<div className="col-12 col-md-5 m-1">

						{this.renderSelectedDish(this.props.selectedDish)}

					</div>
					<div className="col-12 col-md-5 m-1">
						<h4>Comments</h4>
						{this.renderDishComment(this.props.selectedDish.comments)}

					</div>

				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
		
	}

}

export default DishDetail;
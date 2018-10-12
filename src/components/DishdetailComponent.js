import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


	function RenderDish({dish}) {
		return (
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}

	function RenderComments({comments}) {
		return (
			comments.map((comments) => {
				return(					
						
						<div key={comments.id}>
							<ul className="list-unstyled">
								<li>{comments.comment}</li>
								<li>-- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
							</ul>
						</div>

				);
			})			
		);
	}

	const DishDetail = (props) => {
		if(props.dish != null) {
			return (
				<div className="container">
					<div className="row">						

							<RenderDish dish={props.dish} />						
						<div className="col-12 col-md-5 m-1">
							<h4>Comments</h4>
							<RenderComments comments={props.dish.comments} />
						</div>
						
					</div>
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
		
	}



export default DishDetail;
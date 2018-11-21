import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
		if(comments != null) {
			return (
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{comments.map((comment) => {
							return(
								<li key={comment.id}>
								<p>{comment.comment}</p>
								<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
								</li>
							);
						})}
					</ul>
					<CommentForm></CommentForm>
				</div>
			);
			} else {
				return(
					<div></div>
				)
			}				
			
	}

	const maxLength = (len) => (val) => !(val) || (val.length <= len);
	const minLength = (len) => (val) => (val) && (val.length >= len);

	class CommentForm extends Component {

		constructor(props) {
			super(props);

			this.state = {
				isModalOpen: false
			}

			this.toggleModal = this.toggleModal.bind(this);	

		}

		toggleModal() {
			this.setState({
				isModalOpen: !this.state.isModalOpen
			});
		}

		handleSubmit(values) {
			alert("Current State is: " + JSON.stringify(values));
		}

		render() {
			return (
				<React.Fragment>
					<Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
					<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >

							<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

							<ModalBody>
								<LocalForm onSubmit={(values) => this.handleSubmit(values)}>

									<Row className="form-group">
									<Col md={12}>

										<Label htmlFor="rating" >Rating</Label>										
										<Control.select model=".rating" name="rating" className="form-control" >
											<option vlaue="1">1</option>
											<option vlaue="2">2</option>
											<option vlaue="3">3</option>
											<option vlaue="4">4</option>
											<option vlaue="5">5</option>
										</Control.select>

									</Col>
									</Row>
									
									<Row className="form-group">
									<Col md={12}>
										<Label htmlFor="author" >Your Name</Label>
										<Control.text model=".author" name="author" id="author" placeholder="Your Name" className="form-control"
											validators={{
												minLength: minLength(2), maxLength: maxLength(15)
											}}
										 />
										 <Errors className="text-danger" model=".author" show="touched"
											messages={{
												minLength: 'Must be greater than 2 characters',
												maxLength: 'Must be 15 characters or less'
											}}
										  />

									</Col>
									</Row>

									<Row className="form-group">
										<Col md={12}>
											<Label htmlFor="comment">Comment</Label>
											<Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6" />
										</Col>
									</Row>

									<Row className="form-group">
										<Col md={12}>
											<Button type="submit" color="primary">
	                    	Submit
	                     </Button>
	                  </Col>
									</Row>

								</LocalForm>
							</ModalBody>

						</Modal>
				</React.Fragment>
			);
		}
	}

	const DishDetail = (props) => {
		if(props.dish != null) {
			return (
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
							<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
							<h3>{props.dish.name}</h3>
							<hr />
						</div>
					</div>
					<div className="row">						

							<RenderDish dish={props.dish} />						
						
							<RenderComments comments={props.comments} />
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
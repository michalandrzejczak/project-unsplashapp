import React, {Component} from "react";

class Category extends Component {
	constructor(props) {
		super(props);
		
		this.images = this.props.images;
		
		this.openCategory = this.openCategory.bind(this);
	}

	openCategory() {
		this.props.deployCategoryImages(this.images);
		this.props.passCategoryInfo(this.props.title);
	}
	
	render() {
		return (
			<div className="category-wrapper" onClick={this.openCategory}>
				<h3>{this.props.title}</h3>
				<p className="category-counter">Items: {this.props.imagesCounter}</p>
				<p className="category-favorites">Favorites: {this.props.favorites.length}</p>
			</div>	
		)
	}
}

export default Category;
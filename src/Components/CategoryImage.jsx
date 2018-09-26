import React, {Component} from "react";

class CategoryImage extends Component {
	constructor(props) {
		super(props);
		
		this.addToFavorites = this.addToFavorites.bind(this);
	}
	
	addToFavorites() {
		this.props.addCategoryImageToFavorites(this.props.categoryTitle, this.props.image);
	}
	
	render() {
		return (
			<div className="image-wrapper">
				<a href={this.props.image.links.download} target="_blank">
					<img src={this.props.image.urls.thumb} alt="" />
				</a>
				<p className="image-author">Author: {this.props.image.user.name}</p>
				<p className="image-created_at">Created at: {(new Date(this.props.image.created_at)).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})}</p>
				<p className="image-likes">Likes: {this.props.image.likes}</p>
				<a href={this.props.image.links.html} target="_blank">See on Unsplash</a>
					<button onClick={this.addToFavorites}>Add to favorites</button>	
			</div>	
		)
	}
}

export default CategoryImage;
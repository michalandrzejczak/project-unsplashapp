import React, {Component} from "react";

class FavoriteCategoryImage extends Component {
	
	render() {
		return (
			<div className="image-wrapper image-favorite">
				<a href={this.props.image.links.download} target="_blank">
					<img src={this.props.image.urls.thumb} alt="" />
				</a>
				<a href={this.props.image.links.html} target="_blank">See on Unsplash</a>
			</div>	
		)
	}
}

export default FavoriteCategoryImage;
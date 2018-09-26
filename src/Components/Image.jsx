import React, {Component} from "react";

class Image extends Component {
	
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
			</div>	
		)
	}
}

export default Image;
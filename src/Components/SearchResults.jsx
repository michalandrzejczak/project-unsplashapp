import React, {Component} from "react";

import Image from "./Image.jsx";

class SearchResults extends Component {
	
	imagesPrint() {
		return this.props.images.map(image => {
			return (
				<div key={image.id}>
					<Image image={image}/>
				</div>
			)		
		})
	}

	render() {
		return (
			<div className="images-container">
				{
					this.props.images.length > 0 &&
					<h2>Search results: {this.props.query}</h2>
				}
				{this.imagesPrint()}
			</div>
		)
	}
}

export default SearchResults;
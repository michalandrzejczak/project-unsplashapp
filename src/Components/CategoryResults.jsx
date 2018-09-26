import React, {Component} from "react";

import CategoryImage from "./CategoryImage.jsx";
import FavoriteCategoryImage from "./FavoriteCategoryImage.jsx";

class CategoryResults extends Component {
	constructor(props) {
		super(props)
		
		this.imagesPrint = this.imagesPrint.bind(this);
		this.favoritesPrint = this.favoritesPrint.bind(this);	
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.title !== this.props.title) {
			this.props.resetSortForm();
		}
	}
	
	imagesPrint() {
		return this.props.images.map((image) => {
			return (
				<div key={image.id}>
					<CategoryImage image={image} 
													addCategoryImageToFavorites={this.props.addCategoryImageToFavorites} 
													categoryTitle={this.props.title} />
				</div>	
			)		
		})
	}
	
	favoritesPrint() {
		return this.props.favorites.map((favImage) => {
			return (
				<div key={favImage.id}>
					<FavoriteCategoryImage image={favImage} />
				</div>	
			)		
		})
	}
	
	
	render() {
		return (
			<div className="images-container category-images-container">
				<span className="category-close-btn" onClick={this.props.closeCategoryResults}>X</span>
				<div className="category-heading-wrapper">
					<h2>Saved category</h2>
					<p className="category-title">{this.props.title}</p>
				</div>
				{ 
					this.props.favorites.length > 0 &&
						<div className="favorites-container">
							<h3>Favorites in the category</h3>
							{this.favoritesPrint()}
						</div>
				}
				<form id="sort-form" onChange={this.props.sortCategoryImages}>
					<label htmlFor="sort-images">Sort </label>
					<select name="sort-images" id="sort-images">
						<option value="none" defaultValue hidden>-----</option>
						<option value="byCreated_at">By add date</option>
						<option value="byLikes">By likes</option>
					</select>
				</form>
				{this.imagesPrint()}
			</div>
		)
	}
}
export default CategoryResults;
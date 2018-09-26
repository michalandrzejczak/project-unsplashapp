import React, {Component} from "react";

import Category from "./Category.jsx"

class Categories extends Component {
	constructor(props) {
		super(props);
		
		this.categoriesPrint = this.categoriesPrint.bind(this);
		this.deployCategoryImages = this.props.deployCategoryImages;
		this.passCategoryInfo = this.props.passCategoryInfo;
	}
	
	categoriesPrint() {
		let categories = this.props.categories;

		return categories.map((category, index) => {
			return (
				<Category key={index}
									title={category.title}
									images={category.images}
									imagesCounter={category.imagesCounter}
									favorites={category.favorites}
									deployCategoryImages={this.deployCategoryImages} 
									passCategoryInfo={this.passCategoryInfo} />	
			)		
		});
	}
	
	render() {
		return (
			<div className="categories-container">
				{ 
					this.props.categories.length > 0 &&
					<h3>Saved categories</h3>
				}
				{this.categoriesPrint()}
			</div>
		)
	}
}

export default Categories;
import React, {Component} from "react";
import update from 'immutability-helper';
import "./App.css";

import Categories from "./Components/Categories.jsx"
import SearchResults from "./Components/SearchResults.jsx"
import CategoryResults from "./Components/CategoryResults.jsx"

const CLIENT_ID = "d5ad361043c946c8d97f5482c12c739c45a12d5ff6735c28fb9af8794dca742f",
			ENDPOINT = "https://api.unsplash.com/search/photos",
			IMAGES_PER_PAGE = 20;

class App extends Component {
	constructor(props) {
		super(props);
		
		this.query = "";
		this.submitedQuery = "";

		this.state = {
			images: [],
			searchCompleted: false,
			imagesAreStored: false,
			categories: [],
			categoryTitle: "",
		};
		
		this.trackQuery = this.trackQuery.bind(this);
		this.fetchApi = this.fetchApi.bind(this);
		this.storeCategory = this.storeCategory.bind(this);
		this.discardCategory = this.discardCategory.bind(this);
		this.deployCategoryImages = this.deployCategoryImages.bind(this);
		this.passCategoryInfo = this.passCategoryInfo.bind(this);
		this.sortCategoryImages = this.sortCategoryImages.bind(this);
		this.addCategoryImageToFavorites = this.addCategoryImageToFavorites.bind(this);
		this.closeCategoryResults = this.closeCategoryResults.bind(this);
	}
	
	trackQuery(event) {
		this.query = event.target.value;
	}
	
	fetchApi(e) {
		this.submitedQuery = this.query;
		e.preventDefault();
		fetch(`${ENDPOINT}?query=${this.submitedQuery }&client_id=${CLIENT_ID}&per_page=${IMAGES_PER_PAGE}`)
			.then(res => {
				return res.json()
			}).then(jsonRes => {
				this.setState({
					images: jsonRes.results,
					searchCompleted: true,
					imagesAreStored: false
				});
			})
			.catch(error => {
				console.log('Fetch failed. ', error);
			});
	}
	
	askToStore() {
		if (this.state.searchCompleted && this.submitedQuery) {
			return (
				<div>
					<span>Do you want to save your search as a category?</span>
					<button onClick={this.storeCategory}>Save</button>
					<button onClick={this.discardCategory}>Discard</button>
				</div>
			)
		}	
	}
	
	storeCategory(query) {
		let categoryKey = this.submitedQuery;
		let isCategoryDuplicated = false;
		
		this.state.categories.forEach(category => {
			if (categoryKey.toLowerCase() === category.title.toLowerCase()) {
				isCategoryDuplicated = true;
				this.setState({
					searchCompleted: false,
					images: []
				})
				alert("You can't add two identical categories");
			}
		});
			if (!isCategoryDuplicated) {
				this.setState({
					searchCompleted: false,
					categories: [...this.state.categories, {
						title: categoryKey,
						images: this.state.images,
						imagesCounter: this.state.images.length,
						favorites: []
					}],
					images: []
				});
			}
	}
	
	discardCategory() {
		this.setState({
			searchCompleted: false,
			images: []
		});
	}
	
	deployCategoryImages(categoryImages) {
		let shuffleArray = array => {
			let i = array.length - 1;
			for (; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		}
		let shuffledCategoryImages = shuffleArray(categoryImages)
		this.setState({
			images: shuffledCategoryImages
		});
	}
	
	passCategoryInfo(categoryTitle) {
		this.setState({
			imagesAreStored: true,
			categoryTitle: categoryTitle,
		})
	}
	
	resetSortForm() {
		document.getElementById("sort-form").reset();
	}
	
	toggleSearchOrCategory() {
		let categoriesTitles = [];
		
		this.state.categories.forEach((category) => {
			categoriesTitles.push(category.title)
		});

		let categoryNumber = categoriesTitles.indexOf(this.state.categoryTitle);
		
		if (this.state.imagesAreStored) {
			return <CategoryResults title={this.state.categoryTitle}
							 								images={this.state.images}
							 								resetSortForm={this.resetSortForm}
							 								sortCategoryImages={this.sortCategoryImages} 
							 								addCategoryImageToFavorites={this.addCategoryImageToFavorites}
							 								favorites={this.state.categories[categoryNumber].favorites}
							 								closeCategoryResults={this.closeCategoryResults}/>
		} else {
			return <SearchResults images={this.state.images}
														query={this.submitedQuery}/>
		}
	}
	
	sortCategoryImages() {
		let sortBy = document.querySelector("#sort-form select").value;
		
		if (sortBy === "byCreated_at") {
			this.setState({
				images:	this.state.images.sort(function(a, b) {
									return (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0);
								})
			});
		} else if (sortBy === "byLikes") {
			this.setState({
				images:	this.state.images.sort(function(a, b) {
					return (a.likes > b.likes) ? -1 : ((a.likes < b.likes) ? 1 : 0);
				})
			});
		} 
	}
	
	addCategoryImageToFavorites(categoryTitle, favoriteImage) {
		let categoriesTitles = [];
		this.state.categories.forEach((category) => {
			categoriesTitles.push(category.title)
		});
		
		let categoryNumber = categoriesTitles.indexOf(categoryTitle);
		
		let favoritesIds = [];
		this.state.categories[categoryNumber].favorites.forEach((favImg)=>{
			favoritesIds.push(favImg.id)
		});
		
		if (favoritesIds.indexOf(favoriteImage.id) === -1) {
			this.setState({
				categories: update(this.state.categories, {[categoryNumber]: {favorites: {$push: [favoriteImage]}}})
			})
		} else {
			alert("Didn't add image to favorites because it's already there.")
		}
	}
	
	closeCategoryResults() {
		this.setState({
			imagesAreStored: false,
			images: []
		})	
	}
	
	render() {
		return ( 
			<div className="main-container">
				<h1>Unsplash app</h1>
				<form className="search-form">
					<input type="text" onChange={this.trackQuery} onSubmit={this.fetchApi} />
					<input type="submit" onClick={this.fetchApi} value="Search"/>
				</form>	
				<Categories categories={this.state.categories} 
					deployCategoryImages={this.deployCategoryImages}
					passCategoryInfo={this.passCategoryInfo}/>
				<div className="storealert-container">
					{this.askToStore()}
				</div>
				{this.toggleSearchOrCategory()}
			</div>
		);
	}
}

export default App;
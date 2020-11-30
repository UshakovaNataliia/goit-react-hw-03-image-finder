import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoaderS from '../Loader';
import Modal from '../Modal';
import Searchbar from '../Searchbar';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const KEY = `6910569-55cee93e87be6f2f50b24f5a8`;

class App extends Component { 
  state = {
    page: 1,
    query: '',
    isOpenModal: false,
    largeImage: '',
    img: [],
    isLoading: false,
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.axiosPictures();
    }
  }

  getLargeImage = image => {
    this.setState({ largeImage: image });
    this.toggleModal();
  };
  getQuery = e => {
    this.setState({
      query: e,
      page: 1,
      img: [],
    })
  }
  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  axiosPictures = () => {
    this.setState({ isLoading: true });
    const URL = `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    axios
      .get(URL)
      .then(res => {
        console.log(res.data.hits);
        this.setState(prevState=>({
          img: [...prevState.img, ...res.data.hits],
          page: prevState.page + 1,
        }))
      })
      .then(() => { if (this.state.page > 2) this.scroll() })
      .catch(error=> {this.setState({error})})
      .finally(() => {this.setState({ isLoading: false })})
  }

  toggleModal = () => {
    this.setState({isOpenModal: !this.state.isOpenModal})
  }

  render() {
    const { isLoading, img, largeImage, isOpenModal, error } = this.state;
    const moreButton = img.length > 0 && !isLoading;

    return (
      <div className='App'>
        <Searchbar onSubmit={this.getQuery} />
        {error &&(<p color="red">Please enter another request</p>)}
        {isOpenModal && <Modal onClose={this.toggleModal} img={largeImage} />}
        {img.length > 0 ? (
          <ImageGallery>
            <ImageGalleryItem getLargeImage={this.getLargeImage} img={img} />
          </ImageGallery>
        ) : null}
        {isLoading && <LoaderS/>}
        {moreButton && (<Button onClick={this.axiosPictures}/>)}
      </div>
    );
  }
};

export default App;
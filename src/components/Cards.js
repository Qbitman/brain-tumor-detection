import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Know more about Brain Tumor</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Brain tumors: An Introduction'
              label='Introduction'
              path='https://mayfieldclinic.com/pe-braintumor.htm'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Detecting Brain Tumors from MRI Segmentation Using Deep Learning'
              label='Research Paper'
              path='/predict'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.png'
              text='Glioma Tumor'
              label='Type 1'
              path='/predict'
            />
            <CardItem
              src='images/img-4.png'
              text='Meningioma Tumor'
              label='Type 2'
              path='/about'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;

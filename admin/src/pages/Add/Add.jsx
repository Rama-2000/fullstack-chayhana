import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
const Add = () => {

  const [image,SetImage] = useState(false);


  return (
    <div className='add'>
      <form className='flex-col'>
          <div className="add-image-upload flex-col">
            <p>Upload image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>{SetImage(e.target.files[0])}} type="file" name="" id="image"  hidden required/>
          </div>
          <div className="add-product-name flex-col">
              <p>Product Name</p>
              <input type="text" name='name' placeholder='type here' />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea name='description' rows="6" placeholder='Write content here' required></textarea>
          </div>
          <div className="add-categoty-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pasta">Pasta</option>
                <option value="Nudles">Nudles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input type="number" name='price' placeholder='$20' />
            </div>
          </div>
          <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add
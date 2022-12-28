import React, { useState, useEffect } from 'react'
import './AddBook.css'

function AddBook() {
  return(
    <div className='AddBook'>
      <p className='book_input'>Título</p>
      <input className='book_input' id='bi_title'></input>


      <p className='book_input'>Autor</p>
      <input className='book_input' id='bi_author'></input>


      <p className='book_input'>Edición</p>
      <input className='book_input' id='bi_edition'></input>


      <p className='book_input'>Editorial</p>
      <input className='book_input' id='bi_publisher'></input>


      <p className='book_input'>Numeración</p>
      <input className='book_input' id='bi_numeration'></input>


      <p className='book_input'>Imagen</p>
      <input className='book_input' id='bi_image'></input>

      <button className='book_input'>Añadir</button>
   </div>
  )
}


export default AddBook
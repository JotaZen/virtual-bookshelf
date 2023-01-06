import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import Main from './layouts/Main/Main'
const root = ReactDOM.createRoot(document.getElementById('root'))

const Loading = (loadingDelayHidden = 0) => {
  let loading = null
  function hideLoading() {
    setTimeout(() => {
      if(loading !== null) {
        loading.classList.remove('showLoading')  
        loading.classList.add('fadeOut')
        setTimeout(function () {
          loading.remove()
        }, 250)
      }
    }, loadingDelayHidden)
  }
  function init() {
    document.addEventListener('DOMContentLoaded', function () {
      loading = document.querySelector('.loading')  
      hideLoading()          
    })
  }
  return {
      'init': init
  }
}
Loading(250).init()

root.render(<Main/>)


import { useEffect, useState } from 'react'
import axios from 'axios'

export function useRequestApi(url, options){
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isRequest, setIsRequest] = useState(true)

  useEffect(() => {
    axios.get(url, options)
      .then(response => {
        setData(response.data.products)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsRequest(false)
      })    
  }, [])

  return { data, error, isRequest }
}

export function useRequestLocalStorage(key){
  const [data, setData] = useState([])

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem(key)))
  }, [])

  return { data }
}


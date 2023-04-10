import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMaxVal, getMinVal, searchInp } from "../../redux/search"

const useSearch = () => {
  const [searchInput, setSearchInput] = useState('')
  const [minNum, setMinNum] = useState('')
  const [maxNum, setMaxNum] = useState('')
  const dispatch = useDispatch()

  const checkInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const getMin = (e) => {
    setMinNum(e.target.value)
  }

  const getMax = (e) => {
    setMaxNum(e.target.value)
  }

  useEffect(() => {
    dispatch(searchInp(searchInput))

    dispatch(getMinVal(minNum))
    dispatch(getMaxVal(maxNum))
  }, [searchInput, minNum, maxNum])

  return {
    checkInput,
    handleSearch,
    searchInput,
    getMax,
    getMin
  }
}

export default useSearch
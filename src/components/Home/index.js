import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EachItem from '../EachItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {list: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAllCourses()
  }

  getAllCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const api = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(api)
    const data = await response.json()
    console.log(data.courses)
    if (response.ok) {
      const fetchedCourses = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        list: fetchedCourses,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    const onClickRetry = () => this.getAllCourses()
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={onClickRetry}>
          Retry
        </button>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingCourses()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderingCourses = () => {
    const {list} = this.state
    return (
      <div>
        <Header />
        <div>
          <h1>Courses</h1>
          <ul>
            {list.map(each => (
              <EachItem details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return <>{this.renderProductDetails()}</>
  }
}

export default Home

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDatails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const api = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(api)
    const data = await response.json()
    const details = data.course_details
    if (response.ok) {
      const filteredData = {
        id: details.id,
        name: details.name,
        description: details.description,
        imageUrl: details.image_url,
      }
      this.setState({
        courseDatails: filteredData,
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
    const onClickRetry = () => this.getCourseDetails()
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
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
        return this.renderingCourseView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderingCourseView = () => {
    const {courseDatails} = this.state
    const {imageUrl, name, description} = courseDatails
    return (
      <div>
        <Header />
        <div>
          <img src={imageUrl} alt={name} />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return <>{this.renderProductDetails()}</>
  }
}
export default CourseDetails

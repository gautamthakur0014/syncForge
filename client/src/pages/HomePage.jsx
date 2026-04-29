import {Link} from "react-router"

const HomePage = () => {
  return (
    <div>
      this is home page
      <Link to={"/Playground"} >
      IDE
      </Link>
    </div>
  )
}

export default HomePage

import Notes from './Notes'

const Home = (props) => {
  return (
    <div className='containe my-3'>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home

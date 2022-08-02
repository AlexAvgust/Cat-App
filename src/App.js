import logo from './logo.svg';
import './App.css';
import React ,{Component} from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'b99cd043-f11f-4991-b96d-440b5407aea9 ';


class App extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      images: [],
      breeds: [],
      details: [],
      selected_breed: 0
    }
    this.onBreedSelectChange = this.onBreedSelectChange.bind(this)
  
  }
  async getBreeds() {
    const res = await axios('/breeds')
    return res.data
  }

  async getCatsImagesByBreed(breed_id,amount) {
    const res = await axios('/images/search?breed_ids='+breed_id + "&limit="+ amount)
   this.setState({details:res.data[0].breeds[0]})
    return res.data
    
  }

  async loadBreedImages() {

    let breed_images = await this.getCatsImagesByBreed(this.state.selected_breed,1)
    this.setState({images: breed_images})
  }



async onBreedSelectChange(e) {
  await this.setState({selected_breed: e.target.value})
  await this.loadBreedImages()
}

componentDidMount(){
  if(this.state.breeds.length === 0){
    (async () => {
      try {
        this.setState({breeds: await this.getBreeds()})
      } catch(e) {
        console.log(e)
      }
    })()
  }
}

render(){
  return (
    <div className="App">
    <select value={this.state.selected_breed}
    onChange={this.onBreedSelectChange}>
      {this.state.breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
    </select>

      <div>
        {this.state.images.map((image) => <img className='cat-image' src={image.url}></img>)}
      </div>
      <div className='container'>
      <div className='text'>
      <p >Description : {this.state.details.description}</p>
      </div>
     <div>
      <h2><b>Adaptability :</b> {this.state.details.adaptability}</h2>
      <h2><b>Child friendly :</b> {this.state.details.child_friendly}</h2>
      <h2><b>Energy level :</b> {this.state.details.energy_level}</h2>
      <h2><b>Health issues :</b> {this.state.details.health_issues}</h2>
      <h2><b>Hypoallergenic :</b> {this.state.details.hypoallergenic}</h2>
      <h2><b>Affection level :</b> {this.state.details.affection_level}</h2>
      <h2><b>Dog friendly :</b> {this.state.details.dog_friendly}</h2>
      </div>
      </div>
    </div>
  );

}
}

export default App;

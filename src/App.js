import React, {Component} from 'react'
import './App.css';
import Customer from './components/Customer'

const customers = [
  {
  'id':1,
  'image': 'https://placeimg.com/64/64/1',
  'name': 'Geralt',
  'birthday':'89',
  'gender': 'male',
  'job': 'Witcher'
  },
  {
  'id':2,
  'image': 'https://placeimg.com/64/64/2',
  'name': 'Triss',
  'birthday':'93',
  'gender': 'female',
  'job': 'Sorceress'
  },
  {
  'id':3,
  'image': 'https://placeimg.com/64/64/3',
  'name': 'Yen',
  'birthday':'91',
  'gender': 'female',
  'job': 'sorceress'
  }
]

class App extends Component {
  render(){
    return (
      <div>
         {
           customers.map(c => {
             return (
               <Customer
               key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
               />
             )
           })
         }
      </div>
     
    );
  }
}

export default App;

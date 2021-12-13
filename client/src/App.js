import React, {Component} from 'react'
import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper' // component 외부 감싸는 tag 중 하나 
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles} from '@material-ui/core/styles' //css 사용하려면 withStyles import 해야한다

// root 100% 그리고 위쪽으로 여백을 3의 가중치 만큼 가질수 있고, 전체 바깥쪽에 해당하는 X 쪽으로 overflow 발생할수 있도록 처리
// 결과적으로 테이블은 1080 픽셀 이상 출력 될수 있도록 만든다
const styles = theme => ({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

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
/* React Component Life Cycle
React 라이브러리가 처음 Component 불러올때 다음 순서를 따른다 

 1) consturctor()

 2) componentWillMount()

 3) render()

 4) componentDidMount()

*/

/*

props나 state가 변경 되는경우 
props or state => shouldComponentUpdate()

*/



class App extends Component {
  // props 는 변경될수 없는 데이터를 명시할때 사용
  // state는 Component 내에서 고객 정보처럼 변경될수 있는 변수를 처리할때 사용
  state = {
    customers: "",
    completed: 0 // pregress bar 0% 부터 100 % 까지 찬다 
  }

  // 일반적으로 api 서버에 접근해서 데이터를 받아오는 등의 작업은 ComponentDid mount 에서 해줄 수 있다
  componentDidMount(){
    this.timer = setInterval(this.progress, 20) // 0.02 초 마다 progress 함수 실행 되도록 한다. 
    this.callApi()
      .then(res=> this.setState({customers: res}))
      .catch(err => console.log(err))
  }

  callApi = async () =>{
    const response = await fetch('/api/customers')
    const body = await response.json()
    return body
  }

  progress = () =>{
    const {completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed +1}) // 100 이 되는 순간 0으로 줄어들도록 하고 아닌경우 1씩 추가 한다 
  }

  render(){
    
    const {classes}=this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.customers ? this.state.customers.map(c => {
            return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)}
            ) : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
              </TableCell>
            </TableRow>
            } 
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

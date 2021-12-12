import React, {Component} from 'react'
import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles} from '@material-ui/core/styles'

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

class App extends Component {
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
          {customers.map(c => {return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)})}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

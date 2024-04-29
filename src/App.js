import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Nav, Navbar, Button} from 'react-bootstrap'
import './App.css';
import {Routes, Route, useNavigate, Outlet, Link} from 'react-router-dom'
import DetailPage from './pages/Detail.js';
import Cart from './pages/Cart.js';
// css를 제공해주는 사이트 : bootstrap
// npm install react-bootstrap bootstrap

// 자바스크립트 파일은 확장자명 생략
// 다른 자바크스립트에서 export 한건 import로 가져와서 사용 (변수처럼 사용)

import  data from './data'
import {num1, num2, num3} from './data.js'

// 이미지를 사용하려면 import 
import mainBG from './main.png';    // 이미지 import
import { useState } from 'react';

// 라우터는 창을 새로 불러오는게 아니라 재렌더링 방식을 사용 
function App() {
let [items, setItems] = useState(data);   // data => items
let [photo, setPhoto] = useState(['/monitor.png', '/mouse.png', '/keyboard.png','/logo192.png']);
let navigate = useNavigate()

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src='/logo192.png' width={'40px'} height={'40px'}/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>홈</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>장바구니</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link>
            <Nav.Link onClick={()=>{navigate(1)}}>앞으로가기</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path= '/' element={
          <>
      <div className='main-bg'>
      </div>
      <Container>
        <Row>
          {/* 데이터의 갯수가 image가 바뀔 수 있으니까 useState 처리
            data : 변수 (사용자 입력 또는 서버로 부터 데이터를 받았으때 변경이 되어도 화면은 안바뀜 ==> useState)
          */}
          {/* map을 통해서 useState(data) 만큼 반복 */}
        {items.map((e,idx)=>{
          return(
            <ItemCol data={e} img={photo[idx]} key={e}/>
          )
        })}
          {/* <ItemCol data={items[0]} img={photo[0]}/>
          <ItemCol data={items[1]} img={photo[1]}/>
          <ItemCol data={items[2]} img={photo[2]}/> */}
          
          {/* <Col>
            <img src='/mouse.png' width={`300px`} height={`300px`}/>
            <h4>{data[1].title}</h4>
            <p>{data[1].price} 원</p>
          </Col>
          <Col>
            <img src='/keyboard.png' width={`300px`} height={`300px`}/>
            <h4>{data[2].title}</h4>
            <p>{data[2].price} 원</p>
          </Col> */}
        </Row>
      </Container>
        </>
        }></Route>
        {/* :id   ==> URL 파라미터를 통해서 상세아이템 변경 */}
        <Route path= '/detail/:id' element={<DetailPage items={items} img={photo}/>}></Route>
        {/* <Route path= '/detail/1' element={<DetailPage items={items} id={1} img={photo}/>}></Route>
        <Route path= '/detail/2' element={<DetailPage items={items} id={2} img={photo}/>}></Route> */}
        <Route path= '/about' element={<AboutPage/>}>
          <Route path='adress' element={<div>주소</div>}></Route>
          <Route path='location' element={<div>위치</div>}></Route>
        </Route>
        <Route path= '/about/member' element={<div>어바웃 멤버페이지</div>}></Route>
        <Route path= '/cart' element={<Cart/>}></Route>
        <Route path= '*' element={<div>그 외의 페이지(404)</div>}></Route>
      </Routes>

        {/* 리액트는 하나의 html을 다시 그리는 방식이기 떄문에 html을 이동하는 <a>태그 보다는 리액트 라우터의 <Link>를 사용 */}
        <Link to="/about/adress"><Button variant="warning">리엑트 부트스트랩 버튼</Button></Link>



      {/* <div style={{backgroundImage:`url(/mouse.png)`, height:`300px`, 
      backgroundSize:`cover`, width:`100%`,backgroundPosition:`center` }}>
      </div> */}

    
    </div>
  );
}

export default App;

// 컴포넌트 맨 앞글자는 대문자 
// return에 html(jsx) 코드 사용
// 컴포넌트로 분리를 했으면 props로 받아와야하는 부분을 변경 
function ItemCol(props)
{
  // 사용하는 곳에서 결정해줘야하는 부분 (그때그때 바꿔어야하는 부분)만 props 처리
  return(
    <>
      <Col>
          <img src={props.img} width={`300px`} height={`300px`}/>
          <h4>{props.data.title}</h4>
          <p>{props.data.price} 원</p>
      </Col>
    </>
  )
}

// 어바웃페이지의 컴포넌트
function AboutPage()
{
  return(
    <>
      <div>
        <h4>어바웃페이지</h4>
        {/* Outlet으로 중첩Route의 위치를 결정 */}
        <Outlet/>
      </div>
    </>
  )
}

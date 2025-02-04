import React, { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../contexts/BoardContextProvider';
import './DetailBoard.css';
import Header from '../components/Header/Header';
import { useLocation } from 'react-router-dom';
import * as boardapi from '../apis/boardapi';
import { LoginContext } from '../contexts/LoginContextProvider';
import moment from 'moment'; 
import * as Swal from '../apis/alert';
import Comment from './Comment';

//DetailBoard에서 현재페이지와 search, keyword를 가져와야 한다.
const DetailBoard = () => {
   let {page, search, keyword} = useContext(BoardContext);
   const { isLogin, roles, userInfo } = useContext(LoginContext)

   const location = useLocation(); //BoardForm에서 Link to로 같이 넘기 데이터를 받는다.
   const num = location.state.num;

   let [board, setBoard] = useState({});

   /* let [writer, setWriter] = useState();
   let [email, setEmail] = useState();
   let [reg_date, setReg_date] = useState();
   let [readcount, setReadcount] = useState();
   let [subject, setSubject] = useState();
   let [content, setcontent] = useState(); */

   useEffect(() => {
      console.log("DetailBoard num:"+num);
      getDetailBoard(num);
   },[])

   const getDetailBoard = async (num) => {
      
      let response;
      
      try{
         response = await boardapi.detailboard(num);
      }catch(error){
         console.log(error)
      }
      console.log(response.data.detailboard)
      setBoard({...response.data.detailboard});
   }

   const commentRegister = () => {
      if(!isLogin){
         Swal.alert("로그인이 필요합니다.","로그인하세요","warning",() => {});
         return;
      }
   }

   return (
      <>
      <Header/>
      <div style={{marginLeft:200}}>
      <div className="detailboard-container">
         <div className="detailboard-header">
               <div className="profile-icon"><img src={process.env.PUBLIC_URL + 'img/profile_man.png'} width={50}/></div>
               <div className="detailboard-info">
                  <span className="username">{board.writer}</span>
                  <span className="timestamp">{board.reg_date}</span>
               </div>
         </div>
         <div className="detailboard-content">{board.subject}</div>
         <div className="detailboard-detail">{board.content}</div>
         <div className="reply-box">
            <input type="text" className="reply-input" placeholder="댓글을 입력하세요." />
            <button className="submit-button" onClick={commentRegister}>등록</button>
         </div>
      </div>
      <Comment/>
      </div>
      </>
   );
};

export default DetailBoard;
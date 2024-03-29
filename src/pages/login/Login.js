/* eslint-disable no-duplicate-case */
import React, { useRef } from 'react';
import InputText from '../../components/user/InputText';
import Box from '../../components/user/Box';
import styled from "styled-components";
import FindAccountModal from '../../components/user/Modal';
import FindId from './FindId';
import FindPwd from './FindPwd';
import SignUp from './SignUp';
import ManagerLogin from './ManagerLogin';
import InputButton from '../../components/user/InputButton'
import axios from "axios";
import UserFooter from '../../components/user/UserFooter'
import Footer from '../manager/Layout/component/footer';
class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            account: {
                userID: '',
                userPW: ''
            },
            loginError: false,
            loginErrorMessage: '',
            findId: false,
            findPwd: false,
            signUp: false,
            managerLogin: false
        }
    }

    closeFindId() {
        this.setState({ findId: !this.state.findId })
    }

    closeFindPwd() {
        this.setState({ findPwd: !this.state.findPwd })
    }

    closeSignUp() {
        this.setState({ signUp: !this.state.signUp })
    }

    closeManagerLogin() {
        this.setState({ managerLogin: !this.state.managerLogin })
    }

    getCurrenOpenModal() {
        if (this.state.findId) return <FindAccountModal onClick={this.closeFindId.bind(this)}><FindId></FindId></FindAccountModal>
        else if (this.state.findPwd) return <FindAccountModal onClick={this.closeFindPwd.bind(this)}><FindPwd></FindPwd></FindAccountModal>
        else if (this.state.signUp) return <FindAccountModal onClick={this.closeSignUp.bind(this)}><SignUp></SignUp></FindAccountModal>
        else if (this.state.managerLogin) return <FindAccountModal onClick={this.closeManagerLogin.bind(this)}><ManagerLogin></ManagerLogin></FindAccountModal>
        return null;
    }

    handleIDChange(event) {
        this.setState({
            account: {
                userID: event.target.value,
                userPW: this.state.account.userPW
            }
        });
    }
    handlePWChange(event) {
        this.setState({
            account: {
                userID: this.state.account.userID,
                userPW: event.target.value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.account)
        if (this.state.account.userID.length === 0) {
            this.setState({
                loginError: true,
                loginErrorMessage: ' 아이디를 입력해 주세요.'
            })
            return;
        }

        if (this.state.account.userPW.length === 0) {
            this.setState({
                loginError: true,
                loginErrorMessage: ' 비밀번호를 입력해 주세요.'
            })
            return;
        }

        axios.post('http://localhost:8080/allowedUser/login',
            this.state.account
            ,
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data)
                const content = response.data;
                switch (content.data) {
                    case 0: //로그인 완료
                        window.sessionStorage.setItem('id', this.state.account.userID);
                        window.location.reload();
                        break;

                    case 1: //비밀번호 불일치
                        this.setState({
                            loginError: true,
                            loginErrorMessage: '아이디 또는 비밀번호가 잘못 입력 되었습니다.'
                        });
                        break;

                    case 2: //관리자 승인 전
                        this.setState({
                            loginError: true,
                            loginErrorMessage: '회원가입 허가 전 입니다.'
                        });
                        break;

                    case 3: //해당 id 회원 정보 없음
                        this.setState({
                            loginError: true,
                            loginErrorMessage: '아이디 또는 비밀번호가 잘못 입력 되었습니다.'
                        });
                        break;

                    default:
                        this.setState({
                            loginError: true,
                            loginErrorMessage: '아이디 또는 비밀번호가 잘못 입력 되었습니다.'
                        });
                        break;
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    render() {

        let modal = this.getCurrenOpenModal();

        return (
            <div>
                <LoginStyle>
                    <TitleStyle><img src="\image\Logo.png" alt="" width="300px" /></TitleStyle>
                    <div>
                        <Box>
                            <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                                <InputText type='text' name="id" onChange={(event) => this.handleIDChange(event)} value={this.state.account.userID || ''} placeholder="아이디 입력"></InputText>
                                <br />
                                <InputText type='password' name="password" onChange={(event) => this.handlePWChange(event)} value={this.state.account.userPW || ''} placeholder="비밀번호 입력"></InputText>
                                {this.state.loginError ? <LoginErrorLog> {this.state.loginErrorMessage}</LoginErrorLog> : ''}
                                <InputButton type="submit" value="로그인" onClick={this.login} />
                            </form>

                            <LoginMenu>
                                <LoginMenuElement style={{ cursor: "pointer" }} onClick={() => this.setState({ findId: !this.state.findId })}>
                                    아이디 찾기
                                </LoginMenuElement>
                                <StyledSpan>|</StyledSpan>
                                <LoginMenuElement style={{ cursor: "pointer" }} onClick={() => this.setState({ findPwd: !this.state.findPwd })}>
                                    비밀번호 찾기
                                </LoginMenuElement>
                                <StyledSpan>|</StyledSpan>
                                <LoginMenuElement style={{ cursor: "pointer" }} onClick={() => this.setState({ signUp: !this.state.signUp })}>
                                    회원가입
                                </LoginMenuElement>
                            </LoginMenu>
                        </Box>
                        <MangerLoginDiv onClick={() => this.setState({ managerLogin: !this.state.managerLogin })}>
                            관리자 로그인 {'>'}
                        </MangerLoginDiv>
                    </div>
                    {modal}
                </LoginStyle>
                <UserFooter isLoginPage={true}></UserFooter>
            </div>
        )
    }

}

let LoginStyle = styled.div`
    position:relative;
    max-width:450px;
    margin: 0 auto;
    /* left:50%;
    transform: translateX(-50%); */
    /* position: absolute;
    display:flex;
    align-items:center;
    justify-content:center; */
`;

let TitleStyle = styled.div`
  font-weight: 800;
  font-size: 50px;
  font-family: "NanumSquareB";
  line-height: 90%;
  margin: 40px;
  margin-top:100px;
`;

let LoginErrorLog = styled.div`
    color:red;
    font-size:12px;
    text-align:left;
    margin: 0 auto;
    width:225px;
`;

let LoginMenu = styled.ul`
    text-align:center;
    padding-left:0;
    margin:3px;
`
let LoginMenuElement = styled.li`
    position: relative;
    display: inline-block;
    font-size:14px;
`

let MangerLoginDiv = styled.div`
   max-width: 400px;
   margin: 0 auto;
   text-align:left;
   margin-top:10px;
   font-size:14px;
   cursor: pointer;
   margin-bottom:200px;
`
let StyledSpan = styled.span`
    display: inline-block;
    width: 1px;
    height: 16px;
    margin: 3px 10px 0 10px;
    background: #d6d6d6;
    text-indent: -9999px;
    vertical-align: top;
`

export default Login;
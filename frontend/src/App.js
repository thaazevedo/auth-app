import React, { useState } from 'react';

import { 
	MDBContainer,  
	MDBCard,
} from "mdbreact";
import {
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { client } from './services/client';
import './App.css';


function App() {
	
	// Variáveis de uauário:
	const [idCurrentUser, setIdCurrentUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Seta um usuário atual logado:
	const [currentUser, setCurrentUser] = useState();

	// Mostra ou não a senha ao cadastrar, logar ou atualizar conta:
	const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
	
	// Registra se possui erro no email
	const [errorEmail, setErrorEmail] = useState(null);
	// Registra se possui erro na senha
	const [errorPassword, setErrorPassword] = useState(null);

	// Verifica valores do input de email:
	function isValidEmail(email) {
		console.log(/\S+@\S+\.\S+/.test(email))
    return /\S+@\S+\.\S+/.test(email);
  }

	// Verifica valores do input de password:
	function isValidPassword(password) {
		console.log(password)
		if (password.length >= 6) {
			return true;
		} else {
			return false;
		}
	}
	
	// Verifica valores dos inputs:
	function check_inputs(email, password) {
		let cont_error = 0;

		if (!isValidEmail(email)) {
			cont_error++;
			setErrorEmail('Email inválido!');
    } else{setErrorEmail('')}

		if (!isValidPassword(password)) {
			cont_error++;
			setErrorPassword('Password inválida!')
		} else {setErrorPassword('')}

		return cont_error;
	}


	// Função para cadastro de um usuário:
	function submitRegistration(e) {
		e.preventDefault();

		// Verifica os inputs
		let errors = check_inputs(email, password);
		
		if (errors === 0){
			// Post on signup api
			client.post(
				"/api/signup/",
				{
					email: email,
					password: password
				}
			).then(res => {
				// Se o status do response for 201, faça o login do user criado
				if (res.status === 201){
					submitLogin(e)
				}
			});	
		}
	}
	
	// Auxilia renderizações condicionais de login de um usuário:
	const [isLogin, setIsLogin] = useState(true);
	// Função para login de um usuário:
	function submitLogin(e) {
		e.preventDefault();

		// Verifica os inputs
		let errors = check_inputs(email, password)

		if (errors === 0){
			try {
				// Post on login api
				client.post(
					"/api/login/",
					{
						email: email,
						password: password
					}
				).then(res => {
					// Se o status do response for 200, set as informações do current user
					if (res.status === 200) {
						setCurrentUser(true)
						setEmail(res.data.data['email'])
						setPassword(res.data.data['password'])
						setIdCurrentUser(res.data.id)
					} 
				}
				)
			} catch (error) {
				alert("Ocorreu algum erro, verifique e tente novamente!!")
			}
		} 
  }

	// Função para logout de um usuário:
	function submitLogout(e) {
    e.preventDefault();
		// Post on logout api
    client.post(
      "/api/logout/",
      {withCredentials: true}
    ).then(res => {
			// Se o status do response for 200, reset as informações da página
			if (res.status === 200){
				clearStates()
			}			
    });
	}

	// Auxilia renderizações condicionais de atualização de um usuário:
	const [isUpdateUser, setIsUpdateUser] = useState(false);
	const toggleUpdate = () => setIsUpdateUser((isUpdateUser) => !isUpdateUser);
	// Função para atualizar informações de um usuário:
	function submitUpdate(e) {
		e.preventDefault();

		// Verifica os inputs
		let errors = check_inputs(email, password)
		
		if (errors === 0){	
			// Put on user api
			client.put(
				`/api/user/${idCurrentUser}`,
				{
					email: email,
					password: password
				}
			).then(res => {
				// Se o status do response for 200, redirecione o usuário para refazer o login
				// com as novas credenciais
				if (res.status === 200) {
					clearStates()
				}
			});
		}
	}

	// Auxilia renderizações condicionais de exclusão de um usuário:
	const [isDeleteUser, setIsDeleteUser] = useState(false);
	const toggleDelete = () => setIsDeleteUser((isDeleteUser) => !isDeleteUser);
	// Função para apagar um usuário:
	function submitDelete(e) {
		e.preventDefault();
		// Delete on user api
		client.delete(
			`/api/user/${idCurrentUser}`,
		).then(res => {
			// Se o status do response for 204, reset as informações da página
			if (res.status === 204) {
				clearStates()
			}
		});
	}

	// Reinicia os estados das variáveis em caso de atualização, logout ou exclusão de uma conta:
	const clearStates = () => {
		setCurrentUser(false)
		setIdCurrentUser('')
		setEmail('')
		setPassword('')
		setIsLogin(true)
		setIsUpdateUser(false)
		setIsDeleteUser(false)
		setShowPassword(false)
	}


	// Renderização após login/registro de um usuário:
	if (currentUser) {
    return (
      <div classname='dash-infos'>
				
				{/* Barra de Navegação do dashboard do usuário */}
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static" className='MuiBox-root'>
						<Toolbar className='tool-bar'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{fontWeight: 'bolder', fontSize: '20px'}}>
								Bem vindo!
							</Typography>
							{/* Ícone logout */}
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 5 }}
								onClick={(e) => submitLogout(e)}
							>
								<LogoutIcon  />
							</IconButton>
						</Toolbar>
					</AppBar>
				</Box>

				{/* Container com dados da conta para visualização, edição ou exclusão */}
				<MDBContainer className="container">
					<MDBCard className='card'>
						<Grid
							className='container'
							item
							xs={12}
							sm={12}
							md={12}
							component={Paper}
							elevation={6}
							square 
						>	
							{/* Altera o título conforme a função: visualização/edição/exclusão */}
							<div className="paper">
								{isUpdateUser ? (
									<Typography component="h1" variant="h5" style={{color: '#60495a', fontWeight: '700'}}>
										Altere as informações a serem atualizadas:
									</Typography>
								) : (
									isDeleteUser ? (
										<Typography component="h1" variant="h5" style={{color: '#60495a', fontWeight: '700'}}>
											Confirme a exclusão da conta!
										</Typography>
									) : (
										<Typography component="h1" variant="h5" style={{color: '#60495a', fontWeight: '700'}}>
											Atualize suas informações
										</Typography>
									)
								)}
								{/* Renderização condicional do campo de email para habilitar a visualização/edição */}						
								<div className="white-text row email">
									<TextField
										disabled={isUpdateUser ? false : true}
										defaultValue={email}
										label="E-mail"
										id="standard-start-adornment"
										sx={{ m: 1, width: '40ch' }}
										InputProps={{
											endAdornment: 
											<InputAdornment position="end">
												<EmailIcon sx={{fontSize: 32}} style={{color: "#60495a", marginRight: '7px'}}/>
											</InputAdornment>,
										}}
										variant="standard"
										onChange={(e) => setEmail(e.target.value)}

									/>
									{errorEmail && <p className='error'>{errorEmail}</p>}
									</div>
							
								{/* Password input com lógica para visualizar/atualizar ou não a senha */}
								<div className="white-text row" style={{marginTop: '30px'}}>
									<FormControl 
										disabled={isUpdateUser ? false : true}
										sx={{ m: 1, width: '40ch' }} 
										variant="standard">
										<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
										<Input
											defaultValue={password}
											required
											id="standard-adornment-password"
											className='icon-visibility'
											type={isUpdateUser ? showPassword ? 'text' : 'password' : 'password'}
											endAdornment={
												<InputAdornment position="end">
													{isUpdateUser ? (
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
														>	
															{showPassword ? <Visibility sx={{fontSize: 35}} /> : <VisibilityOff sx={{fontSize: 35}} />}
														</IconButton>
													):(
														<IconButton
															aria-label="toggle password visibility"
														>	
															<VisibilityOff sx={{fontSize: 35}} />															
														</IconButton>
													)}
												</InputAdornment>
											}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</FormControl>
									{errorPassword && <p className='error'>{errorPassword}</p>}
								</div>

								{/* Renderização condicional dos botões para atualizar/apagar uma conta */}	
								{isUpdateUser ? (
									<div className='edit-user-infos'>
										<input 
											style={{marginRight: '30px'}}
											type="submit" 
											value="Voltar"
											className="btn btn-back" 
											onClick={() => 
												toggleUpdate()
											} 
										/>
										<input 
											type="submit" 
											value="Atualizar"
											className="btn btn-edit" 
											onClick={(e) => submitUpdate(e)}
										/>
										
									</div>
								):(
									isDeleteUser ? (
										<div className='edit-user-infos'>
											<input 
												style={{marginRight: '30px'}}
												type="submit" 
												value="Voltar"
												className="btn btn-back" 
												onClick={() => 
													toggleDelete()
												} 
											/>
											<input 
												type="submit" 
												value="Apagar"
												className="btn btn-delete" 
												onClick={(e) => submitDelete(e)} 
											/>
										</div>
									):(
										<div className='edit-user-infos'>
											<input 
												style={{marginRight: '30px'}}
												type="submit" 
												value="Editar"
												className="btn btn-edit" 
												onClick={() => toggleUpdate()}
											/>
											<input 
												type="submit" 
												value="Apagar"
												className="btn btn-delete" 
												onClick={() => {
													toggleDelete()
												}} 
											/>
										</div>
									)
								)}								
							</div>
						</Grid>					
					</MDBCard>
				</MDBContainer>
      </div>
    );
  }

	
	// Renderização inicial de login ou registro de um cliente
	// Também é mostrada após o logout, atualização ou exlusão de uma conta
  return (
    <div className="login">
			<MDBContainer className="container">
        <MDBCard className='card'>
						<Grid
							className='container'
							item
							xs={12}
							sm={12}
							md={12}
							component={Paper}
							elevation={6}
							square 
						>
							{/* Altera o título conforme a função: login/signup */}
							<div className="paper">
							<AccountCircleIcon sx={{fontSize: 90}}/>
							{isLogin ? (
								<Typography component="h1" variant="h5" style={{color: '#60495a', fontWeight: '700'}}>
									Sign In
								</Typography>
								):(
									<Typography component="h1" variant="h5" style={{color: '#60495a', fontWeight: '700'}}>
										Sign Up
									</Typography>
								)}

							{/* Email input com ícone de email*/}
							<div className="white-text row email">						
								<TextField
									label="E-mail"
									id="standard-start-adornment"
									sx={{ m: 1, width: '40ch' }}
									InputProps={{
										endAdornment: 
										<InputAdornment position="end">
											<EmailIcon sx={{fontSize: 32}} style={{color: "#60495a", marginRight: '7px'}}/>
										</InputAdornment>,
									}}
									variant="standard"
									onChange={(e) => setEmail(e.target.value)}
								/>														
								{errorEmail && <p className='error'>{errorEmail}</p>}														
							</div>
							
							{/* Password input com lógica para visualizar ou não a senha*/}
							<div className="white-text row" style={{marginTop: '30px'}}>
								<FormControl 
									sx={{ m: 1, width: '40ch' }} 
									variant="standard">
									<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
									<Input
										required
										id="standard-adornment-password"
										className='icon-visibility'
										type={showPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
												>
													{showPassword ? <Visibility sx={{fontSize: 35}} /> : <VisibilityOff sx={{fontSize: 35}} />}
												</IconButton>
											</InputAdornment>
										}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</FormControl>
								{errorPassword && <p className='error'>{errorPassword}</p>}
							</div>

							{/* Renderiza o botão de logar/registrar */}
							<input 
								type="submit" 
								value={isLogin ? ("Entrar") : ("Registrar")} 
								className="btn btn-submit" 
								onClick={(e) => isLogin ? (submitLogin(e)):(submitRegistration(e))}
								// onclick="check_inputs()" 
							/>

							{/* Renderização condicional do texto para alternar entre login/signup */}
							{isLogin ? (
								<span style={{color: "#60495a", marginTop: '10px', fontSize: '12px'}}>
									Não possui conta? <strong 
										className='btn-signup' 
										onClick={() => {
											setIsLogin(false)
											}}> 
												Registre-se!
									</strong>
							</span>
							):(
								<span style={{color: "#60495a", marginTop: '10px', fontSize: '12px'}}>
								Já possui conta? <strong 
									className='btn-login' 
									onClick={() => {
										setIsLogin(true)
										}}> 
										  Entre!
								</strong>
							</span>
							)}
						</div>
					</Grid>          
      </MDBCard>
    </MDBContainer>
	</div>
	);
}
export default App;
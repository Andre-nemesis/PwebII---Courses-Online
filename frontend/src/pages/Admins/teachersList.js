// components/TeachersList.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Button, IconButton } from '@mui/material';
import api from '../../service/api.js';
import Menu from '../../components/Menu.js';
import SearchBar from '../../components/SearchBar.js';
import { Delete, Edit, Add } from "@mui/icons-material";
import EditTeacherModal from '../../components/EditTeacherModal.js';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import SuccessMessageModal from '../../components/SuccessMessageModal.js';
import ErrorMessageModal from '../../components/ErrorMessageModal.js';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openStoreModal, setOpenStoreModal] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/admin/viewTeacher');
				setTeachers(response.data);
        setFilteredUsers(response.data);
    
      } catch (err) {
        setError('Erro ao buscar professores'+err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [refreshKey]);

  const fetchUsersByTermo = async (termo) => {
		try {
			const response = await api.get(`/teachers/search/${encodeURI(termo)}`);
			if (!response.data) {
				throw new Error('Erro ao buscar professor.');
			}
			return response.data;

		} catch (error) {
			console.error('Erro ao buscar por termo:', error);
			return null;
		}
	};

  const handleSearchChange = async (e) => {
    const value = e.target.value.trim();
    setSearchValue(value);
    console.log(searchValue);

    if (!value) {
      setFilteredUsers(teachers);
      setSearch(false);
      return;
    }

    const usersByTermo = await fetchUsersByTermo(value);
    if (usersByTermo && usersByTermo.length > 0) {
      setFilteredUsers(usersByTermo);
      setSearch(true);
      return;
      
    } else {
      setFilteredUsers([]);
      setSearch(true);
    }
  };
  
  const handleOpenDialog = (teacher) => {
    setTeacherToDelete(teacher);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTeacherToDelete(null);
  };
  
  const handleDelete = async () => {
    if (teacherToDelete) {
      try {
        await api.delete(`/teachers/${teacherToDelete.id}`);
        setTeachers(teachers.filter(teacher => teacher.id !== teacherToDelete.id));
        handleCloseDialog();
        
        setMessageInfo({ type: "success", message: "Professor excluído com sucesso!" });
        setOpenMessage(true);

      } catch (err) {
        setErrorInfo({ type: "error", message: "Erro ao excluir professor" });
        setOpenError(true);
        setError('Erro ao excluir professor' + err);
      }
    }
  };
  
  const handleOpenEditModal = (tecaher) => {
    setTeacherToEdit(tecaher);
    setOpenEditModal(true);
  }
  
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTeacherToEdit(null);
  };

  const handleCloseStoreModal = () => {
    setOpenStoreModal(false);
  }

  const handleCloseMessage = () => setOpenMessage(false);
  const handleCloseError = () => setOpenError(false);
  
  const handleUpdateTeacher = (updatedTeacher) => {
    if (updatedTeacher.id) {
      setTeachers(prevTeachers =>
        prevTeachers.map(teacher => 
          teacher.id === updatedTeacher.id ? updatedTeacher : teacher
        )
      );
      
    } else {
      setRefreshKey(prev => prev + 1);
    }
  };
  

  return (
    <Box sx={{ display: "flex", flexDirection:'column', alignItems: 'center' }}>
      <Menu userRole="admin" roleAdmin={"admin"} />

      <Container component='section' maxWidth='md' sx={{ ml: {md: '240px', lg: '240px' } }}>
        <Typography component='h1' variant='h5' sx={{ mb: 2, mt: 5, color: '#FFFFFF' }}>
          Pesquisar Professor
        </Typography>
      </Container>

      <Container component="div" maxWidth="md"
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
          ml: { md: '240px' },
					gap: 4,
				}}
			>
				<SearchBar
					value={searchValue}
					onChange={handleSearchChange}
					sx={{
						flexGrow: 1,
						width: { xs: '100%', sm: '60%' },
						'& .MuiInputBase-root': {
							height: '40px',
							fontSize: '0.875rem',
						},
					}}
				/>

				<Button 
					variant="contained"
					sx={{
						bgcolor: '#60BFBF',
						'&:hover': { bgcolor: '#48A3A3' },
						width: { xs: '100%', sm: 'auto' },
						px: 2,
						height: '40px',
						fontSize: '0.875rem',
						textTransform: 'none',
						display: 'flex',
						alignItems: 'center',
						color: '#040D33',
					}}
					endIcon={<Add sx={{ color: '#040D33' }} />}
					onClick={() => setOpenStoreModal(true)}
				>
					Cadastrar Professor
				</Button>
			</Container>

      <Container component="main"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "calc(100% - 240px)", 
            lg: "calc(100% - 240px)" 
          },
          ml: { lg: "240px", md: "240px" }
        }}
      >
        <Paper elevation={3} sx={{ mt: 2, p: 3, bgcolor: '#1E2951' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2, color: "#F8F9FA" }}>
            Lista de Professores
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            isSearch ? (
              <TableContainer 
                sx={{
                  overflowX: "auto",
                  maxWidth: "100%",
                }}
              >
                <Table sx={{ minWidth: 750, maxWidth: '100%' }} aria-label="Tabela de Professores">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Nome</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>E-mail</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Telefone</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>CPF</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Formação</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Especialização</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((teacher) => (
                      <TableRow key={teacher.id} 
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.06)'
                          }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {teacher.User && teacher.User.name ? teacher.User.name : 'Nome Indisponível'}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{teacher.User && teacher.User.email ? teacher.User.email : 'Email Indisponível'}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{teacher.User && teacher.User.phone_number ? teacher.User.phone_number : 'Número de Telefone Indisponível'}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{teacher.User && teacher.User.cpf ? teacher.User.cpf : 'CPF Indisponível'}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{teacher.academic_formation ? teacher.academic_formation : 'Formação Indisponível'}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{teacher.tecnic_especialization ? teacher.tecnic_especialization : 'Especialização Indisponível'}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <IconButton onClick={() => handleOpenEditModal(teacher)} sx={{ color: '#60BFBF'}}>
                            <Edit />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleOpenDialog(teacher)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="Tabela de Professores">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '100px', padding: '8px' }}>Nome</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>E-mail</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Telefone</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>CPF</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Formação</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', minWidth: '150px', padding: '8px' }}>Especialização</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', minWidth: '120px', padding: '8px' }}>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell component="th" scope="row">
                          {teacher.User && teacher.User.name ? teacher.User.name : 'Nome Indisponível'}
                        </TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{teacher.User && teacher.User.email ? teacher.User.email : 'Email Indisponível'}</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{teacher.User && teacher.User.phone_number ? teacher.User.phone_number : 'Número de Telefone Indisponível'}</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{teacher.User && teacher.User.cpf ? teacher.User.cpf : 'CPF Indisponível'}</TableCell>
                        <TableCell align="right">{teacher.academic_formation ? teacher.academic_formation : 'Formaçao Indisponível'}</TableCell>
                        <TableCell align="right">{teacher.tecnic_especialization ? teacher.tecnic_especialization : 'Especialização Indisponível'}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpenEditModal(teacher)} sx={{ color: '#60BFBF' }}>
                            <Edit />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleOpenDialog(teacher)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          )}
        </Paper>
      </Container>
      
      {/* Confirmar exclusão do professor */}
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={'Excluir Professor'}
        message={'Realmente deseja excluir o professor? Essa ação não poderá ser desfeita.'}
        onConfirm={handleDelete}
        teacherName={teacherToDelete ? teacherToDelete.User.name : ''}
      />

      <SuccessMessageModal open={openMessage} onClose={handleCloseMessage} type={messageInfo.type} message={messageInfo.message} />
      <ErrorMessageModal open={openError} onClose={handleCloseError} type={errorInfo.type} message={errorInfo.message} />

      {/* Modal de edição */}
      {teacherToEdit && (
        <EditTeacherModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          teacherToEdit={teacherToEdit}
          onUpdate={handleUpdateTeacher}
        />
      )}

      <EditTeacherModal
 				open={openStoreModal}
 				onClose={handleCloseStoreModal}
 				teacherToEdit={null}
 				onUpdate={handleUpdateTeacher}
 			/>
    </Box>
  );
};

export default TeachersList;
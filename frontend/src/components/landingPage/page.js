import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography, Box, Grid, Card, CardContent, IconButton, TextField, Link, List, ListItem, ListItemIcon } from "@mui/material";
import LaptopIcon from "@mui/icons-material/Laptop";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Star, FlashOn, Rocket, Check } from '@mui/icons-material';
import img1 from '../../assets/images/comunidadeSection.jpg';
import img2 from '../../assets/images/heroSection.jpg';
import Footer from "../footer"; 


const scrollToAbout = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  const navigate = useNavigate();

  const scrollToCourses = () => {
    const cursosSection = document.getElementById('cursos');
    if (cursosSection) {
      cursosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCommunity = () => {
    const communitySection = document.getElementById('community');
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#040D33", height: "65px" }}>
        <Typography variant="h5"><strong>Learnify</strong></Typography>
        <Box>
          <Link onClick={scrollToCourses}>
            <Button>Cursos</Button>  
          </Link>
          <Link onClick={scrollToCommunity}>
            <Button>Comunidade</Button>  
          </Link>
          <Link onClick={scrollToAbout}>
            <Button>Sobre</Button>  
          </Link>
          <Link onClick={scrollToPlans}>
            <Button>Planos</Button>  
          </Link>
          <Link onClick={scrollToContact}>
            <Button>Contato</Button>  
          </Link>
        </Box>
        <Box>
          <Button onClick={() => navigate('/login')} 
            sx={{ border: '1px solid #1976d2', padding: '5px 15px', marginRight: "12px" }}
          >
            Login
          </Button>
          <Button onClick={() => navigate('/signUp-student')} variant="contained" 
            color="secondary"
            sx={{ backgroundColor: '#2176FF', color: '#000', '&:hover': { backgroundColor: '' }}}
          >
            Cadastre-se
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const HomeSection = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="1g" position="fixed"
      sx={{ 
        position: "relative",
        height: "90vh",
        width: "100vw",
        paddingTop: "10px",
        marginTop: "65px",
        textAlign: "left", 
        py: 20, 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        backgroundImage: `linear-gradient(270deg, rgba(4,13,51,0) 0%, rgba(4,13,51,0.9136029411764706) 85%), url(${img2})`,
        }}>
      <Typography variant="h6" color="#2176FF"><strong>EVOLUA SUA CARREIRA</strong></Typography>
      <Typography variant="h3" fontWeight={550} mt={2}>
        Domine a tecnologia e transforme seu <br />futuro com a Learnify
      </Typography>
      <Typography variant="body1" mt={2}>
        Na Learnify, você encontra cursos online de alta qualidade para impulsionar 
        <br />sua carreira na tecnologia. Aprenda com especialistas do mercado, 
        domine as <br />habilidades mais demandadas e conquiste novas oportunidades.<br />   
        Comece agora e transforme seu futuro!
      </Typography>
      <Box mt={3}>
        <Button onClick={() => navigate('/signUp-student')} variant="contained" color="primary" sx={{ color: "#000", mr: 2 }}>
          Decolar na tecnologia
        </Button>
        <Button onClick={scrollToAbout} variant="outlined" color="primary" sx={{ border: "2px solid" }}>Sobre a Learnify</Button>
      </Box>
    </Container>
  );
};

const courses = [
  { icon: <LaptopIcon fontSize="large" sx={{ color: "#fff"}} />, title: "Front-end", description: "Aprenda a criar interfaces modernas e responsivas com HTML, CSS e JavaScript. Domine frameworks como React e Vue.js para desenvolver experiências incríveis" },
  { icon: <CodeIcon fontSize="large" sx={{ color: "#fff"}}/>, title: "Back-end", description: "Construa sistemas robustos e escaláveis com Node.js, Python, Django e bancos de dados. Torne-se um especialista em desenvolvimento de servidores e APIs." },
  { icon: <StorageIcon fontSize="large" sx={{ color: "#fff"}}/>, title: "Data Science", description: "Descubra o poder dos dados! Aprenda análise, visualização e machine learning com Python, Pandas e SQL para transformar informações em decisões estratégicas." },
  { icon: <BarChartIcon fontSize="large" sx={{ color: "#fff"}}/>, title: "Marketing Digital", description: "Domine estratégias de SEO, tráfego pago e redes sociais para criar campanhas eficazes. Aprenda a atrair, engajar e converter clientes no mundo digital." }
];

const CoursesSection = () => {
  return (
    <Container id="cursos" maxWidth={false} 
      sx={{ 
        textAlign: "center", 
        backgroundColor: "#040D33", 
        height: "100vh", 
        padding: "145px", 
        margin: 0, 
        width:"100vw",
      }}>
      <Typography variant="h6" sx={{ color: "#2176FF" }}>CURSOS</Typography>
      <Typography variant="h4" fontWeight={600} mt={2} sx={{ color: "#fff"}}>Cursos que impulsionam o seu futuro</Typography>
      <Typography variant="body1" mt={2} sx={{ color: "#fff" }}>Explore nossos cursos e mergulhe no universo da tecnologia!</Typography>
      <Grid container spacing={2} mt={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                textAlign: "left",
                p: 2, 
                backgroundColor: "transparent", 
                border: "1px solid #2176FF",
                height: "300px",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
              }}
            >
              <IconButton color="primary" sx={{ alignSelf: "flex-start" }}>{course.icon}</IconButton>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ color: "white" }}>{course.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1} sx={{ color: "white" }}>{course.description}</Typography>
                <Button size="small" sx={{ mt: 2 }}><strong>Conhecer curso</strong></Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const CommunitySection = () => {
  return (
    <Container id="community" maxWidth={false} 
      sx={{ 
        py: 8, 
        textAlign: "center", 
        backgroundColor: "#040D33", 
        height: "100vh", 
        padding: "145px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
      }}>
      <Box sx={{ maxWidth: "30%" }}>
        <img
          src={img1}
          alt="Comunidade"
          style={{ maxWidth: "100%", height: "auto", border: "1px solid #2176FF" }}
        />
      </Box>
      <Box sx={{ textAlign: "left", maxWidth: "50%" }}>
        <Typography variant="h6" sx={{ color: "#2176FF" }}>COMUNIDADE</Typography>
        <Typography variant="h4" fontWeight={600} mt={2} sx={{ color: "#fff" }}>
          Aprenda, compartilhe e evolua com a comunidade Learnify
        </Typography>
        <Typography variant="body1" mt={2} color="text.secondary" sx={{ color: "#fff" }}>
          Na nossa comunidade, você não aprende sozinho! Participe de fóruns, eventos e grupos exclusivos,
          troque conhecimentos e amplie sua rede de contatos com profissionais da área. O futuro da sua carreira começa aqui!
        </Typography>
        <Box mt={3}>
          <Button variant="contained" sx={{ mr: 2, color: "#000", padding: "10px" }}>Entrar na comunidade</Button>
          <Button variant="outlined" color="primary" sx={{ mr: 2, padding: "10px" }}>Conhecer comunidade</Button>
        </Box>
      </Box>
    </Container>
  );
};

const AboutSection = () => {
  return (
    <Container id="about" maxWidth={false}
      sx={{ 
        height: "50vh",
        textAlign: "left", 
        py: 20, 
        alignItems: "center",
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `linear-gradient(270deg, rgba(4,13,51,0) 0%, rgba(4,13,51,0.9136029411764706) 85%), url(${img2})`
       }}>
      <Box sx={{ maxWidth: "600px", marginTop: "-107px" }}>
        <Typography variant="h6" sx={{ color: "#2176FF" }}>SOBRE</Typography>
        <Typography variant="h4" fontWeight={600} mt={2} sx={{ color: "#fff" }}>Seu futuro começa agora</Typography>
        <Typography variant="body1" mt={2} color="#fff">
          Na Learnify, acreditamos que a tecnologia pode transformar vidas.
          Por isso, oferecemos cursos práticos e didáticos, conectando você ao conhecimento que realmente faz a diferença no mercado.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" sx={{ color: "#000", padding: "10px" }}>Conhecer a Learnify</Button>
        </Box>
      </Box>
    </Container>
  );
};

const plans = [
  { title: "Plano Basic", price: "R$29/mês", 
    features: [
      "Acesso a cursos selecionados da plataforma",
      "Certificados de conclusão para os cursos concluídos",
      "Aulas em vídeo com conteúdo atualizado",
      "Acesso à comunidade Learnify para troca de experiências"
    ],
    icon: <Star fontSize="large" sx={{ color: '#fff' }}/>,
  },
  { title: "Plano Pro", price: "R$59/mês", 
    features: [
      "Acesso ilimitado a todos os cursos da plataforma",
      "Certificados de conclusão reconhecidos pelo mercado",
      "Aulas práticas e projetos aplicados",
      "Suporte técnico e tutoria especializada",
      "Acesso à comunidade exclusiva de alunos"
    ], 
    icon: <FlashOn fontSize="large" sx={{ color: '#fff' }}/>,
    gradient: 'linear-gradient(318deg, rgba(4,13,51,0.5) 26%, rgba(33,118,255,0.4) 98%)'
  },
  { title: "Plano Premium", price: "R$99/mês", 
    features: [
      "Todos os benefícios do Plano Pro",
      "Mentorias individuais com especialistas da área",
      "Workshops e eventos exclusivos ao vivo",
      "Conteúdos avançados e materiais extras",
      "Descontos em parceiros e ferramentas tecnológicas",
      "Prioridade no suporte e atendimento personalizado",
    ], 
    icon: <Rocket fontSize="large" sx={{ color: '#fff' }}/>,
  },
];

const PlansSection = () => {
  return (
    <Container
      id="plans"
      maxWidth={false}
      sx={{
        py: 5,
        backgroundColor: "#040D33",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        paddingTop: "75px"
      }}
    >
      <Typography variant="h6" color="#2176FF">PLANOS</Typography>
      <Typography variant="h5" fontWeight={600} sx={{ color: "#fff" }}>
        Escolha o plano ideal para sua jornada de aprendizado
      </Typography>
      <Typography variant="body1" color="#fff">
        Na Learnify, temos um plano para cada fase do seu crescimento.
      </Typography>

      <Grid container justifyContent="center" paddingTop="30px">
        {plans.map((plan, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 2,
                textAlign: "left",
                marginLeft: "60px",
                backgroundImage: plan.gradient || 'none',
                backgroundColor: plan.gradient ? 'transparent' : '#040D33',
                border: "1px solid #2176FF",
                maxWidth: "300px",
                marginTop: index === 0 ? "8px" : index === 1 ? "3px" : 0,
                justifyContent: 'space-between',
                flexDirection: "column"
              }}
            >
              <CardContent>
                {plan.icon}
                <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                  {plan.title}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#2176FF' }}>
                  {plan.price}
                </Typography>
                <List sx={{ listStyle: "none", padding: 0 }}>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i} sx={{ padding: '2px 0' }}>
                      <ListItemIcon sx={{ minWidth: '30px' }}>
                        <Check fontSize="small" sx={{ color: '#2176FF' }} />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ color: '#fff' }}>{feature}</Typography>
                    </ListItem>
                  ))}
                </List>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 1, color: "#000", marginTop: "18px" }}>
                  Assinar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const testimonials = [
  {
    name: "Alice Ocean",
    score: "5/5",
    feedback:
      "A Learnify superou minhas expectativas! Os cursos são didáticos, os professores são incríveis e a comunidade é muito engajada. Aprendi muito e já apliquei no meu trabalho!",
  },
  {
    name: "Lucas Sterling",
    score: "5/5",
    feedback:
      "Plataforma intuitiva, conteúdo atualizado e excelentes instrutores! Com os cursos de front-end, consegui minha primeira vaga como desenvolvedora. Recomendo demais!",
  },
  {
    name: "Mariana Vega",
    score: "5/5",
    feedback:
      "A flexibilidade dos planos me ajudou a estudar no meu ritmo. Com o plano Premium, tive acesso a mentorias incríveis que realmente fizeram a diferença na minha carreira.",
  },
  {
    name: "Eduardo Blake",
    score: "5/5",
    feedback:
      "Sempre quis aprender Data Science, e a Learnify tornou isso possível! Os projetos práticos me ajudaram a construir um portfólio forte. Vale muito a pena!",
  },
];

const TestimonialsSection = () => {
  return (
    <Container maxWidth={false} 
      sx={{ 
        backgroundColor: "#040D33", 
        height: "100vh", 
        padding: "145px",
        textAlign: "center"
      }}>
      <Typography variant="h6" color="#2176FF" textAlign={"center"}>COMENTÁRIOS</Typography>
      <Typography variant="h4" fontWeight={600} color="#fff" marginTop={"20px"}>
        O que nossos alunos acham da Learnify
      </Typography>
      <Typography variant="body1" color="#fff" marginTop={"18px"}>
        Na Learnify, cada avanço conta.
      </Typography>
      <Grid container spacing={3} marginTop={"20px"}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                p: 2, 
                boxShadow: 0,
                border: "1px solid #2176FF",
                backgroundColor: "transparent",
                height: "90%"
              }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="#fff" marginTop={"20px"}>
                  {testimonial.name}
                </Typography>
                <Typography variant="subtitle1" color="#2176FF" marginTop={"10px"}>
                  {testimonial.score}
                </Typography>
                <Typography variant="body2" mt={1} color="#fff" marginTop={"15px"}>
                  {testimonial.feedback}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const ContactSection = () => {
  return (
    <Container id="contact" maxWidth={false} 
      sx={{ 
        backgroundColor: "#040D33", 
        height: "100vh", 
        display: "flex",
        alignItems: "center", 
        textAlign: "center", 
        paddingTop: "135px",
        flexDirection: "column",
        justifyContent: "center"
      }}>
      <Typography variant="h6" color="#2176FF">CONTATO</Typography>
      <Typography variant="h4" fontWeight={600} color="#fff" marginTop={"15px"}>
        Entre em contato com a Learnify
      </Typography>
      <Typography variant="body1" color="#fff" marginTop={"10px"}>
        Vamos adorar falar com você.
      </Typography>
      <Box
        component={"form"}
        sx={{
          border: "1px solid #2176FF",
          padding: "24px",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "transparent",
          marginTop: "20px"
        }}  
      > 
        {/* campos */}
        <TextField fullWidth label="Nome" margin="normal" required 
          sx={{
            '& .MuiInputLabel-root': { color: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#2176FF' },
              '&:hover fieldset': { borderColor: '#2176FF' },
              '&.Mui-focused fieldset': { borderColor: '#2176FF' },
            },
            '& .MuiInputBase-input': { color: '#fff' }
          }}
        />
        <TextField fullWidth label="Email" type="email" margin="normal" required 
          sx={{
            '& .MuiInputLabel-root': { color: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#2176FF' },
              '&:hover fieldset': { borderColor: '#2176FF' }, 
              '&.Mui-focused fieldset': { borderColor: '#2176FF' },
            },
            '& .MuiInputBase-input': { color: '#fff' }
          }}
        />
        <TextField fullWidth label="Mensagem" multiline rows={4} margin="normal" required
          sx={{
            '& .MuiInputLabel-root': { color: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#2176FF' },
              '&:hover fieldset': { borderColor: '#2176FF' },
              '&.Mui-focused fieldset': { borderColor: '#2176FF' },
            },
            '& .MuiInputBase-input': { color: '#fff' }
          }}
        />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth sx={{ color: "#000" }}>
              <strong>Enviar Mensagem</strong>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" type="reset" fullWidth>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const LearnifyPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#040D33',
      }}
    >
      <Header /> 
      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <HomeSection />
        <CoursesSection />
        <CommunitySection />
        <AboutSection />
        <PlansSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LearnifyPage;

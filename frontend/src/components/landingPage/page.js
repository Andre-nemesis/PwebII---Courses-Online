import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography, Box, Grid, Card, CardContent, IconButton, TextField, Link } from "@mui/material";
import LaptopIcon from "@mui/icons-material/Laptop";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import img1 from '../../assets/images/comunidadeSection.jpg';
import img2 from '../../assets/images/heroSection.jpg';


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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="static" color="primary">
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
  return (
    <Container maxWidth={false} position="fixed"
      sx={{ 
        position: "relative",
        height: "90vh",
        width: "100vw",
        paddingTop: "10px",
        margin: 0,
        textAlign: "left", 
        py: 20, 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        paddingTop: "65px",
        backgroundImage: `linear-gradient(270deg, rgba(4,13,51,0) 0%, rgba(4,13,51,0.9136029411764706) 85%), url(${img2})`
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
        <Button variant="contained" color="primary" sx={{ color: "#000", mr: 2 }}>Decolar na tecnologia</Button>
        <Button variant="outlined" color="primary" sx={{ border: "2px solid" }}>Sobre a Learnify</Button>
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
        height: "100vh", padding: "180px", 
        margin: 0, 
        width:"100vw",
      }}>
      <Typography variant="h5" sx={{ color: "#2176FF" }}>CURSOS</Typography>
      <Typography variant="h4" fontWeight={600} mt={2} sx={{ color: "#fff"}}>Cursos que impulsionam o seu futuro</Typography>
      <Typography variant="body1" mt={2} sx={{ color: "#fff" }}>Explore nossos cursos e mergulhe no universo da tecnologia!</Typography>
      <Grid container spacing={4} mt={3}>
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
              <IconButton color="primary">{course.icon}</IconButton>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{course.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>{course.description}</Typography>
                <Button size="small" sx={{ mt: 2 }}>Conhecer curso</Button>
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
    <Container id="community" maxWidth={false} sx={{ py: 8, textAlign: "center", backgroundColor: "#040D33", height: "100vh" }}>
      <Typography variant="h6" color="secondary">Comunidade</Typography>
      <Typography variant="h4" fontWeight={600} mt={2}>
        Aprenda, compartilhe e evolua com a comunidade Learnify
      </Typography>
      <Typography variant="body1" mt={2} color="text.secondary">
        Na nossa comunidade, você não aprende sozinho! Participe de fóruns, eventos e grupos exclusivos,
        troque conhecimentos e amplie sua rede de contatos com profissionais da área. O futuro da sua carreira começa aqui!
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>Entrar na comunidade</Button>
        <Button variant="outlined" color="primary">Conhecer comunidade</Button>
      </Box>
    </Container>
  );
};

const AboutSection = () => {
  return (
    <Container id="about" maxWidth={false}
      sx={{ 
        position: "relative",
        height: "50vh",
        textAlign: "left", 
        py: 20, 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        backgroundImage: `linear-gradient(270deg, rgba(4,13,51,0) 0%, rgba(4,13,51,0.9136029411764706) 85%), url(${img2})`
       }}>
      <Typography variant="h6" color="secondary">Sobre</Typography>
      <Typography variant="h4" fontWeight={600} mt={2}>Seu futuro começa agora</Typography>
      <Typography variant="body1" mt={2} color="text.secondary">
        Na Learnify, acreditamos que a tecnologia pode transformar vidas.
        Por isso, oferecemos cursos práticos e didáticos, conectando você ao conhecimento que realmente faz a diferença no mercado.
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary">Conhecer a Learnify</Button>
      </Box>
    </Container>
  );
};

const plans = [
  { title: "Básico", price: "R$29/mês", features: ["10GB Armazenamento", "Suporte por e-mail"] },
  { title: "Padrão", price: "R$59/mês", features: ["50GB Armazenamento", "Suporte 24/7", "Acesso multiusuário"] },
  { title: "Premium", price: "R$99/mês", features: ["100GB Armazenamento", "Suporte VIP", "Recursos exclusivos"] },
];

const PlansSection = () => {
  return (
    <Container id="plans" maxWidth={false} sx={{ py: 5, backgroundColor: "#040D33", height: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Escolha seu plano
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {plan.price}
                </Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <Typography variant="body2">{feature}</Typography>
                    </li>
                  ))}
                </ul>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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
    <Container maxWidth={false} sx={{ backgroundColor: "#040D33", height: "100vh" }}>
      <Typography variant="h6" color="primary">Comentários</Typography>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        O que nossos alunos acham da Learnify
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Na Learnify, cada avanço conta.
      </Typography>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {testimonial.name}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  {testimonial.score}
                </Typography>
                <Typography variant="body2" mt={1}>{testimonial.feedback}</Typography>
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
    <Container id="contact" maxWidth={false} sx={{ backgroundColor: "#040D33", height: "100vh" }}>
      <Typography variant="h6" color="primary">Contato</Typography>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Entre em contato com a Learnify
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Vamos adorar falar com você.
      </Typography>
      <form>
        <TextField fullWidth label="Nome" margin="normal" required />
        <TextField fullWidth label="Email" type="email" margin="normal" required />
        <TextField
          fullWidth
          label="Mensagem"
          multiline
          rows={4}
          margin="normal"
          required
        />
        <Grid container spacing={2} mt={2}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Enviar Mensagem
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" type="reset">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#282c34',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" component="p">
        Desenvolvido por &copy; InfinityCode
      </Typography>
      <Typography variant="body2" component="p">
        Alguns direitos reservados
      </Typography>
    </Box>
  );
};

const LearnifyPage = () => {
  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <CoursesSection />
        <CommunitySection />
        <AboutSection />
        <PlansSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default LearnifyPage;

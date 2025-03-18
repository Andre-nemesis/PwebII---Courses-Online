import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography, Box, Grid, Card, CardContent, IconButton, TextField } from "@mui/material";
import LaptopIcon from "@mui/icons-material/Laptop";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";
import img1 from '../../assets/images/comunidadeSection.jpg';
import img2 from '../../assets/images/heroSection.jpg';


const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Learnify</Typography>
        <Box>
          <Button color="inherit">Cursos</Button>
          <Button color="inherit">Comunidade</Button>
          <Button color="inherit">Sobre</Button>
          <Button color="inherit">Planos</Button>
          <Button color="inherit">Contato</Button>
        </Box>
        <Box>
          <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
          <Button onClick={() => navigate('/signUp-student')} variant="contained" color="secondary">Cadastre-se</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const HomeSection = () => {
  return (
    <Container sx={{ textAlign: "center", py: 8, backgroundImage: { img2 } }}>
      <Typography variant="h6" color="secondary">Evolua sua carreira</Typography>
      <Typography variant="h3" fontWeight={600} mt={2}>
        Domine a tecnologia e transforme seu futuro com a Learnify
      </Typography>
      <Typography variant="body1" mt={2} color="text.secondary">
        Na Learnify, você encontra cursos online de alta qualidade para impulsionar sua carreira.
        Aprenda com especialistas do mercado e domine as habilidades mais demandadas!
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>Decolar na tecnologia</Button>
        <Button variant="outlined" color="primary">Sobre a Learnify</Button>
      </Box>
    </Container>
  );
};

const courses = [
  { icon: <LaptopIcon fontSize="large" />, title: "Front-end", description: "Aprenda a criar interfaces modernas com React e Vue.js." },
  { icon: <CodeIcon fontSize="large" />, title: "Back-end", description: "Desenvolva sistemas robustos com Node.js, Django e APIs." },
  { icon: <StorageIcon fontSize="large" />, title: "Data Science", description: "Analise e visualize dados com Python, Pandas e SQL." },
  { icon: <BarChartIcon fontSize="large" />, title: "Marketing Digital", description: "Domine SEO, tráfego pago e redes sociais." }
];

const CoursesSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h6" color="secondary">Cursos</Typography>
      <Typography variant="h4" fontWeight={600} mt={2}>Cursos que impulsionam o seu futuro</Typography>
      <Typography variant="body1" mt={2} color="text.secondary">Explore nossos cursos e mergulhe no universo da tecnologia!</Typography>
      <Grid container spacing={4} mt={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 2 }}>
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
    <Container sx={{ py: 8, textAlign: "center" }}>
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
    <Container sx={{ py: 8, textAlign: "center" }}>
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

const PlanosSection = () => {
  return (
    <Container sx={{ py: 5 }}>
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
    <Container sx={{ my: 5 }}>
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
    <Container sx={{ my: 5 }}>
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
        <PlanosSection />
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MenuOutlined,
  BankOutlined,
  CheckOutlined,
  FormOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  AndroidFilled,
  AppleFilled,
  WindowsFilled,
  MobileOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import {
  Carousel,
  Divider,
  Button,
  Card,
  Flex,
  Typography,
  Layout,
  theme,
  Space,
  Avatar,
  Affix,
  Col,
  Row,
  
} from "antd";
import Service from "./Images/Service.jpg";
import Service1 from "./Images/Service1.jpg";
import Infraback from "./Images/Infra-back.jpg";

const { Meta } = Card;


const contentStyle = {
  height: "400px",
  width: "100%",
  margin: "auto", // Center the box horizontally
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#3E4242",
  color: "white",
  borderRadius: "10px", // Add rounded corners for a modern look
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)", // Enhanced box shadow
  padding: "20px", // Add padding for content spacing
  position: "relative",
  alignContent:'center'
};

const imgStyle = {
  display: "block",
  width: "50%",
};
const imgStyle1 = {
  display: "block",
  width: "50%",
};
const { Header, Content, Footer } = Layout;

const AppComponents = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isHovered, setHovered] = useState(false);
  const [isHovered1, setHovered1] = useState(false);
  const [isHovered2, setHovered2] = useState(false);
  const [isHovered3, setHovered3] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer");
      const windowHeight = window.innerHeight;
      const contentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollY = window.scrollY;

      if (scrollY >= contentHeight - 50) {
        footer.classList.add("visible");
      } else {
        footer.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToCarousel = () => {
    const carouselElement = document.querySelector(".your-carousel-class");
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout className="layout">
      <style>{`
      
 body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica, Arial, sans-serif';
  
  
 }


  .site-layout-content {
    flex: 1;
    padding: 10px 16px;
    
   position : relative ;
   

    
  }

  .footer {
    padding: 16px;
    background-color:#001529;
    text-align: center;
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 1;
    
  }

  .footer.visible {
    opacity: 1;
  }


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
 
 position : sticky;
 top : 0;

}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

@keyframes typing {
  0% {
    width: 0;
    transform: scaleX(0);
    transform-origin: 0% 50%;
  }
  25% {
    width: 25%;
    transform: scaleX(0.25);
    transform-origin: 0% 50%;
  }
  50% {
    width: 50%;
    transform: scaleX(0.5);
    transform-origin: 0% 50%;
  }
  75% {
    width: 75%;
    transform: scaleX(0.75);
    transform-origin: 0% 50%;
  }
  100% {
    width: 100%;
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
}

.header-logo {
  margin-top: -15px;
  text-align: left;
  padding: 16px;
  color: white;
  font-size: 28px;
  font-weight: bold;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(40, end) ;
  
   
}
  .header-menu {
    display: ${isMobileMenuOpen ? "none" : "flex"};
    text-align: center;
    flex-wrap: wrap;
    justify-content: right;
    margin-top: -10px;
    flex: 1;
    
  }

  .header-menu a {
    color: white;
    padding: 0 15px;
    font-size: 16px;
    text-decoration: none;
  }

  .mobile-menu-icon {
    display: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .mobile-menu {
    display: none;
    width: 100%; /* Set width to cover the entire page */
    left: 0 ;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 64px;
    background: rgba(0, 21, 41, 0.85); 
    z-index: 1;
    border-radius: 30px;
    overflow: hidden;

    font-size: 17px;
  }
  
  @media only screen and (max-width: 1096px) {
    .header-menu {
      display: ${isMobileMenuOpen ? "flex-column" : "none"};
      
    }

    .header-logo {
      flex-basis: 100%;
      text-align: left;
      margin-bottom: 16px;
      
    }

    .mobile-menu-icon {
      display: block;
      margin-top : -16px;
      
    }

    .mobile-menu {
      display: ${isMobileMenuOpen ? "flex" : "none"};
    }
    /* Small screens (phones, 576px and below) */
    @media only screen and (max-width: 576px) {
      .site-layout-content {
        padding: 10px;
       
      }
      .footer * {
        margin-top: 16px;
        font-size: 10px; /* Apply the same font size to all children elements */
      }
     
      .typography {
        top: -20px;
            
     font-size : 13px;
     width : 130px;
      }
      .link {
        font-size : 13px;
      }
      .footer p {
        font-size : 13px;
      }
  
    /* Medium screens (tablets, 768px and below) */
    @media only screen and (max-width: 768px) {
      .site-layout-content {
        padding: 15px;
        // Add styles for medium screens...
      }
  
      /* Add more responsive styles as needed... */
    }
  
    /* Large screens (desktops, 992px and below) */
    @media only screen and (max-width: 992px) {
      .site-layout-content {
        padding: 20px;
        // Add styles for large screens...
      }
    
  }
`}</style>
<Affix offsetTop={0}>
      <Header  className="header">
        {/* Logo/Text */}
        <div className="logo-container">
          <div className="header-logo">FixMyStreet</div>
        </div>

        {/* Hamburger Icon for Mobile Menu */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <MenuOutlined />
        </div>

        {/* Menu Items in the center */}
        <div className="header-menu">
          <Link to="/home">Acceuil</Link>
          <Link to="/about">A propos</Link>
          <Link to="/reclamation">Reclamation</Link>

          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <Link
            style={{ color: "white" }}
            to="/home"
            onClick={toggleMobileMenu}
          >
            Acceuil
          </Link>
          <Link
            style={{ color: "white" }}
            to="/about"
            onClick={toggleMobileMenu}
          >
            A propos
          </Link>
          <Link
            style={{ color: "white" }}
            to="/reclamation"
            onClick={toggleMobileMenu}
          >
            Reclamation
          </Link>
          <Link
            style={{ color: "white" }}
            to="/contact"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
        </div>
      </Header>
      </Affix>
      <Content className="site-layout-content">
        {/* Your content goes here */}

        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row gutter={[16, 16]}>
              <Col  xl={{
        span: 16,
        offset: -1,
       
      }}xxl={{
        span: 14,
        offset: -1,
      }}
      >
                <Card
                  style={{ position: "relative" }}
                  hoverable
                  cover={<img alt="example" src={Infraback} />}
                >
                  <Meta
                    title="Comment notre application fonctionne"
                   
                  />
                  <Button
                    onClick={handleScrollToCarousel}
                    style={{
                      marginLeft: 550,
                      position: "absolute",
                      bottom: 9, // Ajustez la distance par rapport au bas de la carte selon vos besoins
                      right: 16,
                    }}
                  >
                    Voir les details
                  </Button>
                </Card>
              </Col>

              <Col xl={{
        span: 8,
        offset: -1,
      }}  xxl={{
        span: 10,
        offset: 0,
      }}>
                <Typography.Title level={1}>“FixMyStreet“</Typography.Title>
                <Typography.Title level={4}>

                Bienvenue sur notre plateforme de gestion des réclamations d'infrastructure, votre guichet unique pour résoudre rapidement et efficacement tous les problèmes liés à nos services. Nous comprenons l'importance d'une infrastructure fiable et fonctionnelle, et nous nous engageons à vous offrir une expérience exceptionnelle. Notre équipe dédiée est prête à vous assister à chaque étape du processus, assurant ainsi une résolution rapide et satisfaisante de vos préoccupations. 
</Typography.Title>
              </Col>
            </Row>
            <Row  gutter={[16, 16]}>
              <Col  xl={{
        span: 12,
        offset: 0,
      }}>
                <Card
                  hoverable
                  bodyStyle={{
                    padding: 0,
                    overflow: "hidden",
                  }}
                >
                  <Flex justify="space-between">
                    <img alt="avatar" src={Service} style={imgStyle} />
                    <Flex
                      vertical
                      align="flex-end"
                      justify="space-between"
                      style={{
                        padding: 32,
                      }}
                    >
                      <Typography.Title level={3}>
                       


"Nous sommes là pour vous ! Faites-nous part de vos préoccupations en matière d'infrastructure."
                      </Typography.Title>
                      <ul>
  <li>
  Visitez notre page d'assistance en infrastructure sur le site web pour des conseils détaillés.

  </li>
  <li>
    Remplissez le formulaire de réclamation en fournissant autant de détails que possible.
  </li>
  <li>
    Notre équipe d'assistance dédiée examinera votre réclamation et vous contactera dans les plus brefs délais.
  </li>
</ul>

                    </Flex>
                  </Flex>
                </Card>
              </Col>

              <Col  xl={{
        span: 12,
        offset: 0,
      }}>
                <Card
                  hoverable
                  bodyStyle={{
                    padding: 0,
                    overflow: "hidden",
                  }}
                >
                  <Flex justify="space-between">
                    <img alt="avatar" src={Service1} style={imgStyle1} />
                    <Flex
                      vertical
                      align="flex-end"
                      justify="space-between"
                      style={{
                        padding: 32,
                      }}
                    >
                      <Typography.Title level={3}>
                      "Optimisez votre expérience avec nos services : Compatibilité et Conseils d'Utilisation."
                      </Typography.Title>
                      <ul>
  <li>
    Consultez nos guides d'utilisation disponibles sur le site web pour tirer le meilleur parti de nos fonctionnalités.
  </li>
  <li>
  Contactez notre équipe d'assistance pour des réponses personnalisées à vos questions spécifiques.
  </li>
  <li>
  Recevez une assistance rapide en cas de besoin, notre équipe est là pour vous aider.

  </li>
</ul>


                    </Flex>
                  </Flex>
                </Card>
              </Col>
            </Row>
          </Space>
          <Divider
            style={{
              borderColor: "darkgrey",
              borderWidth: "2px",
              margin: "16px 0",
            }}
          >
            <Typography.Title level={3}>SERVICES</Typography.Title>
          </Divider>
         
          <Carousel
          
            className="your-carousel-class"
            style={{ color: "black" }}
            autoplay
          >
            <div>
              <Card
                style={contentStyle}
                title={<span style={{ color: "white" }}>Réclamation</span>}
                bordered={false}
              >
                Notre Service des Réclamations est conçu pour simplifier le
                processus de résolution des problèmes. Avec un formulaire de
                réclamation en ligne facile à utiliser, suivi en temps réel et
                une équipe réactive, nous nous engageons à résoudre rapidement
                vos préoccupations, garantissant ainsi une satisfaction client
                maximale.
                <Button
                  style={{
                    marginLeft: 550,
                    position: "absolute",
                    bottom: 9, // Ajustez la distance par rapport au bas de la carte selon vos besoins
                    right: 40,
                  }}
                  href="https://ant.design"
                  target="_blank"
                >
                  Soumettre
                </Button>
              </Card>
            </div>
            <div>
              <Card
                style={contentStyle}
                title={
                  <span style={{ color: "white" }}>Suivi des réclamations</span>
                }
                bordered={false}
              >
                Le suivi des réclamations est notre priorité, assurant une prise
                en charge immédiate et une analyse approfondie de chaque
                problème. Une communication transparente et une résolution
                rapide sont nos objectifs, assurant ainsi une expérience client
                fluide et sans tracas.
                <Button
                  style={{
                    marginLeft: 550,
                    position: "absolute",
                    bottom: 9, // Ajustez la distance par rapport au bas de la carte selon vos besoins
                    right: 40,
                  }}
                  href="https://ant.design"
                  target="_blank"
                >
                  Soumettre
                </Button>
              </Card>
            </div>
            <div>
              <Card
                style={contentStyle}
                title={<span style={{ color: "white" }}>Suivi de client</span>}
                bordered={false}
              >
                Allant au-delà des réclamations, notre suivi de clientèle repose
                sur la collecte d'informations perspicace, une personnalisation
                des services, des retours valorisés et une communication
                proactive. Notre engagement est de vous offrir une expérience
                client exceptionnelle, adaptée à vos besoins spécifiques.
                <Button
                  style={{
                    marginLeft: 550,
                    position: "absolute",
                    bottom: 9, // Ajustez la distance par rapport au bas de la carte selon vos besoins
                    right: 40,
                  }}
                  href="https://ant.design"
                  target="_blank"
                >
                  Soumettre
                </Button>
              </Card>
            </div>
          </Carousel>
          <Divider
            style={{
              borderColor: "darkgrey",
              borderWidth: "2px",
              margin: "16px 0",
            }}
          >
            <Typography.Title level={3}>COMMENT ÇA MARCHE ?</Typography.Title>
          </Divider>
          <Row gutter={[16, 16]} justify="center">
            <Col span={8} style={{ textAlign: "center" }}>
              <Avatar
                size={80}
                icon={<BankOutlined />}
                style={{ backgroundColor: "#1890ff", marginBottom: 8 }}
              />
              <div>1.Choisissez l'administration concernée</div>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Avatar
                size={80}
                icon={<FormOutlined />}
                style={{ backgroundColor: "#1890ff", marginBottom: 8 }}
              />
              <div>2.Saisissez votre demande</div>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Avatar
                size={80}
                icon={<CheckOutlined />}
                style={{ backgroundColor: "#1890ff", marginBottom: 8 }}
              />
              <div>3.Soumettez la demande</div>
            </Col>
          </Row>
          <Divider
            style={{
              borderColor: "darkgrey",
              borderWidth: "2px",
              margin: "16px 0",
            }}
          >
            <Typography.Title level={3}>QUELQUES CHIFFRES</Typography.Title>
          </Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ border: "dashed" }}>
                <BankOutlined
                  style={{
                    color: "DarkBlue",
                    fontSize: 70,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />{" "}
                <br />
                <Typography.Title
                  level={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  1 740 <br />
                  Administrations concernée
                </Typography.Title>
              </Card>
            </Col>

            <Col span={8}>
              <Card style={{ border: "dashed" }}>
                <FileTextOutlined
                  style={{
                    color: "DarkGreen",
                    fontSize: 70,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />{" "}
                <br />
                <Typography.Title
                  level={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  + 1 378 000
                  <br />
                  Réclamations déposées
                </Typography.Title>
              </Card>
            </Col>

            <Col span={8}>
              <Card style={{ border: "dashed" }}>
                <FileDoneOutlined
                  style={{
                    color: "DarkRed",
                    fontSize: 70,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />{" "}
                <br />
                <Typography.Title
                  level={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  + 1 145 000
                  <br />
                  Réclamations traitées 
                </Typography.Title>
              </Card>
            </Col>
          </Row>
          <Divider
            style={{
              borderColor: "darkgrey",
              borderWidth: "2px",
              margin: "16px 0",
            }}
          >
            <Typography.Title level={3}>COMPATIBLITE</Typography.Title>
          </Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={false}>
                <WindowsFilled
                  style={{
                    fontSize: 70,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />{" "}
                <br />
                <Typography.Title
                  level={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Windows
                </Typography.Title>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={false}>
                <AppleFilled
                  style={{
                    fontSize: 70,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />{" "}
                <br />
                <Typography.Title
                  level={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Mac && ios
                </Typography.Title>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={false}>
                <AndroidFilled
                  style={{
                    fontSize: 70,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />{" "}
                <br />
                <Typography.Title
                  level={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Android
                </Typography.Title>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Affix offsetBottom={-115}>
        <Footer className="footer">
          <Row gutter={16.16}>
            <Col span={8}>
              <Divider
                orientation="left"
                orientationMargin="0"
                style={{
                  borderColor: "white",
                  borderWidth: "2px",
                  margin: "16px 0",
                  marginTop: "-40px",
                }}
              >
                <Typography.Title
                className="typography"
                  style={{
                    border: "solid",
                    borderWidth: "2.5px",
                    
                    position: "relative",
                    color: "white",
                  }}
                  level={4}
                >
                  A propos
                </Typography.Title>
              </Divider>

              <Link
              className="link"
                style={{
                  margin: "0",
                  left: 9,
                  position: "absolute",
                  color: "white",
                  textDecorationLine: isHovered ? "underline" : "none",
                 
                  bottom: 20,
                }}
                to="/aproposdenous"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                A propos de nous
              </Link>
              <br />
              <Link className="link"
                style={{
                  margin: "0",
                  left: 9,
                  position: "absolute",
                  color: "white",
                  textDecorationLine: isHovered1 ? "underline" : "none",
                 
                  bottom: 2,
                }}
                to="/faq"
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
              >
                FAQ
              </Link>
            </Col>
            <Col span={8}>
              <Divider
                orientation="left"
                orientationMargin="0"
                style={{
                  borderColor: "white",
                  borderWidth: "2px",
                  margin: "16px 0",
                  marginTop: "-40px",
                }}
              >
                <Typography.Title
                  className="typography"
                  style={{
                    border: "solid",
                    borderWidth: "2.5px",
                    position: "relative",
                    color: "white",
                  }}
                  level={4}
                >
                  Termes et conditions
                </Typography.Title>
              </Divider>
              <Link className="link"
                style={{
                  margin: "0",
                  position: "absolute",
                  left: 9,
                  color: "white",
                  textDecorationLine: isHovered2 ? "underline" : "none",
                 
                  bottom: 20,
                }}
                to="/aproposdenous"
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
              >
                Condition d'utilisation
              </Link>
              <br />
              <Link className="link"
                style={{
                  margin: "0",
                  left: 9,
                  position: "absolute",
                  textDecorationLine: isHovered3 ? "underline" : "none",
                  
                  bottom: 2,
                  color: "white",
                }}
                to="/faq"
                onMouseEnter={() => setHovered3(true)}
                onMouseLeave={() => setHovered3(false)}
              >
                Mentions légales
              </Link>
            </Col>
            <Col span={8}>
              <Divider
                orientation="left"
                orientationMargin="0"
                style={{
                  borderColor: "white",
                  borderWidth: "2px",
                  margin: "16px 0",
                  marginTop: "-40px",
                }}
              >
                <Typography.Title
                  className="typography"
                  style={{
                    border: "solid",
                    borderWidth: "2.5px",
                    position: "relative",
                    color: "white",
                  }}
                  level={4}
                >
                  Aide
                </Typography.Title>
              </Divider>
              <div>
                <p
                  style={{
                    margin: "0",
                    position: "absolute",

                    color: "white",
                    left: 9,
                  
                    bottom: 20,
                  }}
                >
                  <MobileOutlined /> 3636{" "}
                </p>
                <p
                  style={{
                    margin: "0",
                    position: "absolute",

                    color: "white",
                    left: 9,
                    
                    bottom: 2,
                  }}
                >
                  <PhoneFilled /> 08 0231 3636{" "}
                </p>
              </div>
            </Col>
          </Row>
          <span style={{ color: "white", fontWeight: "bold" }}>
            {" "}
            © Tous droits réservés
          </span>
        </Footer>
      </Affix>
    </Layout>
  );
};

export default AppComponents;

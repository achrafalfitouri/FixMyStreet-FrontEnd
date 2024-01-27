import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MenuOutlined,
  MobileOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import {
  Divider,
  Typography,
  Layout,
  Affix,
  Col,
  Row,
} from "antd";

import AppRoutes from "../AppRoutes";



const { Header, Content, Footer } = Layout;

const AppComponents = () => {
  
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

  

  return (
    <Layout className="layout">
      <style>{`
    
 body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica, Arial, sans-serif';
  min-height: 100vh;
  display:flex;
  flex-direction:column;
  
 }


  .site-layout-content {
    flex: 1;
    padding: 10px 16px;
    
   position : relative ;
   

    
  }

  .footer {
    padding: 20px;
    background-color:#001529;
    text-align: center;
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 1;
    margin-top: auto;
    
    
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
        <Header className="header">
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
       <AppRoutes/>
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
              <Link
                className="link"
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
                   
                    position: "relative",
                    color: "white",
                  }}
                  level={4}
                >
                  Termes et conditions
                </Typography.Title>
              </Divider>
              <Link
                className="link"
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
              <Link
                className="link"
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

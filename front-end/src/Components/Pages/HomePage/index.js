
import {

  BankOutlined,
  CheckOutlined,
  FormOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  AndroidFilled,
  AppleFilled,
  WindowsFilled,
  
  
} from "@ant-design/icons";
import {
  Carousel,
  Divider,
  Button,
  Card,
  Flex,
  Typography,
 
  theme,
  Space,
  Avatar,

  Col,
  Row,
} from "antd";
import Service from "../../AppComponents/Images/Service.jpg";
import Service1 from "../../AppComponents/Images/Service1.jpg";
import Infraback from "../../AppComponents/Images/Infra-back.jpg";

const { Meta } = Card;

const contentStyle = {
  height: "400px",
  width: "100%",
  margin: "auto", 
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#3E4242",
  color: "white",
  borderRadius: "10px", 
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)", 
  padding: "20px", 
  position: "relative",
  alignContent: "center",
};


const imgStyle = {
    display: "block",
    width: "50%",
  };
  const imgStyle1 = {
    display: "block",
    width: "50%",
  };
  const handleScrollToCarousel = () => {
    const carouselElement = document.querySelector(".your-carousel-class");
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: "smooth" });
    }
  };
const HomePage = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <div
    className="site-layout-content"
    style={{
      background: colorBgContainer,
    }}
  >
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Row gutter={[16, 16]}>
        <Col
          xl={{
            span: 16,
            offset: -1,
          }}
          xxl={{
            span: 14,
            offset: -1,
          }}
        >
          <Card
            style={{ position: "relative" }}
            hoverable
            cover={<img alt="example" src={Infraback} />}
          >
            <Meta title="Comment notre application fonctionne" />
            <Button
              onClick={handleScrollToCarousel}
              style={{
                marginLeft: 550,
                position: "absolute",
                bottom: 9, 
                right: 16,
              }}
            >
              Voir les details
            </Button>
          </Card>
        </Col>

        <Col
          xl={{
            span: 8,
            offset: -1,
          }}
          xxl={{
            span: 10,
            offset: 0,
          }}
        >
          <Typography.Title level={1}>“FixMyStreet“</Typography.Title>
          <Typography.Title level={4}>
            Bienvenue sur notre plateforme de gestion des réclamations
            d'infrastructure, votre guichet unique pour résoudre
            rapidement et efficacement tous les problèmes liés à nos
            services. Nous comprenons l'importance d'une infrastructure
            fiable et fonctionnelle, et nous nous engageons à vous offrir
            une expérience exceptionnelle. Notre équipe dédiée est prête à
            vous assister à chaque étape du processus, assurant ainsi une
            résolution rapide et satisfaisante de vos préoccupations.
          </Typography.Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col
          xl={{
            span: 12,
            offset: 0,
          }}
        >
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
                  "Nous sommes là pour vous ! Faites-nous part de vos
                  préoccupations en matière d'infrastructure."
                </Typography.Title>
                <ul>
                  <li>
                    Visitez notre page d'assistance en infrastructure sur
                    le site web pour des conseils détaillés.
                  </li>
                  <li>
                    Remplissez le formulaire de réclamation en fournissant
                    autant de détails que possible.
                  </li>
                  <li>
                    Notre équipe d'assistance dédiée examinera votre
                    réclamation et vous contactera dans les plus brefs
                    délais.
                  </li>
                </ul>
              </Flex>
            </Flex>
          </Card>
        </Col>

        <Col
          xl={{
            span: 12,
            offset: 0,
          }}
        >
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
                  "Optimisez votre expérience avec nos services :
                  Compatibilité et Conseils d'Utilisation."
                </Typography.Title>
                <ul>
                  <li>
                    Consultez nos guides d'utilisation disponibles sur le
                    site web pour tirer le meilleur parti de nos
                    fonctionnalités.
                  </li>
                  <li>
                    Contactez notre équipe d'assistance pour des réponses
                    personnalisées à vos questions spécifiques.
                  </li>
                  <li>
                    Recevez une assistance rapide en cas de besoin, notre
                    équipe est là pour vous aider.
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
              bottom: 9,  
              right: 40,
            }}
            href="/formulaire"
            target="_self"
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
              bottom: 9, 
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
              bottom: 9, 
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
  )
}

export default HomePage;

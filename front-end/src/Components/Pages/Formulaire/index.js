import React, { useState, useEffect } from "react";
import {
  BankOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  InboxOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Steps,
  Form,
  Input,
  Select,
  Upload,
  Typography,
  Divider,
  message,
  Descriptions,
} from "antd";
import { SolutionOutlined,CompassOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet'; // Import Leaflet library
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer for rendering React components to HTML
import EXIF from 'exif-js'; // Import exif-js
import axios from "axios";
import { Link } from "react-router-dom";

const antIcon = (icon) => L.divIcon({
  html: ReactDOMServer.renderToString(
    <icon.type {...icon.props} style={{ fontSize: '30px' }} />
  ),
  iconSize: [30, 30], // Adjust the size as needed
  className: 'leaflet-div-icon' // Ensure the icon has Leaflet's default icon class
});

//upload
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Formulaire = () => {
  const [current, setCurrent] = useState(0);
  const [moroccoCities, setMoroccoCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [FormuDetails, setFormuDetails] = useState(null);
  const [FormuDetails1, setFormuDetails1] = useState(null);
  const [imageCaptured, setImageCaptured] = useState(false); // State to track if image is captured
  const [imageFile, setImageFile] = useState(null); // State to store captured image file
  const [imageFile2, setImageFile2] = useState(null);
  const [location, setLocation] = useState(null); // State to store location
  const [currentStep, setCurrentStep] = useState(0);

  const handleCapture = (file, url, locationData) => {
    setImageFile(imageFile2);
    setLocation(locationData);
    setImageCaptured(true);
    
    setCurrent(1);
     // Move to the next step automatically
  };

  const onFinishFormu = (values) => {
    setFormuDetails(values)
    // Handle form submission for step 1
    console.log("Form values on finish:", values);
    
    setCurrent(2);
  };

  const onFinishFormu1 = (values) => {
    setFormuDetails1(values)
    // Handle form submission for step 2
    console.log("Form values on finish:", values);
   
    setCurrent(3);
  };


  const forms = [
    <Formu2 onFinish={handleCapture}  image={imageFile}/>,

    <Formu onFinish={onFinishFormu} initialValues={FormuDetails} />,
    <Formu1 onFinish={onFinishFormu1} initialValues={FormuDetails1} />,
    <Finish />,
  ];

  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
      return false; // First step should always be enabled
    }
    if (stepNumber === 1) {
      return !imageCaptured; // Disable step 1 until image is captured
    }
    if (stepNumber === 2) {
      // Disable step 2 until form in step 1 is submitted
      return currentStep < 2 || !FormuDetails;
    }
    if (stepNumber === 3) {
      // Disable step 3 until form in step 2 is submitted
      return currentStep < 3 || !FormuDetails1;
    }
    return false; // Default to not disabled
  };
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "http://api.geonames.org/countryInfoJSON?username=achrafalfitouri"
      );
      const data = await response.json();

      const countryList = data.geonames.map((country) => ({
        code: country.countryCode,
        name: country.countryName,
      }));

      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const geonamesUsername = "achrafalfitouri";
      const response = await fetch(
        `http://api.geonames.org/searchJSON?country=MA&featureClass=P&username=${geonamesUsername}`
      );
      const data = await response.json();
      const cities = data.geonames.map((city) => city.toponymName);
      setMoroccoCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchRegionAndNeighborhoodForCity = async (cityName) => {
    try {
      const geonamesUsername = "achrafalfitouri";
      const response = await fetch(
        `http://api.geonames.org/searchJSON?country=MA&name=${cityName}&featureClass=P&username=${geonamesUsername}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      const region = data.geonames[0]?.adminName1 || "";
      setSelectedRegion(region);
    } catch (error) {
      console.error("Error fetching region and neighborhood for city:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ville: selectedCity,
      region: selectedRegion,
    });
    console.log("Form values after region change:", form.getFieldsValue());
  }, [form, selectedCity, selectedRegion]);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    fetchRegionAndNeighborhoodForCity(value);
  };

  return (
    <>
      <Typography.Title level={2}>Completer la demande</Typography.Title>
      <Divider
        style={{
          borderColor: "darkgrey",
          borderWidth: "1px",
          margin: "16px 0",
        }}
      >
        <FileTextOutlined style={{ fontSize: "30px" }} rotate={7}></FileTextOutlined>
      </Divider>
      <Typography.Title level={4}>
        Les champs obligatoires sont marqués par un{" "}
        <span style={{ color: "red" }}>*</span>{" "}
      </Typography.Title>
      <Steps
        onChange={setCurrent}
        current={current}
        style={{ padding: "30px 180px" }}
      >
        <Steps.Step
          disabled={isStepDisabled(0)}
          title="Capture d'image"
          icon={<CameraOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(1)}
          title="Information de réclamation"
          icon={<FileTextOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(2)}
          title="Information de réclamant"
          icon={<SolutionOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(3)}
          title="Confirmation"
          icon={<CheckCircleOutlined />}
        />
      </Steps>
      {forms[current]}
    </>
  );

  function Formu({ onFinish, initialValues }) {
    
   




  
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
            layout="horizontal"
            style={{ width: "100%" }}
          >
            <Divider
              style={{
                borderColor: "darkgrey",
                borderWidth: "1px",
                margin: "16px 0",
              }}
            >
              Théme
            </Divider>
            <Form.Item
              name="type_reclamation"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir le type de la réclamation!",
                },
              ]}
              label="Type de réclamation"
              htmlFor="type_reclamation"
            >
              <Select>
                <Select.Option value="coupure_electricite">
                  Coupure d'électricité
                </Select.Option>
                <Select.Option value="coupure_eau">Coupure d'eau</Select.Option>
                <Select.Option value="qualite_eau">
                  Qualité de l'eau
                </Select.Option>
                <Select.Option value="entretien_routes">
                  Entretien des routes
                </Select.Option>
                <Select.Option value="eclairage_public">
                  Éclairage public
                </Select.Option>
                <Select.Option value="gestion_dechets">
                  Gestion des déchets
                </Select.Option>
                <Select.Option value="assainissement">
                  Assainissement
                </Select.Option>
                <Select.Option value="transports_publics">
                  Transports publics
                </Select.Option>
                <Select.Option value="parcs_espaces_publics">
                  Parcs et espaces publics
                </Select.Option>
                <Select.Option value="bruit_pollution">
                  Bruit et pollution
                </Select.Option>
                <Select.Option value="problemes_environnementaux">
                  Problèmes environnementaux
                </Select.Option>
                <Select.Option value="projets_construction">
                  Projets de construction
                </Select.Option>
              </Select>
            </Form.Item>
            <Divider
              style={{
                borderColor: "darkgrey",
                borderWidth: "1px",
                margin: "16px 0",
              }}
            >
              Lieu
            </Divider>

            <Form.Item
              name="ville"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir la ville",
                  whitespace: true,
                },
              ]}
              label="Ville"
            >
              <Form.Item noStyle>
                <Select value={selectedCity} onChange={handleCityChange}>
                  {moroccoCities.map((city) => (
                    <Select.Option key={city} value={city}>
                      {city}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="region"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir la région",
                  whitespace: true,
                },
              ]}
              label="Région"
            >
              <Form.Item noStyle>
                <Select value={selectedRegion} disabled>
                  <Select.Option value={selectedRegion}>
                    {selectedRegion}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Quartier"
              name="quartier"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le quartier!",
                },
              ]}
              htmlFor="quartier"
            >
              <Input />
            </Form.Item>

            <Divider
              style={{
                borderColor: "darkgrey",
                borderWidth: "1px",
                margin: "16px 0",
              }}
            >
              Contenu
            </Divider>

            <Form.Item htmlFor="objet" name="objet" label="Objet">
              <Input id="objet" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              htmlFor="description"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir la description!",
                },
              ]}
            >
              <TextArea id="description" />
            </Form.Item>

         
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setCurrent(current - 1)}>Retour</Button>          
                <Button type="primary" htmlType="submit">
                Etape suivante
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
 function Formu1({ onFinish, initialValues }) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <Form
            initialValues={initialValues}
            onFinish={onFinish}
            layout="horizontal"
            style={{ width: "100%" }}
          >
            <Divider
              style={{
                borderColor: "darkgrey",
                borderWidth: "1px",
                margin: "16px 0",
              }}
            >
              Identité
            </Divider>
            <Form.Item
              name="cin"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir la cin!",
                },
              ]}
              label="Carte Nationale d'Identité"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="nom"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le nom!",
                },
              ]}
              label="Nom"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="prenom"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le prénom!",
                },
              ]}
              label="Prénom"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="genre"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir le genre!",
                },
              ]}
              label="Genre"
            >
              <Select>
                <Select.Option value="homme">Homme</Select.Option>

                <Select.Option value="femme">Femme</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="age"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir la tranche d'age",
                },
              ]}
              label="Tranche d'age"
            >
            <Select>
  <Select.Option value="age1">Moins de 18 ans</Select.Option>
  <Select.Option value="age2">De 18 ans à 30</Select.Option>
  <Select.Option value="age3">De 31 ans à 40</Select.Option>
  <Select.Option value="age4">De 41 ans à 50</Select.Option>
  <Select.Option value="age5">De 51 ans à 60</Select.Option>
  <Select.Option value="age6">De 61 ans à 71</Select.Option>
  <Select.Option value="age7">71 ans et plus</Select.Option>
</Select>
            </Form.Item>
            <Form.Item
              name="telephone"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le téléphone!",
                },
              ]}
              label="Téléphone"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir l'email!",
                },
              ]}
              label="Email"
            >
              <Input></Input>
            </Form.Item>

            <Divider
              style={{
                borderColor: "darkgrey",
                borderWidth: "1px",
                margin: "16px 0",
              }}
            >
              Adresse du requérant
            </Divider>

            <Form.Item
              label="Adresse"
              name="adresse"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir l'adresse!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Code Postale"
              name="code_postale"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le code postal!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ville ou localité"
              name="ville"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir la Ville!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="pays"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir la pays!",
                },
              ]}
              label="Pays"
            >
              <Select>
                {countries.map((country) => (
                  <Select.Option key={country.code} value={country.name}>
                    {country.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={() => setCurrent(current - 1)}>Retour</Button>
              <Button type="primary" htmlType="submit">
                Etape suivante
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  function Formu2({ onFinish, initialValues }) {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [file, setFile] = useState(null);
  
   
  
  
    const handleCapture = (file) => {
      setFile(file); // Save the file object to state
     
  
      EXIF.getData(file, function() {
        const lat = EXIF.getTag(this, 'GPSLatitude');
        const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
        const lon = EXIF.getTag(this, 'GPSLongitude');
        const lonRef = EXIF.getTag(this, 'GPSLongitudeRef');
  
        if (lat && lon && latRef && lonRef) {
          const latitude = convertDMSToDD(lat[0], lat[1], lat[2], latRef);
          const longitude = convertDMSToDD(lon[0], lon[1], lon[2], lonRef);
  
          setLocation({ latitude, longitude });
        } else {
          message.error("Les informations de localisation ne sont pas disponibles dans cette image.");
        }
      });
    };
  
    const convertDMSToDD = (degrees, minutes, seconds, direction) => {
      let dd = degrees + minutes / 60 + seconds / (60 * 60);
      if (direction === 'S' || direction === 'W') {
        dd *= -1;
      }
      return dd;
    };
  
    const handleCameraCapture = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          handleCapture(file);
        }
      };
      input.click();
    };
  
    const handleFileUpload = (file) => {
      handleCapture(file);
    };
  
    const handleSubmit = () => {
      if (file && location) {
        const formData = new FormData();
        formData.append('imageFile', file); // Append the actual file object
        formData.append('latitude', location.latitude);
        formData.append('longitude', location.longitude);
  
        // Debugging: console log the file object
        console.log('File object:', file);
        setImageFile2(file)
  
        onFinish(formData);
      } else {
        message.error("Veuillez capturer une image avec des informations de localisation avant de soumettre.");
      }
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 800, padding: 24, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 8 }}>
          <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Capture d'image</h1>
          <h3 style={{  marginBottom: 24 }}>Assurez-vous que la localisation est activée</h3>
  
          <Form
            name="formu2"
            initialValues={initialValues}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item label="Capturez une image">
              <Upload
                accept="image/*"
                beforeUpload={() => false}
                showUploadList={false}
                onChange={handleFileUpload}
              >
              </Upload>
              <Button icon={<CameraOutlined/>} style={{ marginLeft: 10 }} onClick={handleCameraCapture}>
                Prendre une photo
              </Button>
            </Form.Item>
  
            {location && (
              <div style={{ marginBottom: 24 }}>
                <h3>Emplacement Capturé:</h3>
                <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '400px' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[location.latitude, location.longitude]}>
                    <Popup>
                      Latitude: {location.latitude}<br />
                      Longitude: {location.longitude}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Soumettre
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}



function Finish({  }) {
  const [reclamationId, setReclamationId] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const handleBack = () => {
    // Handle back button logic here
    setCurrent((current) => current - 1);
  };
  const handleConfirm = async () => {
    if (!FormuDetails1 || !FormuDetails) {
      console.error('FormuDetails or FormuDetails1 is undefined.');
      return;
    }
  


    const ageMap = {
      "age1" :"Moins de 18 ans",
      "age2" :   "De 18 ans à 30",
      "age3" :  "De 31 ans à 40",
      "age4" : "De 41 ans à 50",
      "age5" :  "De 51 ans à 60",
      "age6" :"De 61 ans à 71",
      "age7" :  "71 ans et plus"
    };
 // Obtenez la valeur correspondante à partir de l'option sélectionnée pour l'âge
 const selectedAgeValue = ageMap[FormuDetails1.age];




const genreMaping= {
  'homme' : 'Homme',
  'femme' : 'Femme'
}
// Get the display text for genre_reclamant
const genreReclamant= genreMaping[FormuDetails1.genre];


    const typeReclamationMapping = {
      'coupure_electricite': "Coupure d'électricité",
      'coupure_eau': 'Coupure d\'eau',
      'qualite_eau': 'Qualité de l\'eau',
      'entretien_routes': 'Entretien des routes',
      'eclairage_public': 'Éclairage public',
      'gestion_dechets': 'Gestion des déchets',
      'assainissement': 'Assainissement',
      'transports_publics': 'Transports publics',
      'parcs_espaces_publics': 'Parcs et espaces publics',
      'bruit_pollution': 'Bruit et pollution',
      'problemes_environnementaux': 'Problèmes environnementaux',
      'projets_construction': 'Projets de construction',
    };

    // Get the display text for type_reclamation
    const typeReclamationText = typeReclamationMapping[FormuDetails.type_reclamation];
    // Rassemblez toutes les données nécessaires à partir de FormuDetails et FormuDetails1
    const reclamantData = {
      nom: FormuDetails1.nom,
      prenom: FormuDetails1.prenom,
      genre: genreReclamant,
      age: selectedAgeValue,
      email: FormuDetails1.email,
      adresse: FormuDetails1.adresse,
      ville: FormuDetails1.ville,
      pays: FormuDetails1.pays,
      numTel: FormuDetails1.telephone,
      codePostale: FormuDetails1.code_postale,
      createdAt: new Date().toISOString(),
    };


    const regionData = {
      nom: FormuDetails.region,
     
      createdAt: new Date().toISOString(),
    };
  
   
   
    try {
      // Envoyez les données de reclamant à l'API
      const reclamantResponse = await axios.post('http://127.0.0.1:8000/api/reclamants', reclamantData);
      console.log('Reclamant data submitted successfully:', reclamantResponse.data);
  const reclamantId = reclamantResponse.data['@id'];
      
  //lieu
 //region
 
 const regionResponse = await axios.post('http://127.0.0.1:8000/api/regions', regionData);
 console.log('Region data submitted successfully:', regionResponse.data);
 const regionId = regionResponse.data['@id'];

// ville

const villeData = {
  nom: FormuDetails.ville,
  regionId : regionId,
 
  createdAt: new Date().toISOString(),
};
 const villeResponse = await axios.post('http://127.0.0.1:8000/api/villes', villeData);
 console.log('ville data submitted successfully:', villeResponse.data);
 const villeId = villeResponse.data['@id'];     
  
//quartier

const quartierData = {
  nom: FormuDetails.quartier,
  villeId : villeId,
  createdAt: new Date().toISOString(),
};
const quartierResponse = await axios.post('http://127.0.0.1:8000/api/quartiers', quartierData );
 console.log('quartier data submitted successfully:', quartierResponse.data);
 const quartierId = quartierResponse.data['@id'];    





 // Create a FormData object to send the file and other data
 const formData = new FormData();
 formData.append('imageFile', imageFile2);
 formData.append('Description', FormuDetails.description);
 formData.append('objet', FormuDetails.objet);
 formData.append('status', 'pending');
 formData.append('createdAt', new Date().toISOString());
 formData.append('Type', typeReclamationText);
 formData.append('reclamantId', reclamantId); // Append the reclamantId
 formData.append('regionId', regionId); // Append the reclamantId
 formData.append('villeId', villeId); // Append the reclamantId
 formData.append('quartierId', quartierId); // Append the reclamantId

 console.log('FormData content:', ...formData.entries());

      // Send the FormData object to the server
      const reclamationResponse = await axios.post('http://127.0.0.1:8000/api/reclamations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Reclamation data submitted successfully:', reclamationResponse.data);
      setReclamationId(reclamationResponse.data.id);

      message.success("Formulaire soumis avec succès!");
      setShowButtons(false); 
    } catch (error) {
      console.error('Error submitting form data:', error.response || error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      message.error("Une erreur s'est produite lors de la soumission du formulaire.");
    }
  };
  
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        <h1>Vérifier toutes les données avant de confirmer</h1>

        <Descriptions title="Informations de réclamation" bordered column={1}>
          <Descriptions.Item label="Type de réclamation">
            {FormuDetails?.type_reclamation === "coupure_electricite" && "Coupure d'électricité"}
            {FormuDetails?.type_reclamation === "coupure_eau" && "Coupure d'eau"}
            {FormuDetails?.type_reclamation === "qualite_eau" && "Qualité de l'eau"}
            {FormuDetails?.type_reclamation === "entretien_routes" && "Entretien des routes"}
            {FormuDetails?.type_reclamation === "eclairage_public" && "Éclairage public"}
            {FormuDetails?.type_reclamation === "gestion_dechets" && "Gestion des déchets"}
            {FormuDetails?.type_reclamation === "assainissement" && "Assainissement"}
            {FormuDetails?.type_reclamation === "transports_publics" && "Transports publics"}
            {FormuDetails?.type_reclamation === "parcs_espaces_publics" && "Parcs et espaces publics"}
            {FormuDetails?.type_reclamation === "bruit_pollution" && "Bruit et pollution"}
            {FormuDetails?.type_reclamation === "problemes_environnementaux" && "Problèmes environnementaux"}
            {FormuDetails?.type_reclamation === "projets_construction" && "Projets de construction"}
          </Descriptions.Item>
          <Descriptions.Item label="Ville">
            {FormuDetails?.ville}
          </Descriptions.Item>
          <Descriptions.Item label="Région">
            {FormuDetails?.region}
          </Descriptions.Item>
          <Descriptions.Item label="Quartier">
            {FormuDetails?.quartier}
          </Descriptions.Item>
          <Descriptions.Item label="Objet">
            {FormuDetails?.objet}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {FormuDetails?.description}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Informations du réclamant" bordered column={1}>
          <Descriptions.Item label="CIN">
            {FormuDetails1?.cin}
          </Descriptions.Item>
          <Descriptions.Item label="Nom">
            {FormuDetails1?.nom}
          </Descriptions.Item>
          <Descriptions.Item label="Prénom">
            {FormuDetails1?.prenom}
          </Descriptions.Item>
          <Descriptions.Item label="Genre">
            {FormuDetails1?.genre === "homme" && "Homme"}
            {FormuDetails1?.genre === "femme" && "Femme"}
          </Descriptions.Item>
          <Descriptions.Item label="Tranche d'âge">
            {FormuDetails1?.age === "age1" && "Moins de 18 ans"}
            {FormuDetails1?.age === "age2" && "De 18 ans à 30"}
            {FormuDetails1?.age === "age3" && "De 31 ans à 40"}
            {FormuDetails1?.age === "age4" && "De 41 ans à 50"}
            {FormuDetails1?.age === "age5" && "De 51 ans à 60"}
            {FormuDetails1?.age === "age6" && "De 61 ans à 71"}
            {FormuDetails1?.age === "age7" && "71 ans et plus"}
          </Descriptions.Item>
          <Descriptions.Item label="Téléphone">
            {FormuDetails1?.telephone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {FormuDetails1?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Adresse">
            {FormuDetails1?.adresse}
          </Descriptions.Item>
         
          <Descriptions.Item label="Code postale">
            {FormuDetails1?.code_postale}
          </Descriptions.Item>
          <Descriptions.Item label="Ville ou localité">
            {FormuDetails1?.ville}
          </Descriptions.Item>
          <Descriptions.Item label="Pays">
            {FormuDetails1?.pays}
          </Descriptions.Item>
        </Descriptions>
        {reclamationId && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h1>Numéro de réclamation: Rec-{reclamationId}</h1>
            <h2>Merci de conserver ce numéro pour suivre votre réclamation.</h2>
          </div>
        )}
         {showButtons && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button onClick={handleBack} >Retour</Button>
          <Button type="primary"htmlType="submit" onClick={handleConfirm} >Confirmer</Button>
        </div>)}
        {!showButtons && (
          <div style={{  textAlign: "center" }}>
        <Link to="/">
          <Button type="primary">Revenir à l'accueil</Button>
        </Link></div>
      )}
       
      </div>
    </div>
  );
}
};

export default Formulaire;

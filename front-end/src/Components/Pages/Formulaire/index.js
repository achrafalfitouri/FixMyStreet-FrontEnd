import React, { useState, useEffect } from "react";
import {
  BankOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  InboxOutlined,
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
import { SolutionOutlined } from "@ant-design/icons";

//upload

const { Dragger } = Upload;

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

  const onFinishFormu = (values) => {
    setFormuDetails(values);
    setCurrent(1);
    console.log("Form values on finish:", values);
  };
  const onFinishFormu1 = (values) => {
    setFormuDetails1(values);
    setCurrent(2);
    console.log("Form values on finish:", values);
  };
  const forms = [
    <Formu onFinish={onFinishFormu} initialValues={FormuDetails} />,
    <Formu1 onFinish={onFinishFormu1} initialValues={FormuDetails1} />,
    <Finish />,
  ];
  const isStepDisabled = (stepNumber) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return FormuDetails === null;
    }
    if (stepNumber === 2) {
      return FormuDetails === null || FormuDetails1 === null;
    }
  };
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "http://api.geonames.org/countryInfoJSON?username=achrafalfitouri"
      );
      const data = await response.json();

      // Extract the list of countries from the data
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
      // Fetch cities data (replace 'your_geonames_username' with your actual Geonames username)
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
      console.log("API Response:", data); // Add this line for debugging

      const region = data.geonames[0]?.adminName1 || "";
      setSelectedRegion(region);
    } catch (error) {
      console.error("Error fetching region and neighborhood for city:", error);
    }
  };

  useEffect(() => {
    // Fetch cities when the component mounts
    fetchCities();
  }, []);
  useEffect(() => {
    // Fetch cities when the component mounts
    fetchCountries();
  }, []);
  const [form] = Form.useForm();
  useEffect(() => {
    // Use useEffect to update form fields after selectedRegion is updated
    form.setFieldsValue({
      ville: selectedCity,
      region: selectedRegion,
    });
    console.log("Form values after region change:", form.getFieldsValue());
  }, [form, selectedCity, selectedRegion]);

  const handleCityChange = (value) => {
    // Update the selected city and fetch the corresponding region and neighborhood
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
        <FileTextOutlined
          style={{ fontSize: "30px" }}
          rotate={7}
        ></FileTextOutlined>
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
          title="Information de réclamation"
          icon={<BankOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(1)}
          title="Information de réclamant"
          icon={<SolutionOutlined />}
        />
        <Steps.Step
          disabled={isStepDisabled(2)}
          title="Confirmation"
          icon={<CheckCircleOutlined />}
        />
      </Steps>
      {forms[current]}
    </>
  );

  function Formu({ onFinish, initialValues }) {
    //upload
    const [fileList, setFileList] = useState([]);
    const allowedFormats = [
      "pdf",
      "jpeg",
      "jpg",
      "png",
      "gif",
      "mp3",
      "wav",
      "aac",
      "au",
      "m3u",
      "m4a",
      "amr",
      "mpeg",
      "avi",
      "mp4",
      "mov",
      "mpa",
      "mpg",
      "wma",
      "3gp",
    ];
    const props = {
      name: "file",
      multiple: true,
      action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} téléchargé avec succès.`);
        } else if (status === "error") {
          message.error(
            `Échec du téléchargement du fichier ${info.file.name}.`
          );
        }
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1);

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(newFileList);
      },
      customRequest({ file, onSuccess, onError }) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        const fileExtension = file.name.split(".").pop().toLowerCase();
        const isAllowedFormat = allowedFormats.includes(fileExtension);
        if (!isLt5M) {
          message.error("La taille du fichier doit être inférieure à 5 Mo!");
          onError(new Error("Le fichier est dépassé 5 Mo"));
          return;
        }
        if (!isAllowedFormat) {
          message.error("Format de fichier non pris en charge!");
          onError(new Error("Format de fichier non accepté"));
          return;
        }

        setTimeout(() => {
          onSuccess();
        }, 1000);
      },
      onDrop(e) {
        console.log("Fichiers déposés", e.dataTransfer.files);
      },
    };

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

            <Form.Item
              label="Pièces jointes"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Ajouter une pièce jointe",
                },
              ]}
            >
              <div>
                <Dragger {...props} fileList={fileList}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Cliquez ou glissez un fichier dans cette zone pour le
                    télécharger
                  </p>
                  <p className="ant-upload-hint">
                    Prise en charge d'un téléchargement unique ou en masse. Il
                    est strictement interdit de télécharger des données
                    d'entreprise ou d'autres fichiers interdits.
                  </p>
                </Dragger>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#333",
                  }}
                >
                  Vous pouvez joindre tout document (photo, fichier
                  électronique, document scanné, etc.) dont la taille ne dépasse
                  pas 5 Mo.
                </span>
                <br />
                <span style={{ fontSize: "14px", color: "#555" }}>
                  Les formats acceptés sont PDF et Image (pdf, jpeg, jpg, png,
                  gif, mp3, wav, aac, au, m3u, m4a, amr, mpeg, avi, mp4, mov,
                  mpa, mpg, wma, 3gp).
                </span>
              </div>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button>Retour</Button>
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
              <Button>Retour</Button>
              <Button type="primary" htmlType="submit">
                Etape suivante
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  function Finish() {
    // Assuming FormuDetails and FormuDetails1 are objects with the submitted data

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <h1>Vérifier tous les données avant de confirmer</h1>

          {/************/}
          <Descriptions title="Information de réclamation" bordered column={1}>
            <Descriptions.Item label="Type de réclamation">
              {FormuDetails?.type_reclamation === "coupure_electricite" &&
                "Coupure d'électricité"}
              {FormuDetails?.type_reclamation === "coupure_eau" &&
                "Coupure d'eau"}
              {FormuDetails?.type_reclamation === "qualite_eau" &&
                "Qualité de l'eau"}
              {FormuDetails?.type_reclamation === "entretien_routes" &&
                "Entretien des routes"}
              {FormuDetails?.type_reclamation === "eclairage_public" &&
                "Éclairage public"}
              {FormuDetails?.type_reclamation === "gestion_dechets" &&
                "Gestion des déchets"}
              {FormuDetails?.type_reclamation === "assainissement" &&
                "Assainissement"}
              {FormuDetails?.type_reclamation === "transports_publics" &&
                "Transports publics"}
              {FormuDetails?.type_reclamation === "parcs_espaces_publics" &&
                "Parcs et espaces publics"}
              {FormuDetails?.type_reclamation === "bruit_pollution" &&
                "Bruit et pollution"}
              {FormuDetails?.type_reclamation ===
                "problemes_environnementaux" && "Problèmes environnementaux"}
              {FormuDetails?.type_reclamation === "projets_construction" &&
                "Projets de construction"}
            </Descriptions.Item>
            <Descriptions.Item label="Ville">
              {FormuDetails && FormuDetails.ville}
            </Descriptions.Item>
            <Descriptions.Item label="Région">
              {FormuDetails && FormuDetails.region}
            </Descriptions.Item>
            <Descriptions.Item label="Quartier">
              {FormuDetails && FormuDetails.quartier}
            </Descriptions.Item>
            <Descriptions.Item label="Objet">
              {FormuDetails && FormuDetails.objet}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {FormuDetails && FormuDetails.description}
            </Descriptions.Item>
          </Descriptions>

          {/************/}

          <Descriptions title="Information de réclamant" bordered column={1}>
            <Descriptions.Item label="CIN">
              {FormuDetails1.cin}
            </Descriptions.Item>
            <Descriptions.Item label="Nom">
              {FormuDetails1.nom}
            </Descriptions.Item>
            <Descriptions.Item label="Prénom">
              {FormuDetails1.prenom}
            </Descriptions.Item>
            <Descriptions.Item label="Genre">
              {FormuDetails1?.genre === "homme" && "Homme"}
              {FormuDetails1?.genre === "femme" && "Femme"}
            </Descriptions.Item>
            <Descriptions.Item label="Tranche d'âge">
              {FormuDetails1.age === "age1" && "Moins de 18 ans"}
              {FormuDetails1.age === "age2" && "De 18 ans à 30"}
              {FormuDetails1.age === "age3" && "De 31 ans à 40"}
              {FormuDetails1.age === "age4" && "De 41 ans à 50"}
              {FormuDetails1.age === "age5" && "De 51 ans à 60"}
              {FormuDetails1.age === "age6" && "De 61 ans à 71"}
              {FormuDetails1.age === "age7" && "71 ans et plus"}
            </Descriptions.Item>
            <Descriptions.Item label="Téléphone">
              {FormuDetails1.telephone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {FormuDetails1.email}
            </Descriptions.Item>
            <Descriptions.Item label="Adresse">
              {FormuDetails1.adresse}
            </Descriptions.Item>
            <Descriptions.Item label="Code Postale">
              {FormuDetails1.code_postale}
            </Descriptions.Item>
            <Descriptions.Item label="Ville ou localité">
              {FormuDetails1.ville}
            </Descriptions.Item>
            <Descriptions.Item label="Pays">
              {FormuDetails1.pays}
            </Descriptions.Item>
          </Descriptions>

          <div
            style={{
              margin: "10px ",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column-reverse",
            }}
          >
            <Button style={{ margin: "10px 0" }}>Retour</Button>
            <Button type="primary" htmlType="submit">
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Formulaire;

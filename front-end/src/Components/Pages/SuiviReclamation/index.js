import React, { useState } from 'react';
import { Form, Input, Button, Descriptions, message } from 'antd';
import axios from 'axios';

const SuiviReclamation = () => {
  const [reclamationData, setReclamationData] = useState(null);
  const [reclamantData, setReclamantData] = useState(null);

  const onFinish = async (values) => {
    const { numeroReclamation, email, telephone } = values;
    // Extract numeric ID from the input
    const numericId = numeroReclamation.replace(/^Rec-/, '');

    try {
      // Fetch reclamation details
      const response = await axios.get(`http://127.0.0.1:8000/api/reclamations/${numericId}`);
      const fetchedReclamationData = response.data;

      // Extract reclamantId from reclamation details
      const reclamantIdUrl = fetchedReclamationData.reclamantId;
      const reclamantId = reclamantIdUrl.substring(reclamantIdUrl.lastIndexOf('/') + 1); console.log(reclamantId)
      // Fetch reclamant details using reclamantId
      const reclamantResponse = await axios.get(`http://127.0.0.1:8000/api/reclamants/${reclamantId}`);
      const fetchedReclamantData = reclamantResponse.data;

      // Check if email and telephone match the reclamant details
      if (fetchedReclamantData.email === email && fetchedReclamantData.numTel === telephone) {
        setReclamationData(fetchedReclamationData);
        setReclamantData(fetchedReclamantData);
      } else {
        message.error("Les informations saisies ne correspondent pas au réclamant de cette réclamation.");
        setReclamationData(null); // Clear reclamationData if mismatched
        setReclamantData(null); // Clear reclamantData if mismatched
      }
    } catch (error) {
      console.error('Error fetching reclamation or reclamant:', error.response || error);
      message.error("Une erreur s'est produite lors de la récupération de la réclamation ou du réclamant.");
      setReclamationData(null); // Clear reclamationData on error
      setReclamantData(null); // Clear reclamantData on error
    }
  };

  const renderReclamationDetails = () => {
    if (!reclamationData || !reclamantData) {
      return null;
    }

    return (
      <div>
        <Descriptions title={`Réclamation numéro: Rec-${reclamationData.id}`} bordered column={1}>
          <Descriptions.Item label="Type de réclamation">{reclamationData.Type}</Descriptions.Item>
          <Descriptions.Item label="Status">{reclamationData.status}</Descriptions.Item>
          <Descriptions.Item label="Description">{reclamationData.Description}</Descriptions.Item>
          {/* Add other reclamation details as needed */}
        </Descriptions>

        <div style={{ marginTop: 24 }}>
          <h3>Informations du Réclamant</h3>
          <p><strong>Nom:</strong> {reclamantData.nom}</p>
          <p><strong>Téléphone:</strong> {reclamantData.numTel}</p>
          <p><strong>Email:</strong> {reclamantData.email}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: 800, padding: 24, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 8 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Suivi de Réclamation</h1>
        
        <Form
          name="suiviReclamationForm"
          onFinish={onFinish}
          initialValues={{ numeroReclamation: '', email: '', telephone: '' }}
          layout="vertical"
          style={{ marginBottom: 24 }}
        >
          <Form.Item
            label="Numéro de Réclamation"
            name="numeroReclamation"
            rules={[{ required: true, message: 'Veuillez entrer le numéro de réclamation!' }]}
          >
            <Input placeholder="Entrez le numéro de réclamation " />
          </Form.Item>

          <Form.Item
            label="Email du Réclamant"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Veuillez entrer l\'email du réclamant!' }]}
          >
            <Input placeholder="Entrez l'email du réclamant" />
          </Form.Item>

          <Form.Item
            label="Téléphone du Réclamant"
            name="telephone"
            rules={[{ required: true, message: 'Veuillez entrer le téléphone du réclamant!' }]}
          >
            <Input placeholder="Entrez le téléphone du réclamant" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Rechercher
            </Button>
          </Form.Item>
        </Form>

        {reclamationData && renderReclamationDetails()}
      </div>
    </div>
  );
};

export default SuiviReclamation;
